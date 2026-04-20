/**
 * Maximum Level Sum of a Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(W)
*/
var maxLevelSum = function (root) {
    let queueForTraversal = [];
    if (root) {
        queueForTraversal.push(root);
    }

    let maximalSumFound = -Infinity;
    let levelWithMaximalSum = 0;
    let currentLevelNumber = 1;

    while (queueForTraversal.length > 0) {
        let nodeQueueSize = queueForTraversal.length;
        let sumForThisLevel = 0;

        for (let iteratorVariable = 0; iteratorVariable < nodeQueueSize; iteratorVariable++) {
            let currentNode = queueForTraversal.shift();
            sumForThisLevel += currentNode.val;

            let leftNodeChild = currentNode.left;
            if (leftNodeChild) {
                queueForTraversal.push(leftNodeChild);
            }

            let rightNodeChild = currentNode.right;
            if (rightNodeChild) {
                queueForTraversal.push(rightNodeChild);
            }
        }

        if (sumForThisLevel > maximalSumFound) {
            maximalSumFound = sumForThisLevel;
            levelWithMaximalSum = currentLevelNumber;
        }
        currentLevelNumber++;
    }

    return levelWithMaximalSum;
};