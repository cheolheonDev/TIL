function insertionSort(carray){
    var temp , inner; 
    for(var outer = 1; outer <= carray.dataStore.length-1; ++outer){
        temp = carray.dataStore[outer]; 
        inner = outer; 
        while(inner > 0 && (carray.dataStore[inner-1] >= temp)){
            carray.dataStore[inner] = carray.dataStore[inner-1];
            --inner;
        }
        carray.dataStore[inner] = temp;
        console.log(carray.toString());
    }
}
module.exports = insertionSort;
