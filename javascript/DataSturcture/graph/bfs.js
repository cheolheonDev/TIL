function bfs(s){
    for(var i = 0; i < this.vertices; ++i){
        this.marked[i] = false; 
    }
    var queue = []; 
    this.marked[s] = true; 
    queue.push(s); 
    while(queue.length > 0){
        var v = queue.shift(); 
        if(v != undefined){
            console.log('visited vertex : '  + v);
        }
        for(var i = 0 ; i < this.adj[v].length ; i++){
            var w = this.adj[v][i];
            if(w && !this.marked[w]){
                this.marked[w] = true; 
                this.edgeTo[w] = v;
                queue.push(w); 
            }
        }
    }
}
module.exports = bfs;