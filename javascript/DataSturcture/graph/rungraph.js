const Graph = require('./graph.js');
const dfs = require('./dfs.js'); 
const bfs = require('./bfs.js');
console.log(Graph);
const g = new Graph(5); 
g.addEdge(0,1); 
g.addEdge(0,2); 
g.addEdge(1,3); 
g.addEdge(2,4); 
g.showGraph();
console.log('depth first searching')
dfs.apply(g,[0]); 
console.log('breath first searching')
bfs.apply(g,[0]);
