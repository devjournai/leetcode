/**
 * Sum Of Digits In Base K
 * Time Complexity: O(log_k n)
 * Space Complexity: O(1)
 */
var sumBase = function (n, k) {
  let aggregatedSum = 0;

  for (
    let workingValue = n;
    workingValue > 0;
    workingValue = Math.floor(workingValue / k)
  ) {
    let extractedDigit = workingValue % k;
    aggregatedSum += extractedDigit;
  }

  return aggregatedSum;
};
