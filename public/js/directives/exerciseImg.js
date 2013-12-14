app.directive('ngExerciseImg', function($compile, $rootScope, connect) {

    function getData(scope,path){
        var pathEls = path.split("."),
            element = scope;
        while(pathEls.length && element){
            element = element[pathEls.shift()];
        }
        return element;
    }

    return {
        scope: 'false',
        link: function(scope, $element, attrs) {
            var exercisesUri = connect.getLocalExerciseUri();
            var exercise = getData(scope,attrs.ngExerciseImg);
            var src = exercisesUri[exercise.id] || exercise.img;
            $element.attr("src",src);
        }
    };
});