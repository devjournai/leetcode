/**
 * Complete Binary Tree Inserter
 * Intuition: Completeness means new nodes fill the leftmost missing child. Nodes missing a left or right child are insertion parents, in BFS order.
 * Approach: 1. BFS from `initialRoot`; enqueue any node with a missing child into `parentCandidates`. 2. `insert`: attach to `parentCandidates[0]` (left if null, else right then `shift` that parent). Push the new node as a future parent. Return the parent’s val. 3. `get_root` returns `rootNode`.
 * Dry Run: Tree 1 with left 2. Candidates [1,2]. insert(3) fills 1.right, shift 1, candidates [2,3], return 1. insert(4) fills 2.left, return 2.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var CBTInserter = function (initialRoot) {
  this.rootNode = initialRoot;
  this.parentCandidates = [];

  const bfsLevelQueue = [initialRoot];
  let queueIndex = 0;

  while (queueIndex < bfsLevelQueue.length) {
    const activeNode = bfsLevelQueue[queueIndex];

    if (!activeNode.left || !activeNode.right) {
      this.parentCandidates.push(activeNode);
    }

    if (activeNode.left) {
      bfsLevelQueue.push(activeNode.left);
    }
    if (activeNode.right) {
      bfsLevelQueue.push(activeNode.right);
    }

    queueIndex++;
  }
};

CBTInserter.prototype.insert = function (newVal) {
  const newNodeToAdd = new TreeNode(newVal);
  const targetParentNode = this.parentCandidates[0];

  let parentNodeValue;

  if (targetParentNode.left === null) {
    targetParentNode.left = newNodeToAdd;
    parentNodeValue = targetParentNode.val;
  } else {
    targetParentNode.right = newNodeToAdd;
    parentNodeValue = targetParentNode.val;
    this.parentCandidates.shift();
  }

  this.parentCandidates.push(newNodeToAdd);
  return parentNodeValue;
};

CBTInserter.prototype.get_root = function () {
  return this.rootNode;
};
