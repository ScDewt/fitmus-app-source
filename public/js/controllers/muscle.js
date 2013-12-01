'use strict';

/* Controllers */

function MuscleCtrl($scope, connect, navigation) {
    $scope.musclegroups = {};

    navigation.beforePageShow("select_muscle_page",function(){
        connect.getData(function(err, data){
            if(err){
                alert(err.message);
                return ;
            }
            $scope.musclegroups = data.musclegroup;
            $scope.$apply();
            $('#select_muscle_page [data-role="listview" ]').listview("refresh");
        });
    });
}
