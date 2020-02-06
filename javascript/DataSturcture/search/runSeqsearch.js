const seqSearch = require('./seqsearch');
const findMin = require('./findmin.js'); 
const findMax = require('./findmax.js'); 

function dispArr(arr){
    var log = '';
    for (var i = 0 ; i < arr.length ; ++i){
        log += (arr[i]) + " ";
        if( i%10 == 9){
            log += '\n'; 
        }
    }
    if( i% 10 != 0 ){
        log += '\n';
    }
    console.log(log); 
}
var nums = [];
for (var i = 0 ; i < 100 ; i++){
    nums[i] = Math.floor(Math.random() * 101);
}
dispArr(nums); 
console.log('number i search for : 10'); 
var search = 10; 
if(seqSearch(nums, search)){
    console.log('10 is in Array'); 
}else{
    console.log('10 is not in Array'); 
}

console.log('배열 내에서 최소값은 '); 
console.log(findMin(nums));
console.log('배열 내에서 최대값은 '); 
console.log(findMax(nums));