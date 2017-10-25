function Timer(fn, countdown) {
    var ident, complete = false, start_time, paused = false;

    function _time_diff(date1, date2) {
        return date2 ? date2 - date1 : new Date().getTime() - date1;
    }

    this.stop = function () {
        paused = false;
        clearTimeout(ident);
    };

    this.pause = function () {
//        console.log('timer paused');
        paused = true;
        clearTimeout(ident);
        total_time_run = _time_diff(start_time);
        complete = total_time_run >= countdown;
    };

    this.resume = function () {
//        console.log('timer resume');
        paused = false;
        ident = complete ? setTimeout(fn, countdown) : setTimeout(fn, countdown - total_time_run);
    };

    this.isPaused = function () {
        return paused;
    };

    this.start = function () {
        paused = false;
//        console.log("---------start");
        start_time = new Date().getTime();
        ident = setTimeout(fn, countdown);
    };
    
    this.Restart = function(){
         paused = false;
//        console.log("---------restart");
        this.start();
    };
}