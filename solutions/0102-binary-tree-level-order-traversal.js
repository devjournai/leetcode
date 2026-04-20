/**
 * Binary Tree Level Order Traversal
 * Time Complexity: O(N)
 * Space Complexity: O(N)
*/
var levelOrder = function (root) {
    const allLevelResults = [];

    if (!root) {
        return allLevelResults;
    }

    const processingQueue = [root];

    while (processingQueue.length > 0) {
        let currentIterationCount = processingQueue.length;
        const currentLevelValues = [];

        for (let nodeIndex = 0; nodeIndex < currentIterationCount; nodeIndex++) {
            const nodeFromQueue = processingQueue.shift();
            currentLevelValues.push(nodeFromQueue.val);

            if (nodeFromQueue.left) {
                processingQueue.push(nodeFromQueue.left);
            }
            if (nodeFromQueue.right) {
                processingQueue.push(nodeFromQueue.right);
            }
        }
        allLevelResults.push(currentLevelValues);
    }

    return allLevelResults;
};