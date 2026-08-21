/**
 * Number Of Good Pairs
 * Intuition: A pair (i,j) with i<j and equal values exists once for each prior occurrence of that value.
 * Approach: 1. freq[101] counts seen so far. 2. For each x add freq[x] then increment. 3. Return the sum.
 * Dry Run: nums = [1,2,3,1,1,3].
 *   - First 1 adds 0; later 1s add 1 then 2; the second 3 adds 1 → 4.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var numIdenticalPairs = function (inputNumbers) {
  let totalGoodPairs = 0;
  const elementFrequencies = new Array(101).fill(0);

  for (const currentValue of inputNumbers) {
    totalGoodPairs += elementFrequencies[currentValue];
    elementFrequencies[currentValue]++;
  }

  return totalGoodPairs;
};
