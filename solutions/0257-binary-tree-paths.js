/**
 * Binary Tree Paths
 * Time Complexity: O(N * H)
 * Space Complexity: O(N * H)
*/
var binaryTreePaths = function (rootNode) {
    const collectedPaths = [];

    const depthFirstSearch = (currentNode, currentPathValues) => {
        if (!currentNode) {
            return;
        }

        const valueToAppend = currentNode.val.toString();
        const nextPathSegment = [...currentPathValues, valueToAppend];

        if (!currentNode.left && !currentNode.right) {
            const fullPathString = nextPathSegment.join('->');
            collectedPaths.push(fullPathString);
        } else {
            if (currentNode.left) {
                depthFirstSearch(currentNode.left, nextPathSegment);
            }
            if (currentNode.right) {
                depthFirstSearch(currentNode.right, nextPathSegment);
            }
        }
    };

    depthFirstSearch(rootNode, []);
    return collectedPaths;
};