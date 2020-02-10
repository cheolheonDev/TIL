function recurQuickSort(arr){
    if(arr.length == 0 ){
        return [];
    }
    var lesser = []; 
    var greater = []; 
    var pivot = arr[0];
    for(var i = 1; i < arr.length; i++){
        if(arr[i] < pivot){
            lesser.push(arr[i]);
        }else{
            greater.push(arr[i]);
        }
    }
    console.log(lesser, pivot, greater);
    return recurQuickSort(lesser).concat(pivot, recurQuickSort(greater));
} 
function quickSort(carray){
    var result = recurQuickSort(carray.dataStore);
    carray.dataStore = result;
}
module.exports = quickSort;