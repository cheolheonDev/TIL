const CArray = require('./CArray.js'); 
const bubbleSort = require('./bubbleSort.js');


console.log('=== bubble sort');
var numElements = 10; 
var mynums = new CArray(numElements);
mynums.setData(); 
console.log('= before sorted');
console.log(mynums.toString());
console.log('sorting...');
bubbleSort(mynums);
console.log('= sorted');
console.log(mynums.toString());

