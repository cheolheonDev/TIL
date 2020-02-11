function max(a, b){
    return (a > b) ? a : b; 
}

function knapsack(capacity, size, value, n){
    if( n == 0 || capacity == 0 ){
        return 0; 
    }
    if( size[n-1] > capacity){
        return knapsack(capacity , size, value, n-1)
    }
    else {
        return max(value[n-1] + 
            knapsack(capacity - size[n-1], size, value, n-1),
            knapsack(capacity, size, value, n-1));
    }
}

function dknapsack(capacity, size, value, n){
    var K = []; 
    for( var i = 0; i <= capacity+1 ; i++){
        K[i] = [];
    }
    for(var i = 0; i <= n ; i++){
        var str = '';
        for(var w = 0; w <= capacity ; w++ ){
            if(i == 0 || w == 0){
                K[i][w] = 0;
            }
            else if( size[i-1] <= w ){
                K[i][w] = max(value[i-1] + K[i-1][w-size[i-1]], K[i-1][w]);
            }else{
                K[i][w] = K[i-1][w];
            }
            str += K[i][w] + ' ';
        }
        console.log(str);
    }
    return K[n][capacity];
}

var value = [4,5,10,11,13,1000];
var size = [3,4,7,8,9,15];
var capacity = 16; 
var n = 6;
console.log('최대로 담는 가방');
console.log(knapsack(capacity, size, value, n));
console.log('최대로 담는 가방 (dynamic)');
console.log(dknapsack(capacity, size, value, n));

function gknapsack(values, weights, capacity ){
    var load = 0; 
    var i = 0; 
    var w = 0; 
    while( load < capacity && i < 4){
        if(weights[i] <= (capacity -load)){
            w += values[i];
            load += weights[i]; 
        }else{
            var r = (capacity -load)/weights[i]; 
            w += r*values[i]; 
            load += weights[i];
        }
    ++i;
    }
    return w;
}

var items = ['a', 'b', 'c','d'];
var values = [50, 140, 60, 60]; 
var weights = [5,20, 10, 12];
var capacity = 30;
console.log(gknapsack(values, weights, capacity));