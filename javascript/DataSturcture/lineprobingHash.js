function HashTable() {
    this.table = new Array(137);
    this.values = []; 
    this.betterHash = betterHash;
    this.showDistro = showDistro;
    this.put = put;
    this.get = get; 
 }
 
 function put(key, data) {
    var pos = this.betterHash(key);
    while(this.table[pos]!=undefined){
            pos++; 
    }
    this.table[pos] = key; 
    this.values[pos] = data; 
 }

 function get(key){
     var pos = this.betterHash(data); 
     while(this.table[pos] && this.table[pos] != key){
         pos++; 
     }
     if(this.table[pos] == key){
         return this.values[pos]
     }
     return undefined;
 }

 function showDistro() {
    for (var i = 0; i < this.table.length; ++i) {
       if (this.table[i]!= undefined) {
          console.log(i + ": " + this.table[i] + " , value :" +this.values[i]);
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