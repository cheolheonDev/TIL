function postOrder(node){
    if(!(node  == null)){
        postOrder(node.left); 
        postOrder(node.right); 
        console.log(node.show()+ ' ');
    }
}
module.exports = postOrder;