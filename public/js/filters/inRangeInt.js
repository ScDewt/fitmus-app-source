app.filter('inRangeInt', function() {
    return function( items, range ) {
        var filtered = [];
        range && angular.forEach(items, function(item, key) {
            if( range.indexOf(parseInt(key)) != -1 ) {
                filtered.push(item);
            }
        });
        return filtered;
    };
});