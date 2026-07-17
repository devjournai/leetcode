/**
 * Longest Even Odd Subarray With Threshold
 *
 * Intuition:
 * We need the longest contiguous subarray satisfying:
 *
 * 1. Starts with an even number.
 * 2. Every value is <= threshold.
 * 3. Adjacent elements have alternating parity.
 *
 * Since n <= 100, simply try every valid starting index.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Iterate through every index i.
 *
 * 2. Skip if:
 *      - nums[i] is odd
 *      - nums[i] > threshold
 *
 * 3. Otherwise, extend the subarray while:
 *      - current value <= threshold
 *      - parity alternates with previous element
 *
 * 4. Update the maximum length.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums = [3,2,5,4]
 * threshold = 5
 *
 * Start at index 1:
 *
 * 2 -> 5 -> 4
 *
 * Length = 3
 *
 * Answer = 3
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N²)
 * Space Complexity: O(1)
 */

var longestAlternatingSubarray = function (nums, threshold) {
  const n = nums.length;

  let answer = 0;

  for (let i = 0; i < n; i++) {
    if (nums[i] > threshold || nums[i] % 2 === 1) {
      continue;
    }

    let length = 1;

    for (let j = i + 1; j < n; j++) {
      if (nums[j] > threshold) {
        break;
      }

      if (nums[j] % 2 === nums[j - 1] % 2) {
        break;
      }

      length++;
    }

    answer = Math.max(answer, length);
  }

  return answer;
};
