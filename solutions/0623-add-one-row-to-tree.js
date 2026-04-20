/**
 * Add One Row To Tree
 * Time Complexity: O(N)
 * Space Complexity: O(W)
 */
var addOneRow = function (root, val, depth) {
  if (depth === 1) {
    let newRootNode = new TreeNode(val, root, null);
    return newRootNode;
  }

  let treeNodesQueue = [root];
  let currentTreeLevel = 1;

  while (treeNodesQueue.length > 0) {
    let levelNodesCount = treeNodesQueue.length;
    let iterationIndex = 0;

    if (currentTreeLevel === depth - 1) {
      while (iterationIndex < levelNodesCount) {
        let processNode = treeNodesQueue.shift();

        let existingLeftChild = processNode.left;
        let existingRightChild = processNode.right;

        let newLeftNode = new TreeNode(val, existingLeftChild, null);
        let newRightNode = new TreeNode(val, null, existingRightChild);

        processNode.left = newLeftNode;
        processNode.right = newRightNode;

        iterationIndex++;
      }
      return root;
    } else {
      while (iterationIndex < levelNodesCount) {
        let currentParentNode = treeNodesQueue.shift();

        if (currentParentNode.left) {
          treeNodesQueue.push(currentParentNode.left);
        }
        if (currentParentNode.right) {
          treeNodesQueue.push(currentParentNode.right);
        }
        iterationIndex++;
      }
      currentTreeLevel++;
    }
  }

  return root;
};
