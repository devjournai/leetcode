/**
 * Sum Of Left Leaves
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var sumOfLeftLeaves = function (root) {
    function calculateLeftLeafSum(currentNode, isNodeLeftChild) {
        if (!currentNode) {
            return 0;
        }

        if (!currentNode.left && !currentNode.right && isNodeLeftChild) {
            return currentNode.val;
        }

        let sumFromLeftSubtree = calculateLeftLeafSum(currentNode.left, true);
        let sumFromRightSubtree = calculateLeftLeafSum(currentNode.right, false);

        return sumFromLeftSubtree + sumFromRightSubtree;
    }

    return calculateLeftLeafSum(root, false);
};