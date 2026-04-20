/**
 * Equal Tree Partition
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var checkEqualTree = function (root) {
  const allRecordedSubtreeSums = new Set();

  const calculateSubtreeSumAndRecord = (currentTreeNode) => {
    if (!currentTreeNode) {
      return 0;
    }

    const sumFromLeftChild = calculateSubtreeSumAndRecord(currentTreeNode.left);
    const sumFromRightChild = calculateSubtreeSumAndRecord(
      currentTreeNode.right,
    );
    const currentPathSum =
      currentTreeNode.val + sumFromLeftChild + sumFromRightChild;

    if (currentTreeNode !== root) {
      allRecordedSubtreeSums.add(currentPathSum);
    }

    return currentPathSum;
  };

  const fullTreeOverallSum = calculateSubtreeSumAndRecord(root);

  const isTotalSumDivisibleByTwo = fullTreeOverallSum % 2 === 0;
  const targetHalfSumValue = fullTreeOverallSum / 2;
  const doesHalfSumExist = allRecordedSubtreeSums.has(targetHalfSumValue);

  return isTotalSumDivisibleByTwo && doesHalfSumExist;
};
