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
    }
})(_);