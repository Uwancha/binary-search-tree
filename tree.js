import { Node } from "./node";

export function Tree(array) {
    return {
        root: buildTree(array),

        buildTree(arr) {
            
            const sorted = [...new Set(arr)].sort((a, b) => a - b);
            let l = 0, r = sorted.length - 1;  
            
            if (l > r) {
              return null;
            }
          
            let mid = Math.floor((l + r) / 2);
            let node = Node(sorted[mid]);
          
            node.left = this.buildTree(sorted, l, mid - 1);
            node.right = this.buildTree(sorted, mid + 1, r);
          
            return node;
        },

        insert (value, root = this.root) {
            if (root === null) {
                root = Node(value);
            }

            if (root.data > value) {
                root.left = this.insert(value, root.left);
            }else if (root.data < value) {
                root.left = this.insert(value, root.right);
            }
        },

        delete (value, node = this.root) {
            if (node === null) {
                return node;
            }

            if (node.data > value) {
                node.left = this.delete(value, node.left)
            }else if (node.data < value) {
                node.right = this.delete(value, node.right)
            }else if (node.data === value && node.left) {
                node.data = node.left;
            }else if (node.right === null){
                node = node.left
            }else if (node.left === null){
                node = node.right;
            }else {
                const minNode = this.findMin(node.right);
                node.data = minNode.data;
                node.right = this.delete(minNode.data, node.right);
            }

            return node

        },

        findMin (node) {
            while (node.left !== null) {
                node = node.left;
            }
            return node;
        },

        find (value, node = this.root) {
            if (node === null || node.data === value) {
                return node;
            }

            if (node.data > value) {
                this.find(value, node.left);
            }else if (node.data < value) {
                this.find(value, node.right);
            }

            return node;
        },

        levelOrder (callback) {
            let queue = [this.root]
            let results = []

            while (queue.length) {
                let node = queue.shift()

                results.push(node.data);
                if (callback) {
                    callback(node)
                }

                if (node.left) {
                    queue.push(node.left);
                }
                if (node.right) {
                    queue.push(node.right);
                }
            }

            if (!callback) {
                return results;
            }
        },

        inorder(callback, root = this.root) {
            let results = [];

            if (root === null) return;
            
            
            this.inorder(callback, root.left);

            results.push(root.data);
            if (callback) {
                callback(root);
            }

            this.inorder(callback, root.right);

            if (!callback) {
                return results;
            }
        },

        preorder(callback, root = this.root) {
            let results = [];

            if (root === null) return;

            results.push(root.data);
            if (callback) {
                callback(root);
            }

            this.preorder(callback, root.left);
            this.preorder(callback, root.right);

            if (!callback) {
                return results;
            }
        },

        postorder(callback, root = this.root) {
            let results = [];

            if (root === null) return;

            
            this.postorder(callback, root.left);
            this.postorder(callback, root.right);

            results.push(root.data);
            if (callback) {
                callback(root);
            }


            if (!callback) {
                return results;
            }
        },


        height (node = this.root) {
            if (node === null) {
                return -1;
            }

            const leftHeight = this.height(node.left);
            const rightHeight = this.height(node.right);
            return Math.max(leftHeight, rightHeight) + 1;
        },

        depth (node, root = this.root, level = 0) {
            if (node === null) return null;
            if (root === null) return 0;
            if (node.key === root.key) return level;

            let count = this.height(node, root.left, level + 1);
            if (count !== 0) return count;
            return this.depth(node, root.right, level + 1);
        },

        isBalanced (root = this.root) {
            if (!this.root) return true;

            const leftHeight = this.height(root.right);
            const rightHeight = this.height(root.right);
            const heightDifference = Math.abs(leftHeight - rightHeight);

            if (heightDifference > 1) {
                return false;  
              }
            
              
            const isLeftBalanced = this.isBalanced(root.left);
            const isRightBalanced = this.isBalanced(root.right);
            
            return isLeftBalanced && isRightBalanced;  

        },

        reBalance() {
            const nodeValues = this.inorder(this.root)
            const reBalanced = this.buildTree(nodeValues);

            this.root = reBalanced;
        }
    }
}