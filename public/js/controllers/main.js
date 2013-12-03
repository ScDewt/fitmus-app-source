'use strict';

/* Controllers */

function MainCtrl($scope, connect, navigation, sharedObject) {
    var now = new Date();

    //timestamp on Moscov time +4h
    $scope.select_timestamp = getMoscovTimeStamp(now.getFullYear(),now.getMonth(),now.getDay());
    $scope.exercises = {};
    $scope.select_exercises = {};
    $scope.musclegroups = {};
    $scope.musclegroup_exercises = {};
    $scope.glob = sharedObject.getObject();
    $scope.glob.date = now.getFullYear()+"-"+now.getMonth()+"-"+(now.getDay()+1);

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
            selectExercise($scope.select_timestamp);
            $scope.$apply();
            $('#main_page [data-role="listview" ]').listview().listview("refresh");
        });
    });

    $scope.$watch('select_timestamp', selectExercise);
    $scope.$watch('glob.date', function(newDate){
        console.log('glob.date',newDate);
    });

    function selectExercise(timestamp, oldTimestamp) {
        if($scope.trains){
            $scope.select_trains = $scope.trains[timestamp] || [];
        }
    }

    function getMoscovTimeStamp(year,month,day){
        var date = new Date(year,month,day+1,12 - 4 - (new Date()).getTimezoneOffset()/60 ,0,0 );
        return Math.floor(date.getTime()/1000);
    }

}
