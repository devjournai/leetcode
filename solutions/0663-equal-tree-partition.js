/**
 * Equal Tree Partition
 * Intuition: An edge split is equal iff some non-root subtree sums to half the whole tree (and the total is even).
 * Approach: 1. DFS `calculateSubtreeSumAndRecord` adds every non-root subtree sum to a Set. 2. `fullTreeOverallSum` is the root return value. 3. Return whether total is even and the set has total/2.
 * Dry Run: [5,10,10,null,null,2,3]. Total 30. Right subtree 10+2+3=15 is recorded. 15 in set → true.
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
      currentTreeNode.right
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
