const CArray = require('./CArray.js'); 
const bubbleSort = require('./bubbleSort.js');
const insertionSort = require('./insertionSort.js');
const selectionSort = require('./selectionSort.js');
const shellSort = require('./shellSort.js');
const shellSort2 = require('./shellSort2.js');



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


console.log('=== insertion sort');
var numElements = 10; 
var mynums = new CArray(numElements);
mynums.setData(); 
console.log('= before sorted');
console.log(mynums.toString());
console.log('sorting...');
insertionSort(mynums);
console.log('= sorted');
console.log(mynums.toString());

console.log('=== selection sort');
var numElements = 10; 
var mynums = new CArray(numElements);
mynums.setData(); 
console.log('= before sorted');
console.log(mynums.toString());
console.log('sorting...');
shellSort(mynums);
console.log('= sorted');
console.log(mynums.toString());

console.log('=== shell sort'); 
var numElements = 10; 
var mynums = new CArray(numElements);
mynums.setData(); 
console.log('= before sorted');
console.log(mynums.toString());
console.log('sorting...');
shellSort(mynums);
console.log('= sorted');
console.log(mynums.toString());


console.log('=== shell sort2  dynamically calculates, gap sequences'); 
var numElements = 100; 
var mynums = new CArray(numElements);
mynums.setData(); 
console.log('= before sorted');
console.log(mynums.toString());
console.log('sorting...');
shellSort2(mynums);
console.log('= sorted');
console.log(mynums.toString());