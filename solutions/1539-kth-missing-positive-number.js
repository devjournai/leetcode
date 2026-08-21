/**
 * Kth Missing Positive Number
 * Intuition: Missing count before arr[i] is arr[i]-(i+1). Binary search the first index where missing ≥ k; answer is that index + k.
 * Approach: 1. lo=0, hi=n. 2. If arr[mid]-(mid+1)<k, lo=mid+1 else hi=mid. 3. Return lo+k.
 * Dry Run: arr = [2,3,4,7,11], k = 5.
 *   - lo ends at 3; 3+5=8.
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
