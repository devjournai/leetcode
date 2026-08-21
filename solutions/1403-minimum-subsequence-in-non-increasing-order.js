/**
 * Minimum Subsequence In Non Increasing Order
 * Intuition: Greedily take the largest numbers until their sum strictly exceeds the rest.
 * Approach: 1. Sort descending and compute the total. 2. Accumulate from the front, pushing values until subsequence sum > total - subsequence sum. 3. Return those values.
 * Dry Run: nums = [4,3,10,9,8].
 *   - Sorted [10,9,8,4,3], total 34. Take 10 (10 vs 24), then 9 (19 vs 15). Stop. Return [10,9].
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minSubsequence = function (nums) {
  nums.sort((valueA, valueB) => valueB - valueA);

  let totalAggregate = 0;
  for (let indexValue = 0; indexValue < nums.length; indexValue++) {
    totalAggregate += nums[indexValue];
  }

  const foundElements = [];
  let currentSubsequenceSum = 0;

  for (let elementIndex = 0; elementIndex < nums.length; elementIndex++) {
    let presentNumber = nums[elementIndex];
    currentSubsequenceSum += presentNumber;
    foundElements.push(presentNumber);
    if (currentSubsequenceSum > totalAggregate - currentSubsequenceSum) {
      break;
    }
  }

  return foundElements;
};
