function HashTable() {
    this.table = new Array(137);
    this.betterHash = betterHash;
    this.showDistro = showDistro;
    this.buildChains = buildChains;
    buildChains.apply(this);
    this.put = put;
    this.get = get; 
 }
 
 function put(key, data) {
    var pos = this.betterHash(key);
    var index = 0; 
    while(this.table[pos][index] != undefined){
        index+=2;
    }
    this.table[pos][index] = key;
    this.table[pos][index+1] = data;
 }
 function get(key){
     var index = 0; 
     var pos = this.betterHash(key); 
     while(this.table[pos][index] && this.table[pos][index] != key){
        index+=2; 
     }
     return this.table[pos][index+1]; 
 }

 function buildChains(){
     for(var i = 0; i < this.table.length ; ++i){
         this.table[i] = new Array(); 
     }
 }
 
 function showDistro() {
    var n = 0;
    for (var i = 0; i < this.table.length; ++i) {
       if (this.table[i][0] != undefined) {
          console.log(i + ": " + this.table[i]);
       }
    }
 }
 
 function betterHash(string) {
    const H = 37;
    var total = 0;
    for (var i = 0; i < string.length; ++i) {
       total += H * total + string.charCodeAt(i);
    }
    total = total % this.table.length;
    if (total < 0) {
       total += this.table.length-1;
    }
    return parseInt(total);
 }
 module.exports = HashTable;