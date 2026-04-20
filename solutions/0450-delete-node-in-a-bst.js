/**
* Delete Node In A Bst
* Time Complexity: O(H)
* Space Complexity: O(H)
*/
var deleteNode = function (root, key) {
    if (!root) {
        return null;
    }

    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key);
    } else {
        if (root.left === null) {
            return root.right;
        } else if (root.right === null) {
            return root.left;
        } else {
            const findMinimumNodeInSubtree = (subtreeRoot) => {
                let currentNodeIterator = subtreeRoot;
                while (currentNodeIterator.left !== null) {
                    currentNodeIterator = currentNodeIterator.left;
                }
                return currentNodeIterator;
            };

            let inOrderSuccessor = findMinimumNodeInSubtree(root.right);
            root.val = inOrderSuccessor.val;
            root.right = deleteNode(root.right, inOrderSuccessor.val);
        }
    }

    return root;
};