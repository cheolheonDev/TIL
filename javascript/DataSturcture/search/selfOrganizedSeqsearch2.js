const paretoRate = 0.2 //  80:20 분포를 보인다. 20에 해당하는 앞부분 데이터는 이동하지 않는다 

function selfOrganizedSeqsearch2(arr, data){
    for(var i = 0 ; i < arr.length ; ++i ){
        if(arr[i] == data  && i > (arr.length * paretoRate)){
            if( i > 0 ){
                swap(arr, i, i-1); 
            }
            return true; 
        }
    }
    return false; 
}
function swap(arr, index, index1){
    temp = arr[index]; 
    arr[index] = arr[index1];
    arr[index1]= temp;
}
module.exports = selfOrganizedSeqsearch2;