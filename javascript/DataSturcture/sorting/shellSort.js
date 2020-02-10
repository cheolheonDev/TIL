const gaps = [5,3,1];
function shellSort(carray) {
    for (var g = 0 ; g < gaps.length; g++ ){
        for ( var i = gaps[g]; i < carray.dataStore.length ; ++i){
            var temp = carray.dataStore[i]; 
            for (var j = i; j >= gaps[g] && 
                carray.dataStore[j-gaps[g]] > temp;
                j -= gaps[g] ){
                carray.dataStore[j] = carray.dataStore[j-gaps[g]];
            }
            carray.dataStore[j] = temp;
        }
    }
}

module.exports = shellSort; 