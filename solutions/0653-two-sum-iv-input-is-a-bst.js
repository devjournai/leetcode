/**
 * Two Sum Iv Input Is A Bst
 * Intuition: Inorder of a BST is sorted, so two pointers on that list find whether any pair sums to k.
 * Approach: 1. `populateSortedList` inorders into `collectedValues`. 2. `startIndex`/`endIndex` two-sum: equal → true, too small increment start, too large decrement end. 3. Return false if they meet.
 * Dry Run: tree [5,3,6,2,4,null,7], k=9.
 *   - Inorder [2,3,4,5,6,7]. 2+7=9 → true.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var findTarget = function (root, k) {
  const collectedValues = [];

  const populateSortedList = (nodeForTraversal, valueStorage) => {
    if (!nodeForTraversal) {
      return;
    }
    populateSortedList(nodeForTraversal.left, valueStorage);
    valueStorage.push(nodeForTraversal.val);
    populateSortedList(nodeForTraversal.right, valueStorage);
  };

  populateSortedList(root, collectedValues);

  let startIndex = 0;
  let endIndex = collectedValues.length - 1;

  while (startIndex < endIndex) {
    const currentSumCalculation =
      collectedValues[startIndex] + collectedValues[endIndex];
    if (currentSumCalculation === k) {
      return true;
    } else if (currentSumCalculation < k) {
      startIndex++;
    } else {
      endIndex--;
    }
  }

  return false;
};
