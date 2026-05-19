/**
 * Count Number Of Maximum Bitwise Or Subsets
 * Intuition: The maximum possible bitwise OR value for any subset is achieved by ORing all elements in the given array. Once this maximum OR value is determined, the problem reduces to counting all non-empty subsets whose bitwise OR equals this maximum value.
 * Approach: 1. Calculate the maximum possible bitwise OR value by ORing all elements in the input array. 2. Iterate through all possible non-empty subsets using bit manipulation (each integer from 1 to 2^N - 1 represents a unique subset). 3. For each subset, calculate its bitwise OR. 4. If the subset's bitwise OR equals the maximum overall OR value, increment a counter. 5. Return the final count.
 * Dry Run: nums = [3, 2, 5]
 *   1. Calculate maximumOverallOr: 3 | 2 | 5 = 7.
 *   2. Initialize maxOrSubsetCount = 0.
 *   3. arrayLength = 3. subsetLimit = (1 << 3) = 8.
 *   4. Loop currentSubsetMask from 1 to 7:
 *      - currentSubsetMask = 1 (001_2):
 *        - currentSubsetOrResult = 0.
 *        - elementIndex = 0: (1 >> 0) & 1 is 1. currentSubsetOrResult = 0 | nums[0] = 3.
 *        - currentSubsetOrResult is 3. Not equal to 7.
 *      - currentSubsetMask = 2 (010_2):
 *        - currentSubsetOrResult = 0 | nums[1] = 2.
 *        - currentSubsetOrResult is 2. Not equal to 7.
 *      - currentSubsetMask = 3 (011_2):
 *        - currentSubsetOrResult = (0 | nums[0]) | nums[1] = (0 | 3) | 2 = 3.
 *        - currentSubsetOrResult is 3. Not equal to 7.
 *      - currentSubsetMask = 4 (100_2):
 *        - currentSubsetOrResult = 0 | nums[2] = 5.
 *        - currentSubsetOrResult is 5. Not equal to 7.
 *      - currentSubsetMask = 5 (101_2):
 *        - currentSubsetOrResult = (0 | nums[0]) | nums[2] = (0 | 3) | 5 = 7.
 *        - currentSubsetOrResult is 7. Equal to maximumOverallOr. maxOrSubsetCount = 1.
 *      - currentSubsetMask = 6 (110_2):
 *        - currentSubsetOrResult = (0 | nums[1]) | nums[2] = (0 | 2) | 5 = 7.
 *        - currentSubsetOrResult is 7. Equal to maximumOverallOr. maxOrSubsetCount = 2.
 *      - currentSubsetMask = 7 (111_2):
 *        - currentSubsetOrResult = ((0 | nums[0]) | nums[1]) | nums[2] = ((0 | 3) | 2) | 5 = 7.
 *        - currentSubsetOrResult is 7. Equal to maximumOverallOr. maxOrSubsetCount = 3.
 *   5. Return maxOrSubsetCount = 3.
 * Time Complexity: O(N * 2^N)
 * Space Complexity: O(1)
 */
var countMaxOrSubsets = function (nums) {
  let maximumOverallOr = 0;
  for (let currentNumber of nums) {
    maximumOverallOr |= currentNumber;
  }

  let maxOrSubsetCount = 0;
  const arrayLength = nums.length;
  const subsetLimit = 1 << arrayLength;

  for (
    let currentSubsetMask = 1;
    currentSubsetMask < subsetLimit;
    currentSubsetMask++
  ) {
    let currentSubsetOrResult = 0;
    for (let elementIndex = 0; elementIndex < arrayLength; elementIndex++) {
      const isBitSet = (currentSubsetMask >> elementIndex) & 1;
      if (isBitSet) {
        currentSubsetOrResult |= nums[elementIndex];
      }
    }

    if (currentSubsetOrResult === maximumOverallOr) {
      maxOrSubsetCount++;
    }
  }

  return maxOrSubsetCount;
};
