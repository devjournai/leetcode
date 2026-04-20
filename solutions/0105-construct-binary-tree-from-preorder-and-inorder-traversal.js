/**
 * Construct Binary Tree From Preorder And Inorder Traversal
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
*/
var buildTree = function (preorder, inorder) {
    if (preorder.length === 0 || inorder.length === 0) {
        return null;
    }

    const currentRootValue = preorder[0];
    const currentRootNode = new TreeNode(currentRootValue);

    const rootInorderIndex = inorder.indexOf(currentRootValue);

    const leftSubtreeInorder = inorder.slice(0, rootInorderIndex);
    const leftSubtreePreorder = preorder.slice(1, rootInorderIndex + 1);

    currentRootNode.left = buildTree(leftSubtreePreorder, leftSubtreeInorder);

    const rightSubtreeInorder = inorder.slice(rootInorderIndex + 1);
    const rightSubtreePreorder = preorder.slice(rootInorderIndex + 1);

    currentRootNode.right = buildTree(rightSubtreePreorder, rightSubtreeInorder);

    return currentRootNode;
};