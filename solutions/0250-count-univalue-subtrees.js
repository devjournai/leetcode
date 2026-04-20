/**
 * Count Univalue Subtrees
 * Time Complexity: O(N)
 * Space Complexity: O(H)
*/
var countUnivalSubtrees = function (root) {
    let totalUnivalSubtrees = 0;

    function determineIfUnival(nodeBeingEvaluated) {
        if (nodeBeingEvaluated === null) {
            return true;
        }

        let isLeftSubtreeUniform = determineIfUnival(nodeBeingEvaluated.left);
        let isRightSubtreeUniform = determineIfUnival(nodeBeingEvaluated.right);

        let isCurrentBranchUnival = true;

        if (nodeBeingEvaluated.left !== null) {
            if (!isLeftSubtreeUniform || nodeBeingEvaluated.left.val !== nodeBeingEvaluated.val) {
                isCurrentBranchUnival = false;
            }
        }

        if (nodeBeingEvaluated.right !== null) {
            if (!isRightSubtreeUniform || nodeBeingEvaluated.right.val !== nodeBeingEvaluated.val) {
                isCurrentBranchUnival = false;
            }
        }

        if (isCurrentBranchUnival) {
            totalUnivalSubtrees++;
        }

        return isCurrentBranchUnival;
    }

    determineIfUnival(root);
    return totalUnivalSubtrees;
};