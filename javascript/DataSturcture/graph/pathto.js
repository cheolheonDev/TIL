function pathTo(v){
    var source = 0; 
    if(!hasPathTo.apply(this, [v])){
        return undefined; 
    }
    var path = []; 
    for (var i = v ; i!= source ; i = this.edgeTo[i]){
        path.push(i); 
    }
    path.push(source); 
    return path; 
}
function printPath(path){
    var pathStr = '';
    while(path.length > 0){
        if(path.length > 1){
            pathStr += path.pop() +' - '
        }else{
            pathStr += path.pop() + ''
        }
    }
    console.log(pathStr);
}
function hasPathTo(v){
    return this.marked[v]; 
}

module.exports = {printPath, pathTo};