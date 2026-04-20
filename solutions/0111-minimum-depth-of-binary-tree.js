/**
 * Minimum Depth Of Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(N)
*/
var minDepth = function (root) {
    if (!root) {
        return 0;
    }

    let currentLevelNumber = 1;
    let nodesInQueue = [root];

    while (nodesInQueue.length > 0) {
        let currentLevelSize = nodesInQueue.length;
        for (let iterationIndex = 0; iterationIndex < currentLevelSize; iterationIndex++) {
            let processedNode = nodesInQueue.shift();

            if (!processedNode.left && !processedNode.right) {
                return currentLevelNumber;
            }

            if (processedNode.left) {
                nodesInQueue.push(processedNode.left);
            }
            if (processedNode.right) {
                nodesInQueue.push(processedNode.right);
            }
        }
        currentLevelNumber++;
    }
};