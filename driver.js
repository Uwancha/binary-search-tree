import { Tree } from "./tree";


function generateRandomArray(length) {
    const randomArray = Array.from({ length }, () => Math.floor(Math.random() * 100));
    return randomArray;
}
  
const randomArray = generateRandomArray(20);
  

const tree = Tree(randomArray);

console.log("Is the tree balanced?", tree.isBalanced());
console.log("Level-order traversal:", tree.levelOrder());
console.log("Postorder traversal:", tree.postorder());
console.log("Inorder traversal:", tree.inorder());

const valuesToInsert = [50, 75, 80];
valuesToInsert.forEach(value => tree.insert(value));

console.log('Balanced:', tree.isBalanced());

tree.reBalance();

console.log("Is the tree balanced?", tree.isBalanced());
console.log("Level-order traversal:", tree.levelOrder());
console.log("Postorder traversal:", tree.postorder());
console.log("Inorder traversal:", tree.inorder());
