/**
 * Check If All 1s Are At Least Length K Places Away
 * Intuition: Track zeros between consecutive 1s. After the first 1, any later 1 with fewer than k zeros between them fails.
 * Approach: 1. gapCount starts at -1 (no 1 seen). 2. On a 1, if gapCount is set and < k, return false, then reset gapCount to 0. 3. On a 0 after a 1, increment gapCount. 4. Return true if the scan finishes.
 * Dry Run: nums = [1,0,0,0,1,0,0,1], k = 2
 *   - first 1 at 0, gap=0
 *   - three zeros, next 1 with gap=3 >=2 ok
 *   - two zeros, last 1 with gap=2 >=2. Return true.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var kLengthApart = function (nums, k) {
  let gapCount = -1;

  for (let elementIndex = 0; elementIndex < nums.length; elementIndex++) {
    let currentNumber = nums[elementIndex];

    if (currentNumber === 1) {
      if (gapCount !== -1 && gapCount < k) {
        return false;
      }
      gapCount = 0;
    } else {
      if (gapCount !== -1) {
        gapCount++;
      }
    }
  }

  return true;
};
