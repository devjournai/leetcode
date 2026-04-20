/**
 * Find Mode In Binary Search Tree
 * Time Complexity: O(N)
 * Space Complexity: O(H)
*/
var findMode = function (root) {
    let globalMaximumFrequency = 0;
    let lastEncounteredValue = NaN;
    let currentBlockCount = 0;

    const findMaxFrequencyTraversal = (nodeParameter) => {
        if (!nodeParameter) {
            return;
        }

        findMaxFrequencyTraversal(nodeParameter.left);

        if (nodeParameter.val === lastEncounteredValue) {
            currentBlockCount++;
        } else {
            lastEncounteredValue = nodeParameter.val;
            currentBlockCount = 1;
        }

        if (currentBlockCount > globalMaximumFrequency) {
            globalMaximumFrequency = currentBlockCount;
        }

        findMaxFrequencyTraversal(nodeParameter.right);
    };

    findMaxFrequencyTraversal(root);

    let modesFoundCollection = [];
    let currentComparisonValue = NaN;
    let currentComparisonCount = 0;

    const collectModesTraversal = (nodeArgument) => {
        if (!nodeArgument) {
            return;
        }

        collectModesTraversal(nodeArgument.left);

        if (nodeArgument.val === currentComparisonValue) {
            currentComparisonCount++;
        } else {
            currentComparisonValue = nodeArgument.val;
            currentComparisonCount = 1;
        }

        if (currentComparisonCount === globalMaximumFrequency) {
            modesFoundCollection.push(nodeArgument.val);
        }

        collectModesTraversal(nodeArgument.right);
    };

    collectModesTraversal(root);

    return modesFoundCollection;
};