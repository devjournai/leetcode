/**
 * Unique Binary Search Trees II
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
        rootValueChoice - 1,
      );
      const rightSubtreeResults = generateSubtrees(
        rootValueChoice + 1,
        rangeEnd,
      );

      for (const currentLeftStructure of leftSubtreeResults) {
        for (const currentRightStructure of rightSubtreeResults) {
          const newTreeInstance = new TreeNode(
            rootValueChoice,
            currentLeftStructure,
            currentRightStructure,
          );
          generatedTreesList.push(newTreeInstance);
        }
      }
    }
    return generatedTreesList;
  }

  return generateSubtrees(1, n);
};
