/**
 * Unique Binary Search Trees II
 * Intuition: Every BST on [lo, hi] picks some root r; left trees are all BSTs on [lo, r-1] and right trees all BSTs on [r+1, hi], then cartesian-product those children.
 * Approach: 1. If n==0 return []. 2. `generateSubtrees(lo,hi)`: if lo>hi return [null]. 3. For each rootValueChoice, recurse left and right, pair every combination into a new TreeNode. 4. Return generateSubtrees(1, n).
 * Dry Run: n=3 → roots 1,2,3 yield the 5 distinct shapes (Catalan): 1 with right 2/3 variants, 2 balanced, 3 with left 1/2 variants
 * Time Complexity: O(N * C_n)
 * Space Complexity: O(N * C_n)
 */
var generateTrees = function (n) {
  if (n === 0) {
    return [];
  }

  function TreeNode(valInput, leftInput, rightInput) {
    this.val = valInput === undefined ? 0 : valInput;
    this.left = leftInput === undefined ? null : leftInput;
    this.right = rightInput === undefined ? null : rightInput;
  }

  function generateSubtrees(rangeStart, rangeEnd) {
    const generatedTreesList = [];

    if (rangeStart > rangeEnd) {
      generatedTreesList.push(null);
      return generatedTreesList;
    }

    for (
      let rootValueChoice = rangeStart;
      rootValueChoice <= rangeEnd;
      rootValueChoice++
    ) {
      const leftSubtreeResults = generateSubtrees(
        rangeStart,
        rootValueChoice - 1
      );
      const rightSubtreeResults = generateSubtrees(
        rootValueChoice + 1,
        rangeEnd
      );

      for (const currentLeftStructure of leftSubtreeResults) {
        for (const currentRightStructure of rightSubtreeResults) {
          const newTreeInstance = new TreeNode(
            rootValueChoice,
            currentLeftStructure,
            currentRightStructure
          );
          generatedTreesList.push(newTreeInstance);
        }
      }
    }
    return generatedTreesList;
  }

  return generateSubtrees(1, n);
};
