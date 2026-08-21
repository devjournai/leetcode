/**
 * Add One Row To Tree
 * Intuition: Insert a new row of `val` nodes at the given `depth`. Depth 1 means a new root whose left is the old tree. Otherwise BFS to level `depth-1` and splice each node’s children under new left/right nodes (`newLeftNode` keeps the old left; `newRightNode` keeps the old right).
 * Approach: 1. If `depth===1`, return `new TreeNode(val, root, null)`. 2. Queue BFS with `currentTreeLevel`. 3. When level === depth-1, for each `processNode` set left/right to the new nodes and return `root`. 4. Else enqueue existing children and increment level.
 * Dry Run: root=4 with 2 and 6, val=1, depth=2.
 *   - Level 1 is depth-1. Node 4 gets left=1(old 2) and right=1(old 6). Return the same root.
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
