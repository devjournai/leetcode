/**
 * Symmetric Tree
 * Time Complexity: O(N)
 * Space Complexity: O(N)
*/
var isSymmetric = function (root) {
    if (!root) {
        return true;
    }

    const nodeComparisonQueue = [];
    nodeComparisonQueue.push(root.left);
    nodeComparisonQueue.push(root.right);

    while (nodeComparisonQueue.length > 0) {
        let firstNodeInPair = nodeComparisonQueue.shift();
        let secondNodeInPair = nodeComparisonQueue.shift();

        if (!firstNodeInPair && !secondNodeInPair) {
            continue;
        }

        if (!firstNodeInPair || !secondNodeInPair || firstNodeInPair.val !== secondNodeInPair.val) {
            return false;
        }

        nodeComparisonQueue.push(firstNodeInPair.left);
        nodeComparisonQueue.push(secondNodeInPair.right);

        nodeComparisonQueue.push(firstNodeInPair.right);
        nodeComparisonQueue.push(secondNodeInPair.left);
    }

    return true;
};