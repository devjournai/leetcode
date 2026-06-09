/**
 * Maximum Total Subarray Value I
 * Intuition: The problem allows choosing the exact same subarray multiple times. To maximize the total value,
 * it is always optimal to identify the single subarray that yields the highest possible value (max(subarray) - min(subarray))
 * and then choose that specific subarray `k` times.
 *
 * A key observation is that for any subarray `S = nums[l..r]`, its value `max(S) - min(S)`
 * is always less than or equal to the value of the entire array `A = nums[0..n-1]`, which is `max(A) - min(A)`.
 * This is because `max(S) <= max(A)` (the maximum of a sub-range cannot exceed the maximum of the full range)
 * and `min(S) >= min(A)` (the minimum of a sub-range cannot be less than the minimum of the full range).
 * Therefore, `max(S) - min(S) <= max(A) - min(A)`.
 * This implies that the maximum possible value for any single subarray is achieved by considering the entire `nums` array itself.
 *
 * Approach:
 * 1. Find the maximum element, `maxVal`, in the entire `nums` array.
 * 2. Find the minimum element, `minVal`, in the entire `nums` array.
 * 3. Calculate the maximum possible value for a single subarray: `singleMaxValue = maxVal - minVal`.
 * 4. The total maximum value is `singleMaxValue * k`, as we can choose this optimal subarray `k` times.
 *
 * Dry Run: nums = [1,3,2], k = 2
 * 1. Initialize `maxVal = nums[0] = 1` and `minVal = nums[0] = 1` (since the problem guarantees `n >= 1`).
 * 2. Iterate from `i = 1` to `nums.length - 1`:
 *    - For `i = 1`, `nums[1] = 3`:
 *      - `maxVal = Math.max(1, 3) = 3`
 *      - `minVal = Math.min(1, 3) = 1`
 *    - For `i = 2`, `nums[2] = 2`:
 *      - `maxVal = Math.max(3, 2) = 3`
 *      - `minVal = Math.min(1, 2) = 1`
 * 3. After the loop completes, `maxVal = 3` and `minVal = 1`.
 * 4. Calculate `singleMaxValue = maxVal - minVal = 3 - 1 = 2`.
 * 5. Calculate `totalValue = singleMaxValue * k = 2 * 2 = 4`.
 * Return 4.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxTotalValue = function (nums, k) {
  let maxVal = nums[0];
  let minVal = nums[0];

  for (let i = 1; i < nums.length; i++) {
    maxVal = Math.max(maxVal, nums[i]);
    minVal = Math.min(minVal, nums[i]);
  }

  const singleMaxValue = maxVal - minVal;
  return singleMaxValue * k;
};
