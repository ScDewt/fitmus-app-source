app.directive('ngMobipick', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(element).mobipick(scope.$eval(attrs.ngMobipick)).parents(".ui-btn").on("click",function(){
                $(element).click();
                return false;
            }).css("dispay","none");
            $(element).on("change",function(){
                scope.$apply();
            });
        }
    };
});