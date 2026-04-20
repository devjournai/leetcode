/**
 * Maximum Product Of Splitted Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maxProduct = function (root) {
  const allSubtreeSums = [];
  const modulusValue = 1_000_000_007;

  function calculateSubtreeSum(currentNode) {
    if (!currentNode) {
      return 0;
    }

    const leftChildSum = calculateSubtreeSum(currentNode.left);
    const rightChildSum = calculateSubtreeSum(currentNode.right);
    const totalCurrentSubtreeSum =
      currentNode.val + leftChildSum + rightChildSum;
    allSubtreeSums.push(totalCurrentSubtreeSum);
    return totalCurrentSubtreeSum;
  }

  const entireTreeTotalSum = calculateSubtreeSum(root);
  let globalMaxProduct = 0;

  for (let sumIndex = 0; sumIndex < allSubtreeSums.length; sumIndex++) {
    const singleSubtreeSum = allSubtreeSums[sumIndex];
    const remainingTreeSum = entireTreeTotalSum - singleSubtreeSum;
    const currentProductCandidate = singleSubtreeSum * remainingTreeSum;
    globalMaxProduct = Math.max(globalMaxProduct, currentProductCandidate);
  }

  return globalMaxProduct % modulusValue;
};
