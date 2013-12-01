'use strict';

app.factory('navigation',function ($rootScope){
    return {
        beforePageShow: function(page, callback){
            $("#"+page).on("pagebeforeshow",function(){
                callback();
            });
        }
    };
});