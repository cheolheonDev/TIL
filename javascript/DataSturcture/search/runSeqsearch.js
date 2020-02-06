const seqSearch = require('./seqsearch');
const findMin = require('./findmin.js'); 
const findMax = require('./findmax.js'); 
const selfOrganizedSeqsearch = require('./selfOrganizedSeqsearch.js'); 
const selfOrganizedSeqsearch2 = require('./selfOrganizedSeqsearch2.js'); 1

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

var short_nums = [ 5, 1, 100, 4, 3, 10, 9, 7, 11, 14]; 
console.log(' self organized, seq search : find number 100 ');
for (var i = 1 ; i <= 2 ; i++){
    selfOrganizedSeqsearch(short_nums,100);
    console.log(short_nums);
}

console.log('self organized, seq search 2 : find number 1 (20% 앞에 해당하는 부분, 위치변경이 없다)');
for (var i = 1 ; i <= 2 ; i++){
    selfOrganizedSeqsearch2(short_nums,1);
    console.log(short_nums);
}
