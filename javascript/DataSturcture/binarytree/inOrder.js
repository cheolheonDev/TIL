function inOrder(node) { 
    if(!(node==null)){
        inOrder(node.left);
        console.log(node.show() + " "); 
        inOrder(node.right);
    }
}

module.exports = inOrder;