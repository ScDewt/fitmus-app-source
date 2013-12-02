'use strict';

app.factory('navigation',function ($rootScope){
    var pagesListener = {};
    $(document).bind( "pagebeforechange", function( e, data ) {
        var page = data.absUrl.split("#")[1].split("?")[0],
            strParams = data.absUrl.split("?")[1]||"",
            params = strParams.split("/");
        console.log("pagebeforechange",page,params);
        if(pagesListener[page]){
            pagesListener[page].forEach(function(listener){
                listener.apply(window,params);
            });
        }
    });

    return {
//        beforePageShow: function(page, callback){
//            $("#"+page).on("pagebeforeshow",function(){
//                console.log("pagebeforeshow",arguments);
//                callback();
//            });
//        },
        beforePageChange: function(page, callback){
            if(pagesListener[page]){
                pagesListener[page].push(callback);
            }else{
                pagesListener[page] = [callback];
            }
        }
    };
});