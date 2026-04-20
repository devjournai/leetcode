/**
 * Complete Binary Tree Inserter
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
