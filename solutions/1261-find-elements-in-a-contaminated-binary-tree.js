/**
 * Find Elements in a Contaminated Binary Tree
 * Intuition: Recover values with the given rules (root 0, left 2x+1, right 2x+2) while BFS, store them in a set, then find is a set lookup.
 * Approach: 1. Constructor sets root.val=0, adds 0 to recoveredValuesSet, BFS assigns children and records values. 2. find returns recoveredValuesSet.has(target).
 * Dry Run: tree [-1,null,-1] (root with right child)
 *   root=0 in set. Right gets 2. find(2) true, find(1) false.
 * Time Complexity: O(N) constructor, O(1) find
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
