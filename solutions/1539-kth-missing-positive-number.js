/**
 * Kth Missing Positive Number
 * Time Complexity: O(logN)
 * Space Complexity: O(1)
 */
var findKthPositive = function (arr, k) {
  let firstIndex = 0;
  let lastIndex = arr.length;

  while (firstIndex < lastIndex) {
    let middleIndex = Math.floor((firstIndex + lastIndex) / 2);
    let currentMissingPositiveCount = arr[middleIndex] - (middleIndex + 1);

    if (currentMissingPositiveCount < k) {
      firstIndex = middleIndex + 1;
    } else {
      lastIndex = middleIndex;
    }
  }

  return firstIndex + k;
};
