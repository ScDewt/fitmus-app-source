'use strict';

app.factory('sharedObject',function ($rootScope){
    var sharedObj = {};
    return {
        getObject: function(){
            return sharedObj;
        }
    };
});