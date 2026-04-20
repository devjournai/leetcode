/**
 * Find Leaves Of Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(N)
*/
var findLeaves = function (root) {
    const collectedLeaves = [];

    const calculateNodeHeight = (currentNode) => {
        if (!currentNode) {
            return -1;
        }

        const leftSubtreeHeight = calculateNodeHeight(currentNode.left);
        const rightSubtreeHeight = calculateNodeHeight(currentNode.right);

        const currentLevelHeight = Math.max(leftSubtreeHeight, rightSubtreeHeight) + 1;

        while (collectedLeaves.length <= currentLevelHeight) {
            collectedLeaves.push([]);
        }

        collectedLeaves[currentLevelHeight].push(currentNode.val);

        return currentLevelHeight;
    };

    calculateNodeHeight(root);

    return collectedLeaves;
};