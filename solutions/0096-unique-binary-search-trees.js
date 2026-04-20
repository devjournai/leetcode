/**
 * Unique Binary Search Trees
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
*/
var numTrees = function (n) {
    const catalanNumbers = new Array(n + 1).fill(0);

    catalanNumbers[0] = 1;

    for (let currentNodesCount = 1; currentNodesCount <= n; currentNodesCount++) {
        for (let rootIndexOption = 1; rootIndexOption <= currentNodesCount; rootIndexOption++) {
            const leftSubtreeNodes = rootIndexOption - 1;
            const rightSubtreeNodes = currentNodesCount - rootIndexOption;
            catalanNumbers[currentNodesCount] += catalanNumbers[leftSubtreeNodes] * catalanNumbers[rightSubtreeNodes];
        }
    }

    return catalanNumbers[n];
};