/**
 * Continuous Subarrays
 *
 * Intuition:
 * A subarray is continuous if the difference between its maximum and minimum
 * elements is at most 2.
 *
 * Therefore, we need to count all subarrays where:
 *
 *      max - min <= 2
 *
 * We can use a sliding window while maintaining the minimum and maximum
 * values in the current window using two monotonic deques.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Maintain a sliding window [left, right].
 *
 * 2. Use:
 *
 *      maxDeque -> decreasing values (front is maximum)
 *      minDeque -> increasing values (front is minimum)
 *
 * 3. For every nums[right]:
 *
 *      • Insert into both deques while preserving monotonicity.
 *
 * 4. While:
 *
 *      maxDeque.front - minDeque.front > 2
 *
 *      move left forward and remove expired elements from the deques.
 *
 * 5. Every valid window contributes:
 *
 *      right - left + 1
 *
 * subarrays ending at right.
 *
 * 6. Sum these contributions.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums = [5,4,2,4]
 *
 * right = 0
 * Window = [5]
 * Add 1
 *
 * right = 1
 * Window = [5,4]
 * Add 2
 *
 * right = 2
 * max = 5
 * min = 2
 * diff = 3
 *
 * Move left
 *
 * Window = [4,2]
 * Add 2
 *
 * right = 3
 * Window = [4,2,4]
 * Add 3
 *
 * Total = 1 + 2 + 2 + 3 = 8
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var continuousSubarrays = function (nums) {
  const maxDeque = [];
  const minDeque = [];

  let left = 0;
  let answer = 0;

  for (let right = 0; right < nums.length; right++) {
    while (
      maxDeque.length &&
      nums[maxDeque[maxDeque.length - 1]] < nums[right]
    ) {
      maxDeque.pop();
    }

    maxDeque.push(right);

    while (
      minDeque.length &&
      nums[minDeque[minDeque.length - 1]] > nums[right]
    ) {
      minDeque.pop();
    }

    minDeque.push(right);

    while (nums[maxDeque[0]] - nums[minDeque[0]] > 2) {
      if (maxDeque[0] === left) {
        maxDeque.shift();
      }

      if (minDeque[0] === left) {
        minDeque.shift();
      }

      left++;
    }

    answer += right - left + 1;
  }

  return answer;
};
