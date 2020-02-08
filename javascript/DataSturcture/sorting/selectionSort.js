function selectionSort(carray){
    var min ; 
    for(var outer = 0; outer <= carray.dataStore.length-2; ++outer){
        min = outer; 
        for(var inner = outer + 1; 
            inner <= carray.dataStore.length-1; ++inner){
                if(carray.dataStore[inner] < carray.dataStore[min])
                {
                    min = inner;
                }
            }
        carray.swap(carray.dataStore, outer, min);
    }
}
module.exports = selectionSort;