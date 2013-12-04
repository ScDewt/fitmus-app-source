app.directive('ngMobipick', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(element).mobipick(scope.$eval(attrs.ngMobipick))
                .parents(".ui-btn").on("click",function(){
                    $(element).click();
                    return false;
                });
            scope.$watch("glob.date",function(newDate){
                $(element).mobipick({
                    date:newDate
                });
            });
            $(element).on("change",function(){
                scope.glob.date = $(element).val();
                scope.$apply();
            });
        }
    };
});