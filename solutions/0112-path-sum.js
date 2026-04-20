/**
 * Path Sum
 * Time Complexity: O(N)
 * Space Complexity: O(H)
*/
var hasPathSum = function (root, targetSum) {
    if (!root) {
        return false;
    }

    let pathStack = [];
    pathStack.push([root, root.val]);

    while (pathStack.length > 0) {
        let currentPathData = pathStack.pop();
        let currentTreeNode = currentPathData[0];
        let accumulatedSum = currentPathData[1];

        if (!currentTreeNode.left && !currentTreeNode.right) {
            if (accumulatedSum === targetSum) {
                return true;
            }
        }

        let rightChildNode = currentTreeNode.right;
        if (rightChildNode) {
            let newSumForRight = accumulatedSum + rightChildNode.val;
            pathStack.push([rightChildNode, newSumForRight]);
        }

        let leftChildNode = currentTreeNode.left;
        if (leftChildNode) {
            let newSumForLeft = accumulatedSum + leftChildNode.val;
            pathStack.push([leftChildNode, newSumForLeft]);
        }
    }

    return false;
};