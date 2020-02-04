function getMin(BST) { 
    var current = BST.root; 
    while((current.left == null)){
        current = current.left; 
    }
    return current.data; 
}
function getMax(BST){
    var current = BST.root; 
    while((current.right == null)){
        current = current.right; 
    }
    return current.data; 
}
function find(data, BST){
    var current = BST.root; 
    while(current.data != data){
        if(data < current.data){
            current = current.left; 
        }
        else{
            current = current.right; 
        }
        if(current == null) {
            return null;
        }
    }
    return current.data; 
}
module.exports = {getMin, getMax, find};
