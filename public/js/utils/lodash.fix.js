(function(_){
    _.busy = function(func, wait) {
        var args,
            result,
            lastCalled = 0;

        return function() {
            var now = new Date,
                remaining = wait - (now - lastCalled);
            args = arguments;
            console.log("remains",remaining);
            if (remaining <= 0) {
                lastCalled = now;
                return (result = func.apply(this, args));
            }
            return result;
        };
    };
    _.diff = function(prev, now) {
        var changes = {};
        for (var prop in now) {
            if(prop.indexOf("$$") == 0){
                continue;
            }
            if (!prev || prev[prop] !== now[prop]) {
                if (typeof now[prop] == "object" && prev) {
                    var c = _.diff(prev[prop], now[prop]);
                    if (! _.isEmpty(c) ) // underscore
                        changes[prop] = c;
                } else {
                    changes[prop] = _.clone( now[prop], true);
                }
            }
        }
        return changes;
    }
})(_);