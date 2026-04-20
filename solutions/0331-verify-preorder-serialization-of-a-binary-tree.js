/**
 * Verify Preorder Serialization Of A Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(N)
*/
var isValidSerialization = function (preorder) {
    const tokenParts = preorder.split(',');
    let treeCapacity = 1;

    for (let traversalIndex = 0; traversalIndex < tokenParts.length; traversalIndex++) {
        const currentElement = tokenParts[traversalIndex];
        if (treeCapacity === 0) {
            return false;
        }

        treeCapacity--;

        if (currentElement !== '#') {
            treeCapacity += 2;
        }
    }
    return treeCapacity === 0;
};