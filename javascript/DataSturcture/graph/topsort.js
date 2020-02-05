function topSort(){
    var stack = []; 
    var visited = []; 
    for(var i = 0 ; i < this.vertices; i++){
        visited[i] = false;
    }
    for(var i = 0; i < this.vertices; i++){
        if(visited[i] == false){
            topSortHelper.call(this,i, visited, stack);
        }
    }
    console.log(stack);
    for(var i = 0; i <  stack.length ; i++){
        console.log(this.vertexList[stack[i]]); 
    }
}
function topSortHelper(v, visited, stack){
    visited[v] = true; 
    for( var i = 0 ; i < this.adj[v] ; i++){
        var w = this.adj[v][i]; 
        if(!visited[w]){
            topSortHelper.call(this,w, visited, stack); 
        }
    }
    stack.push(v);
}
module.exports = topSort;