(function(global,undefined){

//    jQuery(document).on('click','a[href*="#"]', function(e) {
//        location.hash = this.href.split("#")[1];
//        return false;
//    });
    jQuery( "body>[data-role='panel']" ).panel();



    jQuery( ".main_menu-link" ).on( "click", function() {
        jQuery( "#main_menu" ).panel( "open" );
        return false;
    });

    jQuery( function() {
        $(".hide").removeClass("hide");
        $( "#cooment_popup" ).enhanceWithin().popup({
            align: "0.5,0.5"
        });
    });

    setTimeout(function(){
        location.hash = "#auth_page";
    },0);

    global.app = angular.module('myApp',[]);
})(window);