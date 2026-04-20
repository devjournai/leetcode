/**
 * Convert Sorted Array To Binary Search Tree
 * Time Complexity: O(n)
 * Space Complexity: O(log n)
*/
var sortedArrayToBST = function (nums) {
    const buildSubtree = (currentArray, leftIndexBound, rightIndexBound) => {
        if (leftIndexBound > rightIndexBound) {
            return null;
        }

        const midPoint = Math.floor((leftIndexBound + rightIndexBound) / 2);
        const nodeValueCandidate = currentArray[midPoint];
        const currentRoot = new TreeNode(nodeValueCandidate);

        const leftSubtreeBranch = buildSubtree(currentArray, leftIndexBound, midPoint - 1);
        currentRoot.left = leftSubtreeBranch;

        const rightSubtreeBranch = buildSubtree(currentArray, midPoint + 1, rightIndexBound);
        currentRoot.right = rightSubtreeBranch;

        return currentRoot;
    };

    const initialCallResult = buildSubtree(nums, 0, nums.length - 1);
    return initialCallResult;
};