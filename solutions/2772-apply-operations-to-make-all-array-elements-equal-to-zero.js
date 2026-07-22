/**
 * Apply Operations to Make All Array Elements Equal to Zero
 *
 * Intuition:
 * We process the array from left to right.
 *
 * When we reach index i, the only remaining operation that can change
 * nums[i] is a subarray starting at i (because any earlier starting position
 * has already been processed).
 *
 * Therefore, if the current value at index i is x, we must perform exactly
 * x operations starting at i.
 *
 * To efficiently apply these operations to a range of length k, we use a
 * difference array to track the cumulative decrements affecting each index.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Maintain:
 *
 *      diff[]
 *          Difference array storing when decrements stop.
 *
 *      active
 *          Total decrements currently affecting the current index.
 *
 * 2. Traverse the array from left to right.
 *
 * 3. Before processing index i:
 *
 *      active += diff[i]
 *
 * 4. Compute the remaining value:
 *
 *      current = nums[i] + active
 *
 *      (active is negative because it represents applied decrements.)
 *
 * 5. If current < 0,
 *      return false.
 *
 * 6. If current > 0:
 *
 *      • If there are fewer than k elements remaining,
 *        return false.
 *
 *      • Start current operations here:
 *
 *            active -= current
 *
 *      • Schedule their expiration:
 *
 *            diff[i + k] += current
 *
 * 7. If every index is processed successfully,
 *      return true.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums = [2,2,3,1,1,0]
 * k = 3
 *
 * i = 0
 *
 * current = 2
 *
 * Apply 2 operations
 *
 * active = -2
 *
 * i = 1
 *
 * current = 2 - 2 = 0
 *
 * i = 2
 *
 * current = 3 - 2 = 1
 *
 * Apply 1 operation
 *
 * active = -3
 *
 * Continue...
 *
 * Every element becomes 0.
 *
 * Answer = true
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var checkArray = function (nums, k) {
  const n = nums.length;

  const diff = new Array(n + 1).fill(0);

  let active = 0;

  for (let i = 0; i < n; i++) {
    active += diff[i];

    const current = nums[i] + active;

    if (current < 0) {
      return false;
    }

    if (current > 0) {
      if (i + k > n) {
        return false;
      }

      active -= current;

      diff[i + k] += current;
    }
  }

  return true;
};
