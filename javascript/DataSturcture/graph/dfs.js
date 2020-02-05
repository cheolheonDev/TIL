function dfsinit(v){
    for(var i = 0; i < this.vertices; ++i){
        this.marked[i] = false; 
    }
    dfs.apply(this,[v])
}
function dfs(v){
    this.marked[v] =true;
    if(this.adj[v] != undefined){
        console.log("Visted vertex: " + v);
    }
    for(var i = 0 ; i < this.adj.length ; i++){
        if(!this.marked[i]){
            dfs.apply(this, [i]);
        }
    }
}
module.exports = dfsinit; 