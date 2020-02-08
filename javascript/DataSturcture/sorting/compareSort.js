const CArray = require('./CArray.js');
const Timer = require('./Timer.js');
const bubbleSort = require('./bubbleSort.js');
const insertionSort = require('./insertionSort.js');
const selectionSort = require('./selectionSort.js');

var testTimer = new Timer();
var nums = new CArray(100000);
nums.setData();
nums.backupData();
sorts = {bubbleSort, insertionSort, selectionSort}
sortsnames = Object.keys(sorts);
for(var i = 0 ; i < sortsnames.length ; i++){
    nums.restoreFromBackup();
    testTimer.reset();
    console.log('testing '+ sortsnames[i]);
    testTimer.startTimer();
    sorts[sortsnames[i]](nums);
    testTimer.stopTimer();
    console.log(testTimer.printGap());
}

