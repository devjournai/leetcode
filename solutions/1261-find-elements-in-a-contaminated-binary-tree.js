/**
 * Find Elements in a Contaminated Binary Tree
 * Time Complexity (constructor): O(N)
 * Time Complexity (find): O(1)
 * Space Complexity: O(N)
 */
var FindElements = function (root) {
  this.recoveredValuesSet = new Set();

  if (!root) {
    return;
  }

  root.val = 0;
  this.recoveredValuesSet.add(0);

  const traversalQueue = [root];

  while (traversalQueue.length > 0) {
    const currentTraversalNode = traversalQueue.shift();
    const nodeCurrentValue = currentTraversalNode.val;

    const leftBranchCandidate = currentTraversalNode.left;
    if (leftBranchCandidate) {
      const calculatedLeftValue = 2 * nodeCurrentValue + 1;
      leftBranchCandidate.val = calculatedLeftValue;
      this.recoveredValuesSet.add(calculatedLeftValue);
      traversalQueue.push(leftBranchCandidate);
    }

    const rightBranchCandidate = currentTraversalNode.right;
    if (rightBranchCandidate) {
      const calculatedRightValue = 2 * nodeCurrentValue + 2;
      rightBranchCandidate.val = calculatedRightValue;
      this.recoveredValuesSet.add(calculatedRightValue);
      traversalQueue.push(rightBranchCandidate);
    }
  }
};

FindElements.prototype.find = function (target) {
  return this.recoveredValuesSet.has(target);
};
