
function Vertex(lablel){
    this.lable = label; 
}

function Graph(v){
    this.vertices = v; 
    this.vertexList = []; 
    this.edges = 0; 
    this.adj = []; 
    this.edgeTo = []; // bfs 를 활용하여 경로를 찾을때 사용됨
    this.marked = [];
    for(var i = 0; i < this.vertices; ++i){
        this.adj[i] = []; 
    }
    this.addEdge = addEdge; 
    this.showGraph = showGraph;
    this.toString = toString; 
}

function addEdge(v,w){
    this.adj[v][w] = w;
    this.adj[w][v] = v;
    this.edges++; 
}

function showGraph(){
    for( var i = 0 ; i < this.vertices; ++i){
        var log = i + " -> ";
        for(var j = 0 ; j < this.vertices; ++j){
            if(this.adj[i][j] != undefined){
                log += this.vertexList[this.adj[i][j]] + ' ';
            }
        }
        console.log(log);
    }
}

module.exports = Graph;


