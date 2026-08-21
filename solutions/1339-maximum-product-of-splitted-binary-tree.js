/**
 * Maximum Product Of Splitted Binary Tree
 * Intuition: Splitting one edge yields subtreeSum * (total-subtreeSum). Record every subtree sum in one DFS.
 * Approach: 1. Post-order collect all subtree sums and the total. 2. For each subtree sum compute the product with the complement. 3. Return the max product modulo 10^9+7.
 * Dry Run: tree [1,2,3,4,5,6]. Total 21; split under 3 (sum 9) gives 9*12=108.
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
