const BST = require('./binarytree.js'); 
var nums = new BST();
var numData = [23,45,16,37, 3,99,22];
numData.forEach((data)=>nums.insert(data));

console.log('Inorder Traversal:'); 
const inOrder = require('./inOrder.js');
inOrder(nums.root); 

console.log('Preorder Traversal:'); 
const preOrder = require('./preOrder.js'); 
preOrder(nums.root);

console.log('Postorder Traversal:');
const postOrder = require('./postOrder.js');
postOrder(nums.root);


const search = require('./search.js'); 
console.log('Min')
var min = search.getMin(nums); 
console.log(min);
console.log('Max')
var max = search.getMax(nums); 
console.log(max); 
console.log('search value 37'); 
var value = search.find(37, nums); 
console.log('found : ' + value); 
console.log('after delete value 37'); 
nums.remove(37);
inOrder(nums.root);

