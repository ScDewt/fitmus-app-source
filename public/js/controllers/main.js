'use strict';

/* Controllers */

function MainCtrl($scope, connect, navigation, sharedObject) {
    var now = new Date();
    var modeNames = [],
        insert_index = 0,
        is_replace = false;

    $scope.edit_mode = false;
    $scope.mode = {};
    $scope.exercises = {};
    $scope.select_exercises = {};
    $scope.musclegroups = {};
    sharedObject.registerScope($scope);


    navigation.beforePageChange("main_page",function(id_add_exercise){

        async.parallel({
            data: connect.getData,
            train: connect.getTrain
        },function(err,data){
            if(err){
                alert(err.message);
                return ;
            }
            $scope.musclegroups = data.data.musclegroup;
            $scope.mode = data.data.mode;
            $scope.exercises = data.data.exercise;
            $scope.trains = data.train;
            modeNames = Object.keys($scope.mode);
            selectExercise($scope.glob.select_timestamp);
            if(id_add_exercise){
                addExercise(id_add_exercise);
            }
            $scope.$apply();
        });
    });

    $scope.$watch('glob.select_timestamp', selectExercise);
    $scope.$watch('glob.date', function(newDate){
        //console.log('glob.date',newDate);
        var aDate = newDate.split("-");
        $scope.glob.select_timestamp = getMoscovTimeStamp(aDate[0],aDate[1]-1,aDate[2]-1)
        console.log("$scope.glob.select_timestamp",$scope.glob.select_timestamp);
    });

    //timestamp on Moscov time +4h
    $scope.glob.date = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+(now.getDay()+1);
    $scope.nextDay = function(){
        $scope.glob.date = XDate($scope.glob.date).addDays(1).toString("yyyy-MM-dd");
    };
    $scope.prevDay = function(){
        $scope.glob.date = XDate($scope.glob.date).addDays(-1).toString("yyyy-MM-dd");
    };
    $scope.toggleState = function(){
        $scope.edit_mode = !$scope.edit_mode;
        console.log('$scope.edit_mode',$scope.edit_mode);
    };

    $scope.nextMode = function(train){
        var nodeIndex = modeNames.indexOf(train.mode);
        train.mode = modeNames[++nodeIndex%modeNames.length];
    };
    $scope.positionUp = function(train){
        var upperTrain,index = $scope.select_trains.indexOf(train),
            position = train.position;
        if(index > 0){
            upperTrain = $scope.select_trains[index-1];
            train.position = upperTrain.position;
            upperTrain.position = position;
            selectExercise($scope.glob.select_timestamp);
        }
    };
    $scope.positionDown = function(train){
        var downerTrain,index = $scope.select_trains.indexOf(train),
            position = train.position;
        if(index < $scope.select_trains.length - 1){
            downerTrain = $scope.select_trains[index + 1];
            train.position = downerTrain.position;
            downerTrain.position = position;
            selectExercise($scope.glob.select_timestamp);
        }
    };
    $scope.remove = function(train){
        train.status = "Deleted";
        selectExercise($scope.glob.select_timestamp);
    };
    $scope.addAfter = function(train){
        insert_index  = $scope.select_trains.indexOf(train)+1;
        is_replace  = false;
        location.hash = "#select_muscle_page";
    };
    $scope.replace = function(train){
        insert_index  = $scope.select_trains.indexOf(train)+1;
        is_replace  = true;
        location.hash = "#select_muscle_page";
    };
    $scope.select = function(train){
        $scope.glob.select_train = train;
        location.hash = "#exercise_page";
    };

    function normalisePosition(trains){
        trains.forEach(function(train,index){
            train.position = index + 1;
        });
    }

    function addExercise(id_exercise){
        var timestamp = $scope.glob.select_timestamp,
            train = {
                comment: "",
                date: $scope.glob.date+" 12:00:00",
                date_unix: timestamp,
                id_exercise: id_exercise,
                id_muscle_group: $scope.exercises[id_exercise].id_muscle_group,
                mode: "Normal",
                position: "",
                result: null,
                status: "Active"
            };
        if(is_replace){
            $scope.select_trains[insert_index-1].status = "Deleted";
            $scope.select_trains.splice(insert_index-1,1,train);
        }else{
            $scope.select_trains.splice(insert_index,0,train);
        }
        if(!$scope.trains[timestamp]){
            $scope.trains[timestamp] = [train];
        }else{
            $scope.trains[timestamp].push(train);
        }
        normalisePosition($scope.select_trains);
        updateList();
    }

    var updateList = _.debounce(function(){
        $('#main_page [data-role="listview" ]').listview().listview("refresh");
    },10);

    function selectExercise(timestamp, oldTimestamp) {
        var trains;
        if($scope.trains){
            trains  = $scope.trains[timestamp] || [];
            trains = trains.filter(function(train){
                return train.status != "Deleted";
            });
            trains.sort(function(a,b){
                return parseInt( a.position || "0") > parseInt( b.position || "0");
            });
            normalisePosition(trains);
            console.log(trains);
            $scope.select_trains = trains;
        }
        updateList();
    }

    function getMoscovTimeStamp(year,month,day){
        var date = new Date(year,month,day+1, 12 - 4 - (new Date()).getTimezoneOffset()/60, 0, 0 );
        return Math.floor(date.getTime()/1000);
    }

}
