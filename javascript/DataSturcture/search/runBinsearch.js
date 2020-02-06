const {binSearch, duplicateCount} = require('./binsearch');
var sortednums = []; 
for( var i = 0 ; i < 100 ; i++){
    sortednums[i] = i; 
}

console.log('sorted num');
console.log(sortednums);
console.log('bin search : 30'); 
sortednums[28] = 30; 
sortednums[27] = 30; 
sortednums[29] = 30; 
sortednums[30] = 30; 
sortednums[31] = 30; 
if(binSearch(sortednums,30)>0){
    console.log('found position');
    console.log(binSearch(sortednums, 30));
    console.log('중복된 숫자 갯수');
    console.log(duplicateCount(sortednums, 30));
}else{
    console.log('not found');

}