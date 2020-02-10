// 동적으로 갭 시퀀스를 계산하는 shell Sort
// Algoriths, 4E . Addison Wesley, 2010 - Robert Sedgewick의 알고리즘을 활용.. ( 초기 갭 값을 계산 )
function swap( arr, index1, index2){
    var temp = arr[index1]; 
    arr[index1] = arr[index2]; 
    arr[index2] = temp;
}

function shellSort2(carray){
    var N = carray.dataStore.length;
    var h = 1; 
    // 초기 갭 값을 계산
    while( h < N/3){
        h = 3 * h + 1;
    }
    while( h >= 1){
        for (var i = h; i < N ; i++){
            for (var j = i; j >= h && carray.dataStore[j] < carray.dataStore[j-h]; j-=h){
                swap(carray.dataStore, j, j-h);
            }
        }
        h = (h-1) / 3;
    }
}
module.exports = shellSort2; 