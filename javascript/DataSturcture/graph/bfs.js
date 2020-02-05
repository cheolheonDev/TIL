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
        for(var i = 0 ; i < this.adj.length ; i++){
            if(!this.marked[i]){
                this.marked[i] = true; 
                queue.push(i); 
            }
        }
    }
}
module.exports = bfs;