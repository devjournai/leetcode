/**
 * Binary Tree Postorder Traversal
 * Time Complexity: O(N)
 * Space Complexity: O(N)
*/
var postorderTraversal = function (root) {
    if (!root) {
        return [];
    }

    let primaryStack = [];
    let auxiliaryStack = [];
    let resultSequence = [];

    primaryStack.push(root);

    while (primaryStack.length > 0) {
        let currentElement = primaryStack.pop();
        auxiliaryStack.push(currentElement.val);

        if (currentElement.left) {
            primaryStack.push(currentElement.left);
        }
        if (currentElement.right) {
            primaryStack.push(currentElement.right);
        }
    }

    while (auxiliaryStack.length > 0) {
        resultSequence.push(auxiliaryStack.pop());
    }

    return resultSequence;
};