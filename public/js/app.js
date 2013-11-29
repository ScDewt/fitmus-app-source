(function(global,undefined){

    jQuery(document).on('click','a[href*="#"]', function(e) {
        location.hash = this.href.split("#")[1];
        return false;
    });

    setTimeout(function(){
        location.hash = "#main_page";
    },100);

    global.app = angular.module('myApp',[]);
})(window);