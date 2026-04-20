/**
 * Number Of Sub Arrays Of Size K And Average Greater Than Or Equal To Threshold
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
