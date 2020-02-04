function preOrder(node) { 
    if(!(node == null)){
        console.log(node.show()); 
        preOrder(node.left); 
        preOrder(node.right);
    }
}
module.exports = preOrder; 