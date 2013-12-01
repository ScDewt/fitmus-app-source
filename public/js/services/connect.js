'use strict';

app.factory('connect',function ($rootScope){
    var rootUrl = "http://dev.fitmus.com/api/v3/",
        app_id = "1",
        app_key = "1",
        app_sign = "1",//md5(app_id + app_key);
        userData = {
            user: null,
            data: null,
            train: null,
            note: null
        };

    function getJSON(url,callback){
        if(!userData.user){
            callback({
                message: "неавторизированный доступ"
            },null);
            return ;
        }
        $.getJSON(rootUrl + url,{
            app_id: app_id,
            app_sign: app_sign,
            user_id: userData.user.id,
            token: userData.user.token
        }).done(function(data){
            callback(data.error,data.data);
        }).fail(function(jqXHR, textStatus, errorThrown){
            callback({
                message: errorThrown
            },null);
        });
    }

    return {
        login: function (login, pass, callback){
            $.getJSON(rootUrl+"login/",{
                app_id: app_id,
                app_sign: app_sign,
                login:login,
                passwd:pass
            }).done(function(data){
                userData.user = data.data;
                callback(data.error,data.data);
            }).fail(function(jqXHR, textStatus, errorThrown){
                callback({
                  message: errorThrown
                },null);
            });
        },
        logout: function (callback){
            userData.user = null;
            callback();
        },
        getData: function(callback){
            if(userData.data){
                callback(null, userData.data);
                return;
            }
            getJSON("syncdata/",function(err, data){
                userData.data = data;
                callback(err, data);
            });
        },
        getTrain: function(callback){
            if(userData.train){
                callback(null, userData.train);
                return;
            }
            getJSON("train/",function(err, data){
                userData.train = data;
                callback(err, data);
            });
        },
        getNote: function(callback){
            if(userData.note){
                callback(null, userData.note);
                return;
            }
            getJSON("note/",function(err, data){
                userData.note = data;
                callback(err, data);
            });
        },
        getAll:function(callback){
            async.parallel({
                data: this.getData,
                train: this.getTrain,
                note: this.getNote
            },function(err,data){
                callback(err,data);
            });
        }
    };
});