function recurFib(n){
    if(n < 2){
        return n; 
    }else{
        return recurFib(n-1)  + recurFib(n-2);
    }
}

function dynFib(n){
    var val = []; 
    for(var i = 0; i <= n; ++i){
        val[i] = 0; 
    }
    if( n == 1 || n == 2 ){
        return 1; 
    }
    else{
        val[1] = 1; 
        val[2] = 1; 
        for( var i = 3; i <= n; i++){
            val[i] = val[i-1]+val[i-2];
        }
    }
    return val[n];

}

console.log('recursive time');
var start = new Date().getTime()
console.log(recurFib(20));
var stop = new Date().getTime()
console.log('recursive time : ' + (stop - start) + ' milliseconds')

console.log('dynamic time');
start = new Date().getTime()
console.log(dynFib(20));
stop = new Date().getTime()
console.log('dynamic time : ' + (stop - start) + ' milliseconds')
