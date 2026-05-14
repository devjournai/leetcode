/**
 * Check if Array is Good
 * Intuition: A "good" array base[n] has a specific structure: 1 to n-1 appear once, and n appears twice. The length is always n+1. We can find the candidate for 'n' by taking the maximum value in the array, then verify length and element frequencies.
 * Approach: 1. Determine the maximum value in the input array, which serves as our candidate 'n'. 2. Check if the array's length matches 'n + 1'. If not, it's not good. 3. Use a frequency map (array) to count occurrences of each number. 4. Iterate through the frequency map to ensure numbers 1 to 'n-1' appear exactly once, and 'n' appears exactly twice.
 * Dry Run: nums = [1, 2, 3, 3]
 *   1. maxVal = Math.max(1, 2, 3, 3) = 3.
 *   2. nums.length = 4. maxVal + 1 = 3 + 1 = 4. Length check (4 === 4) passes.
 *   3. Initialize counts = [0, 0, 0, 0] (indices 0, 1, 2, 3).
 *   4. Iterate through nums:
 *      - currentNum = 1: counts[1] becomes 1. counts = [0, 1, 0, 0].
 *      - currentNum = 2: counts[2] becomes 1. counts = [0, 1, 1, 0].
 *      - currentNum = 3: counts[3] becomes 1. counts = [0, 1, 1, 1].
 *      - currentNum = 3: counts[3] becomes 2. counts = [0, 1, 1, 2].
 *   5. Iterate iterVal from 1 to maxVal - 1 (i.e., 1 to 2):
 *      - iterVal = 1: counts[1] is 1. (1 === 1) is true.
 *      - iterVal = 2: counts[2] is 1. (1 === 1) is true.
 *   6. Check counts[maxVal] (i.e., counts[3]). counts[3] is 2. (2 === 2) is true.
 *   7. Return true.
 * Time Complexity: O(N)
 * Space Complexity: O(maxVal)
 */
var isGood = function (nums) {
  const maxVal = Math.max(...nums);

  if (nums.length !== maxVal + 1) {
    return false;
  }

  const valueCounts = new Array(maxVal + 1).fill(0);

  for (let currentIdx = 0; currentIdx < nums.length; currentIdx++) {
    const numberEntry = nums[currentIdx];
    if (numberEntry < 1 || numberEntry > maxVal) {
      return false;
    }
    valueCounts[numberEntry]++;
  }

  for (let checkValue = 1; checkValue < maxVal; checkValue++) {
    if (valueCounts[checkValue] !== 1) {
      return false;
    }
  }

  return valueCounts[maxVal] === 2;
};
