const HashTable = require('./simple_hash.js'); 
const BetterHashTable = require('./better_hash.js');
const SeperateChainingHashTable = require('./seperateChainingHash.js');
var someNames = "David Jennifer Donnie Raymond Cynthia Mike Clayton Danny Jonathan".split(" ");
var phoneNums = "023452 1234125 1235125 1235213 123425 6623456 1234523 2346236 1252345".split(" ");

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

console.log('seperate chaining hash table');
var schTable = new SeperateChainingHashTable(); 
for(var i = 0; i< someNames.length; i++){
    schTable.put(someNames[i], phoneNums[i]); 
}
schTable.showDistro();