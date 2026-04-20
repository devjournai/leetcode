/**
 * Convert Binary Search Tree To Sorted Doubly Linked List
 * Time Complexity: O(N)
 * Space Complexity: O(H)
*/
var treeToDoublyList = function (root) {
    if (!root) {
        return null;
    }

    let listStart = null;
    let lastProcessedNode = null;
    let nodeStack = [];
    let traverseNode = root;

    while (traverseNode !== null || nodeStack.length > 0) {
        while (traverseNode !== null) {
            nodeStack.push(traverseNode);
            traverseNode = traverseNode.left;
        }

        traverseNode = nodeStack.pop();

        if (lastProcessedNode) {
            lastProcessedNode.right = traverseNode;
            traverseNode.left = lastProcessedNode;
        } else {
            listStart = traverseNode;
        }
        lastProcessedNode = traverseNode;

        traverseNode = traverseNode.right;
    }

    lastProcessedNode.right = listStart;
    listStart.left = lastProcessedNode;

    return listStart;
};