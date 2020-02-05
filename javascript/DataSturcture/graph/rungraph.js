const Graph = require('./graph.js');
const dfs = require('./dfs.js'); 
const bfs = require('./bfs.js');
const path = require('./pathto.js');
const topsort = require('./topsort.js');
console.log(Graph);
console.log(path);
const g = new Graph(6); 
g.addEdge(1,2); 
g.addEdge(2,5); 
g.addEdge(1,3); 
g.addEdge(1,4); 
g.addEdge(0,1); 
g.showGraph();
g.vertexList = ["CS1", "CS2", "Data Structures", "Assembly Language", "Operating Systems", "algorithms"];
console.log('depth first searching')
dfs.apply(g,[0]); 
console.log('breath first searching')
bfs.apply(g,[0]);
console.log('find path by bfs'); 
const shortPath = path.pathTo.apply(g,[4]);
path.printPath(shortPath);
console.log('topsort'); 
topsort.apply(g);