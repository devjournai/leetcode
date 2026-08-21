/**
 * Find Mode In Binary Search Tree
 * Intuition: Inorder traversal of a BST emits values in sorted order, so equal values form contiguous runs. Two inorder walks suffice: first measure the longest run, then collect every value whose run matches that frequency.
 * Approach: 1. `findMaxFrequencyTraversal` walks left-root-right, counting consecutive equal `val`s into `currentBlockCount` and tracking `globalMaximumFrequency`. 2. Reset run state and `collectModesTraversal` pushes a value whenever `currentComparisonCount === globalMaximumFrequency`. 3. Return `modesFoundCollection`.
 * Dry Run: tree inorder 1, 2, 2.
 *   - Pass 1: 1 count=1, max=1; 2 count=1; 2 count=2, max=2.
 *   - Pass 2: 1 count=1 (skip); 2 count=1; 2 count=2 === max → push 2. Result [2].
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var findMode = function (root) {
  let globalMaximumFrequency = 0;
  let lastEncounteredValue = NaN;
  let currentBlockCount = 0;

  const findMaxFrequencyTraversal = (nodeParameter) => {
    if (!nodeParameter) {
      return;
    }

    findMaxFrequencyTraversal(nodeParameter.left);

    if (nodeParameter.val === lastEncounteredValue) {
      currentBlockCount++;
    } else {
      lastEncounteredValue = nodeParameter.val;
      currentBlockCount = 1;
    }

    if (currentBlockCount > globalMaximumFrequency) {
      globalMaximumFrequency = currentBlockCount;
    }

    findMaxFrequencyTraversal(nodeParameter.right);
  };

  findMaxFrequencyTraversal(root);

  let modesFoundCollection = [];
  let currentComparisonValue = NaN;
  let currentComparisonCount = 0;

  const collectModesTraversal = (nodeArgument) => {
    if (!nodeArgument) {
      return;
    }

    collectModesTraversal(nodeArgument.left);

    if (nodeArgument.val === currentComparisonValue) {
      currentComparisonCount++;
    } else {
      currentComparisonValue = nodeArgument.val;
      currentComparisonCount = 1;
    }

    if (currentComparisonCount === globalMaximumFrequency) {
      modesFoundCollection.push(nodeArgument.val);
    }

    collectModesTraversal(nodeArgument.right);
  };

  collectModesTraversal(root);

  return modesFoundCollection;
};
