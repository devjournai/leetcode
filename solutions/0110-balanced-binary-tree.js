/**
 * Balanced Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(H)
*/
var isBalanced = function (root) {
    const calculateBalanceAndHeight = (currentPntr) => {
        if (!currentPntr) {
            return 0;
        }

        const heightLeftSubtree = calculateBalanceAndHeight(currentPntr.left);
        if (heightLeftSubtree === -1) {
            return -1;
        }

        const heightRightSubtree = calculateBalanceAndHeight(currentPntr.right);
        if (heightRightSubtree === -1) {
            return -1;
        }

        const heightDifference = Math.abs(heightLeftSubtree - heightRightSubtree);
        if (heightDifference > 1) {
            return -1;
        }

        const maximumHeight = 1 + Math.max(heightLeftSubtree, heightRightSubtree);
        return maximumHeight;
    };

    const finalCheckResult = calculateBalanceAndHeight(root);
    return finalCheckResult !== -1;
};