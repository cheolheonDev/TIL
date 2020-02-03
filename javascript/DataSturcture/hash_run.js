const HashTable = require('./simple_hash.js'); 
const BetterHashTable = require('./better_hash.js');
var someNames = "David Jennifer Donnie Raymond Cynthia Mike Clayton Danny Jonathan".split(" ");

console.log('simple hash table'); 
var hTable = new HashTable(); 
for(var i = 0; i < someNames.length; i++){
    hTable.put(someNames[i]); 
}
hTable.showDistro();

console.log('better hash table');
var bhTable = new BetterHashTable(); 
for(var i = 0; i< someNames.length; i++){
    bhTable.put(someNames[i]); 
}
bhTable.showDistro();