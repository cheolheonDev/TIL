function print(arr2d){
    for(var i = 0; i < arr2d.length ; i++){
        var line = ''; 
        for(var j = 0; j < arr2d[i].length; j++ ){
            line += arr2d[i][j];
        }
        console.log(line);
    }
}
function lcs(word1, word2){
    var max = 0; 
    var index = 0; 
    var lcsarr = new Array(word1.length+1); 
    // 0으로 초기화
    for(var i = 0; i <= word1.length+1; i++){
        lcsarr[i] = new Array(word2.length+1); 
        for(var j = 0; j <= word2.length+1; j++){
            lcsarr[i][j] = 0;
        }
    }
    for(var i = 0; i <= word1.length; ++i){
        for(var j = 0; j <= word2.length; ++j){
            if(i == 0 || j == 0 ){
                lcsarr[i][j] = 0;
            }
            else {
                if(word1[i-1] == word2[j-1]){
                    lcsarr[i][j] = lcsarr[i-1][j-1] +1;
                }
                else{
                    lcsarr[i][j] = 0;
                }
            }
            if(max < lcsarr[i][j]){
                max = lcsarr[i][j];
                index = i; 
            }
        }
    }
    console.log('= inner array');
    print(lcsarr);
    console.log('')
    var str = ''; 
    if(max ==0){
        return ""; 
    }else{
        for( var i = index-max; i<= max ; ++i){
            str += word2[i];
        }
        return str;
    }
}
console.log('= coampare two string');
console.log('aabbcc');
console.log('bdbbcc');
console.log();
console.log(lcs('abbcc','dbbcc'));
