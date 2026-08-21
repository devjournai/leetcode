/**
 * Number Of Sub Arrays Of Size K And Average Greater Than Or Equal To Threshold
 * Intuition: Average ≥ threshold iff window sum ≥ k*threshold. Slide a window of length k.
 * Approach: 1. requiredSum = k*threshold. 2. Grow a window; when size is k, count if sum ≥ required, then drop the left. 3. Return the count.
 * Dry Run: arr = [2,2,2,2,5,5,5,8], k=3, threshold=4. required=12. Windows hitting 12+: last three of the fives/eights → 3.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var numOfSubarrays = function (arr, k, threshold) {
  let totalSubarrays = 0;
  let currentWindowSum = 0;
  const requiredSum = k * threshold;
  let windowBegin = 0;

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    currentWindowSum += arr[windowEnd];

    if (windowEnd - windowBegin + 1 === k) {
      if (currentWindowSum >= requiredSum) {
        totalSubarrays++;
      }
      currentWindowSum -= arr[windowBegin];
      windowBegin++;
    }
  }

  return totalSubarrays;
};
