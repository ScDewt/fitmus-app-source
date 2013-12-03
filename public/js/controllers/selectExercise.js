'use strict';

/* Controllers */

function SelectExerciseCtrl($scope, connect, navigation) {
    $scope.muscle_id = 0;
    $scope.musclegroups = {};
    $scope.exercises = {};
    $scope.musclegroup_exercises = {};

    navigation.beforePageChange("select_exercise_page",function(id){
        $scope.muscle_id = id;
        connect.getData(function(err, data){
            if(err){
                alert(err.message);
                return ;
            }
            $scope.musclegroups = data.musclegroup;
            $scope.exercises = data.exercise;
            $scope.musclegroup_exercises = data.musclegroup_exercise;
            $scope.$apply();
            $('#select_exercise_page [data-role="listview" ]').listview().listview("refresh");
        });
    });

}

