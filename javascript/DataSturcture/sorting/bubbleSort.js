
function bubbleSort(carray){
    var numElements = carray.dataStore.length;
    for (var outer = numElements; outer >= 2; --outer){
        for (var inner = 0; inner <= outer-1; ++inner){
            if(carray.dataStore[inner] > carray.dataStore[inner+1]){
               carray.swap(carray.dataStore, inner, inner+1);
            }
        }
        console.log(carray.toString());
    }
}
module.exports = bubbleSort;