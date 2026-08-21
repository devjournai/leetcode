/**
 * Sum Of Digits In Base K
 * Intuition: Repeatedly take n % k and divide by k to read base-k digits and add them.
 * Approach: 1. Loop `workingValue` from n down to 0. 2. Add `workingValue % k` to `aggregatedSum`. 3. Floor-divide by k. 4. Return the sum.
 * Dry Run: n = 34, k = 6.
 *   - 34=5*6+4, 5=0*6+5 → digits 5+4=9.
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
