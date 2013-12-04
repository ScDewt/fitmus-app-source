'use strict';

/* Controllers */

function MainCtrl($scope, connect, navigation, sharedObject) {
    var now = new Date();

    //timestamp on Moscov time +4h
    $scope.exercises = {};
    $scope.select_exercises = {};
    $scope.musclegroups = {};
    $scope.musclegroup_exercises = {};
    sharedObject.registerScope($scope);


    navigation.beforePageChange("main_page",function(){

        async.parallel({
            data: connect.getData,
            train: connect.getTrain
        },function(err,data){
            if(err){
                alert(err.message);
                return ;
            }
            $scope.musclegroups = data.data.musclegroup;
            $scope.exercises = data.data.exercise;
            $scope.musclegroup_exercises = data.data.musclegroup_exercise;
            $scope.trains = data.train;
            $scope.$apply();
            selectExercise($scope.glob.select_timestamp);
        });
    });

    $scope.$watch('glob.select_timestamp', selectExercise);
    $scope.$watch('glob.date', function(newDate){
        //console.log('glob.date',newDate);
        var aDate = newDate.split("-");
        $scope.glob.select_timestamp = getMoscovTimeStamp(aDate[0],aDate[1]-1,aDate[2]-1)
        console.log("$scope.glob.select_timestamp",$scope.glob.select_timestamp);
    });
    $scope.glob.date = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+(now.getDay()+1);
    $scope.nextDay = function(){
        $scope.glob.date = XDate($scope.glob.date).addDays(1).toString("yyyy-MM-dd");
    };
    $scope.prevDay = function(){
        $scope.glob.date = XDate($scope.glob.date).addDays(-1).toString("yyyy-MM-dd");
    };

    function selectExercise(timestamp, oldTimestamp) {
        if($scope.trains){
            $scope.select_trains = $scope.trains[timestamp] || [];
        }
        setTimeout(function(){
            $('#main_page [data-role="listview" ]').listview().listview("refresh");
        },0)
    }

    function getMoscovTimeStamp(year,month,day){
        var date = new Date(year,month,day+1,12 - 4 - (new Date()).getTimezoneOffset()/60 ,0,0 );
        return Math.floor(date.getTime()/1000);
    }

}
