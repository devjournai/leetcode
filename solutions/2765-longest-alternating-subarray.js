/**
 * Longest Alternating Subarray
 *
 * Intuition:
 * An alternating subarray must satisfy:
 *
 * 1. Length > 1.
 * 2. The first two elements differ by +1.
 * 3. Afterwards, the differences alternate:
 *
 *      +1, -1, +1, -1 ...
 *
 * Since n <= 100, we can simply try every starting index.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Iterate over every starting index i.
 *
 * 2. If nums[i + 1] != nums[i] + 1, it cannot start an alternating subarray.
 *
 * 3. Otherwise:
 *      - Initialize expected difference = -1.
 *      - Extend the subarray while the current difference matches the
 *        expected one.
 *      - Flip the expected difference after every successful extension.
 *
 * 4. Update the maximum length found.
 *
 * 5. If no valid subarray exists, return -1.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums = [2,3,4,3,4]
 *
 * Start at index 0:
 * 2 -> 3 ✓
 * Expected = -1
 * 3 -> 4 (+1) ✗
 * Length = 2
 *
 * Start at index 1:
 * 3 -> 4 ✓
 * Expected = -1
 * 4 -> 3 ✓
 * Expected = +1
 * 3 -> 4 ✓
 * Length = 4
 *
 * Answer = 4
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N²)
 * Space Complexity: O(1)
 */
var alternatingSubarray = function (nums) {
  const n = nums.length;

  let answer = -1;

  for (let i = 0; i < n - 1; i++) {
    if (nums[i + 1] !== nums[i] + 1) {
      continue;
    }

    let length = 2;
    let expected = -1;

    for (let j = i + 2; j < n; j++) {
      if (nums[j] - nums[j - 1] !== expected) {
        break;
      }

      length++;
      expected *= -1;
    }

    answer = Math.max(answer, length);
  }

  return answer;
};
