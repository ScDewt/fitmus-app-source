'use strict';

/* Controllers */

function ExerciseCtrl($scope, connect, navigation, $rootScope) {

    navigation.beforePageChange("exercise_page",function(){
        if(!$rootScope.select_train.result){
            addEmptyResult();
        }
        $rootScope.$apply();
        updateList();
    });

    $scope.remove = function(index){
        var isRemove = confirm("Удалить "+index+" подход ?");
        if(!isRemove){
            return ;
        }
        delete $rootScope.select_train.result[index];
        while($rootScope.select_train.result[index+1]){
            $rootScope.select_train.result[index] = $rootScope.select_train.result[index+1];
            index += 1;
        }
        delete $rootScope.select_train.result[index];
        updateList();
    };

    var unWatch = $rootScope.$watch("select_train",function(newTrain){
        if(newTrain){
            $rootScope.$watch("select_train.result",function(newResult){
                if(newResult){
                    var key = Object.keys(newResult).length,
                        obj = newResult[key];
                    if(obj['c'] || obj['w'] || obj['d'] || obj['t'] || obj['tr'] || obj['tw']){
                        addEmptyResult();
                        updateList();
                    }
                }
            },true);
            unWatch();
        }
    });

    var updateList = _.debounce(function(){
        $('#exercise_page [data-role="listview" ]').listview().listview("refresh");
    },10);

    function addEmptyResult(){
        if(!$rootScope.select_train.result){
            $rootScope.select_train.result = {};
        }
        var key = Object.keys($rootScope.select_train.result).length + 1;
        var type = $rootScope.exercises[$rootScope.select_train.id_exercise].type;
        $rootScope.select_train.result[key] = {};
        type.split("").forEach(function(k){
            $rootScope.select_train.result[key][k] = 0;
        });
    }

}
