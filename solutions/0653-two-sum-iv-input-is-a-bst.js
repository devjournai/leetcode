/**
 * Two Sum Iv Input Is A Bst
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
