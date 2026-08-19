/**
 * Number of Subarrays With And Value of K
 * Intuition: AND is monotonically non-increasing. Subarrays ending at the current index take only O(bit count) distinct AND values, so we can merge frequencies of previous AND values with the new number.
 * Approach: 1. Maintain a map of AND-value -> frequency for subarrays ending at the previous index. 2. For each num, start a new map with {num: 1} and extend every previous value with val & num. 3. Add the frequency of k in the current map to the answer.
 * Dry Run:
 *   nums = [1, 1, 1], k = 1
 *   1: {1:1} -> +1
 *   1: {1:2} -> +2
 *   1: {1:3} -> +3, total 6.
 * Time Complexity: O(n * log(max(nums)))
 * Space Complexity: O(n)
 */
var countSubarrays = function (nums, k) {
  let subarrayCount = 0;
  let previousAndFrequencies = new Map();

  for (const currentNumber of nums) {
    const currentAndFrequencies = new Map([[currentNumber, 1]]);
    for (const [previousAndValue, frequency] of previousAndFrequencies) {
      const mergedAndValue = previousAndValue & currentNumber;
      currentAndFrequencies.set(
        mergedAndValue,
        (currentAndFrequencies.get(mergedAndValue) || 0) + frequency,
      );
    }
    subarrayCount += currentAndFrequencies.get(k) || 0;
    previousAndFrequencies = currentAndFrequencies;
  }

  return subarrayCount;
};
