function Timer(){
    this.reset = reset; 
    this.startTimer = startTimer;
    this.stopTimer = stopTimer;
    this.start = 0; 
    this.gap = 0; 
    this.printGap = printGap;
}
function reset(){
    this.start = 0; 
    this.gap =0;
}
function startTimer(){
    var start = new Date().getTime();
    this.start = start; 
}
function stopTimer(){
    var stop = new Date().getTime();
    gap = stop - this.start
}
function printGap(){
    return 'The elapsed time was ' + gap + ' milliseconds';
}

module.exports = Timer;