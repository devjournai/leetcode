/**
 * Number Of Subarrays That Match A Pattern I
 * Intuition: The problem requires finding occurrences of a specific relational pattern within subarrays of 'nums'. The most straightforward approach is to iterate through every possible subarray of the correct length and check if its adjacent elements match the given pattern's conditions (increasing, decreasing, or equal).
 * Approach: 1. Initialize a counter, `matchCount`, to store the total number of matching subarrays. 2. Determine the length of the pattern, `patternLength`, and the length of the input array, `numsLength`. 3. Loop through `nums` using an `startIndex` variable. This `startIndex` will represent the beginning of a potential subarray. The loop's upper bound must ensure that a subarray of size `patternLength + 1` can still be formed (i.e., `startIndex + patternLength` must be within `nums` bounds). 4. Inside this outer loop, assume the current subarray matches the pattern by setting a boolean flag, `currentSubarrayMatches`, to true. 5. Begin an inner loop with `patternIndex` from 0 to `patternLength - 1`. In each iteration, compare `nums[startIndex + patternIndex + 1]` with `nums[startIndex + patternIndex]` based on `pattern[patternIndex]`. 6. If `pattern[patternIndex]` is 1, check if `nums[startIndex + patternIndex + 1]` is strictly greater than `nums[startIndex + patternIndex]`. If not, it's a mismatch. 7. If `pattern[patternIndex]` is 0, check if `nums[startIndex + patternIndex + 1]` is equal to `nums[startIndex + patternIndex]`. If not, it's a mismatch. 8. If `pattern[patternIndex]` is -1, check if `nums[startIndex + patternIndex + 1]` is strictly less than `nums[startIndex + patternIndex]`. If not, it's a mismatch. 9. If any mismatch is found in the inner loop, set `currentSubarrayMatches` to false and `break` out of the inner loop immediately. 10. After the inner loop completes, if `currentSubarrayMatches` is still true, increment `matchCount`. 11. Finally, return `matchCount`.
 * Dry Run: Given nums = [1,2,3,4,3,2,1], pattern = [1,0,-1]. patternLength = 3, numsLength = 7.
 *   - Initialize matchCount = 0.
 *   - Outer loop (startIndex) runs from 0 to (numsLength - patternLength - 1) = (7 - 3 - 1) = 3.
 *   - startIndex = 0 (consider subarray nums[0..3] which is [1,2,3,4]):
 *     - currentSubarrayMatches = true.
 *     - inner loop (patternIndex):
 *       - patternIndex = 0: pattern[0] = 1. Compare nums[1] (2) and nums[0] (1). 2 > 1 holds. No mismatch.
 *       - patternIndex = 1: pattern[1] = 0. Compare nums[2] (3) and nums[1] (2). 3 == 2 is false. Mismatch.
 *       - Set currentSubarrayMatches = false. Break inner loop.
 *     - Since currentSubarrayMatches is false, matchCount remains 0.
 *   - startIndex = 1 (consider subarray nums[1..4] which is [2,3,4,3]):
 *     - currentSubarrayMatches = true.
 *     - inner loop (patternIndex):
 *       - patternIndex = 0: pattern[0] = 1. Compare nums[2] (3) and nums[1] (2). 3 > 2 holds. No mismatch.
 *       - patternIndex = 1: pattern[1] = 0. Compare nums[3] (4) and nums[2] (3). 4 == 3 is false. Mismatch.
 *       - Set currentSubarrayMatches = false. Break inner loop.
 *     - Since currentSubarrayMatches is false, matchCount remains 0.
 *   - startIndex = 2 (consider subarray nums[2..5] which is [3,4,3,2]):
 *     - currentSubarrayMatches = true.
 *     - inner loop (patternIndex):
 *       - patternIndex = 0: pattern[0] = 1. Compare nums[3] (4) and nums[2] (3). 4 > 3 holds. No mismatch.
 *       - patternIndex = 1: pattern[1] = 0. Compare nums[4] (3) and nums[3] (4). 3 == 4 is false. Mismatch.
 *       - Set currentSubarrayMatches = false. Break inner loop.
 *     - Since currentSubarrayMatches is false, matchCount remains 0.
 *   - startIndex = 3 (consider subarray nums[3..6] which is [4,3,2,1]):
 *     - currentSubarrayMatches = true.
 *     - inner loop (patternIndex):
 *       - patternIndex = 0: pattern[0] = 1. Compare nums[4] (3) and nums[3] (4). 3 > 4 is false. Mismatch.
 *       - Set currentSubarrayMatches = false. Break inner loop.
 *     - Since currentSubarrayMatches is false, matchCount remains 0.
 *   - Outer loop finishes.
 *   - Return matchCount (0).
 * Time Complexity: O(N * M)
 * Space Complexity: O(1)
 */
var countMatchingSubarrays = function (nums, pattern) {
  let matchCount = 0;
  const patternLength = pattern.length;
  const numsLength = nums.length;

  for (
    let startIndex = 0;
    startIndex <= numsLength - patternLength - 1;
    startIndex++
  ) {
    let currentSubarrayMatches = true;

    for (let patternIndex = 0; patternIndex < patternLength; patternIndex++) {
      const numberValueA = nums[startIndex + patternIndex];
      const numberValueB = nums[startIndex + patternIndex + 1];
      const currentPatternElement = pattern[patternIndex];

      if (
        (currentPatternElement === 1 && numberValueB <= numberValueA) ||
        (currentPatternElement === 0 && numberValueB !== numberValueA) ||
        (currentPatternElement === -1 && numberValueB >= numberValueA)
      ) {
        currentSubarrayMatches = false;
        break;
      }
    }

    if (currentSubarrayMatches) {
      matchCount++;
    }
  }

  return matchCount;
};
