/**
 * Count Of Interesting Subarrays
 * Intuition: The problem asks for subarrays whose count of "special" elements (elements satisfying `num % modulo == k`) also satisfies a modulo condition. This type of problem, involving sums over subarrays and modulo arithmetic, is a strong indicator for a prefix sum approach combined with a frequency map. If we define a prefix sum `P[i]` as the count of special elements up to index `i-1` (inclusive), then the count of special elements in `nums[l..r]` is `P[r+1] - P[l]`. We are looking for `(P[r+1] - P[l]) % modulo == k`. This equation can be rearranged to `P[r+1] % modulo == (k + P[l] % modulo) % modulo`. By iterating and maintaining a running prefix sum modulo `modulo`, we can use a frequency map to quickly count how many previous `P[l] % modulo` values satisfy this relationship.
 * Approach: 1. Initialize a map to store frequencies of `(prefix_sum % modulo)` values, starting with `(0, 1)` for an empty prefix. 2. Initialize a running `cumulativeModuloSum` (representing `P[r+1] % modulo`) and a `totalCount` for interesting subarrays to zero. 3. Iterate through the `nums` array with an index. 4. For each element, determine if it's "special" (`nums[i] % modulo == k`). 5. Update `cumulativeModuloSum` based on whether the current element is special. 6. Calculate the `desiredPreviousSum` value that, when subtracted from `cumulativeModuloSum` (modulo `modulo`), results in `k`. This is `(cumulativeModuloSum - k + modulo) % modulo`. 7. Add the count of `desiredPreviousSum` from the frequency map to `totalCount`. 8. Increment the frequency of the current `cumulativeModuloSum` in the map. 9. Return `totalCount`.
 * Dry Run: nums = [2, 3, 4], modulo = 2, k = 0
 * Initial: sumFrequencies = {0: 1}, cumulativeModuloSum = 0, interestingSubarrayTotal = 0
 *
 * currentIndex = 0, currentArrayValue = 2:
 *   2 % 2 === 0, k = 0 -> valueToAdd = 1.
 *   cumulativeModuloSum = (0 + 1) % 2 = 1.
 *   desiredPreviousSum = (1 - 0 + 2) % 2 = 1.
 *   countOfDesired = sumFrequencies.get(1) (undefined).
 *   interestingSubarrayTotal remains 0.
 *   sumFrequencies.set(1, (undefined || 0) + 1) -> sumFrequencies = {0: 1, 1: 1}.
 *
 * currentIndex = 1, currentArrayValue = 3:
 *   3 % 2 === 1, k = 0 -> valueToAdd = 0.
 *   cumulativeModuloSum = (1 + 0) % 2 = 1.
 *   desiredPreviousSum = (1 - 0 + 2) % 2 = 1.
 *   countOfDesired = sumFrequencies.get(1) (1).
 *   interestingSubarrayTotal = 0 + 1 = 1.
 *   sumFrequencies.set(1, 1 + 1) -> sumFrequencies = {0: 1, 1: 2}.
 *   (Subarray [3] is interesting: 0 special elements, 0 % 2 == 0)
 *
 * currentIndex = 2, currentArrayValue = 4:
 *   4 % 2 === 0, k = 0 -> valueToAdd = 1.
 *   cumulativeModuloSum = (1 + 1) % 2 = 0.
 *   desiredPreviousSum = (0 - 0 + 2) % 2 = 0.
 *   countOfDesired = sumFrequencies.get(0) (1).
 *   interestingSubarrayTotal = 1 + 1 = 2.
 *   sumFrequencies.set(0, 1 + 1) -> sumFrequencies = {0: 2, 1: 2}.
 *   (Subarray [2,3,4] is interesting: 2 special elements (2, 4), 2 % 2 == 0)
 *
 * Return 2.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var countInterestingSubarrays = function (nums, modulo, k) {
  const sumFrequencies = new Map();
  sumFrequencies.set(0, 1);

  let cumulativeModuloSum = 0;
  let interestingSubarrayTotal = 0;

  for (let currentIndex = 0; currentIndex < nums.length; currentIndex++) {
    const currentArrayValue = nums[currentIndex];

    let valueToAdd = 0;
    if (currentArrayValue % modulo === k) {
      valueToAdd = 1;
    }

    cumulativeModuloSum = (cumulativeModuloSum + valueToAdd) % modulo;

    let desiredPreviousSum = (cumulativeModuloSum - k + modulo) % modulo;

    const countOfDesired = sumFrequencies.get(desiredPreviousSum);
    if (countOfDesired !== undefined) {
      interestingSubarrayTotal += countOfDesired;
    }

    let currentSumCount = sumFrequencies.get(cumulativeModuloSum);
    if (currentSumCount === undefined) {
      sumFrequencies.set(cumulativeModuloSum, 1);
    } else {
      sumFrequencies.set(cumulativeModuloSum, currentSumCount + 1);
    }
  }

  return interestingSubarrayTotal;
};
