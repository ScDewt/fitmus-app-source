'use strict';

app.factory('sharedObject',function ($rootScope){
    var sharedObj = {},
        scoups = [];

    function applyChanges(){
        angular.forEach(scoups,function(scope){
            scope.$apply();
        });
    }

    return {
        registerScope: function(scope){
            scope.glob = sharedObj;
            //scope.$watch('glob',applyChanges);
            //scoups.push(scope);
        }
    };
});