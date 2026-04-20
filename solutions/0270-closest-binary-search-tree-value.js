/**
 * Closest Binary Search Tree Value
 * Time Complexity: O(H)
 * Space Complexity: O(H)
*/
var closestValue = function (root, target) {
    let nearestValue = root.val;

    function traverseTree(currentTreeNode) {
        if (!currentTreeNode) {
            return;
        }

        let differenceFromCurrent = Math.abs(currentTreeNode.val - target);
        let minimalDifference = Math.abs(nearestValue - target);

        if (differenceFromCurrent < minimalDifference) {
            nearestValue = currentTreeNode.val;
        } else if (differenceFromCurrent === minimalDifference && currentTreeNode.val < nearestValue) {
            nearestValue = currentTreeNode.val;
        }

        if (target < currentTreeNode.val) {
            traverseTree(currentTreeNode.left);
        } else if (target > currentTreeNode.val) {
            traverseTree(currentTreeNode.right);
        }
    }

    traverseTree(root);
    return nearestValue;
};