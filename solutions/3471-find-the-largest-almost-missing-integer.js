/**
 * Find the Largest Almost Missing Integer
 * Intuition: An integer 'x' is almost missing if it appears in exactly one subarray of size k. To find this, we need to count how many distinct subarrays each number appears in.
 * Approach:
 * 1. Initialize a `countsMap` (using a JavaScript `Map`) to store the count of subarrays each number appears in. The key will be the number, and the value will be the number of distinct `k`-sized subarrays it's present in.
 * 2. Iterate through `nums` using a sliding window of size `k` to generate all possible subarrays of length `k`. The loop will run from `i = 0` to `n - k`, where `n` is `nums.length`.
 * 3. For each `k`-sized subarray `nums[i...i+k-1]`:
 *    a. Create a `Set` (e.g., `currentSubarrayElements`) to store the unique elements within this current subarray. This is crucial because if a number appears multiple times within the *same* subarray, it still counts as appearing in only *that one* subarray.
 *    b. Iterate through the elements of the current subarray and add them to `currentSubarrayElements`.
 *    c. After populating `currentSubarrayElements`, iterate through the unique numbers in this `Set`. For each unique number, increment its count in `countsMap`.
 * 4. After processing all `k`-sized subarrays, initialize `maxAlmostMissing` to -1.
 * 5. Iterate through the `countsMap`. For each `[num, count]` pair:
 *    a. If `count` is exactly 1, it means `num` is an "almost missing" integer. Update `maxAlmostMissing = Math.max(maxAlmostMissing, num)`.
 * 6. Return `maxAlmostMissing`.
 * Dry Run:
 * Input: nums = [3,9,2,1,7], k = 3
 * n = 5
 * countsMap = {}
 * maxAlmostMissing = -1
 *
 * i = 0 (Subarray: [3,9,2]):
 *   currentSubarrayElements = {3, 9, 2}
 *   countsMap: {3:1, 9:1, 2:1}
 *
 * i = 1 (Subarray: [9,2,1]):
 *   currentSubarrayElements = {9, 2, 1}
 *   countsMap: {3:1, 9:2, 2:2, 1:1}
 *
 * i = 2 (Subarray: [2,1,7]):
 *   currentSubarrayElements = {2, 1, 7}
 *   countsMap: {3:1, 9:2, 2:3, 1:2, 7:1}
 *
 * (End of subarray generation)
 *
 * Iterate through countsMap:
 *   - (3, 1): count is 1. maxAlmostMissing = max(-1, 3) = 3.
 *   - (9, 2): count is not 1.
 *   - (2, 3): count is not 1.
 *   - (1, 2): count is not 1.
 *   - (7, 1): count is 1. maxAlmostMissing = max(3, 7) = 7.
 *
 * Return 7.
 * Time Complexity: O(N * K), where N is `nums.length`. We iterate N-K+1 times for subarrays, and for each subarray, we iterate K times to populate a Set, and then up to K times again to update the map. Since N <= 50 and K <= 50, N*K is at most 50*50 = 2500, which is very efficient.
 * Space Complexity: O(K + V), where K is the size of the window and V is the range of values in `nums` (0 to 50). The `currentSubarrayElements` Set stores up to K elements. The `countsMap` stores counts for up to V distinct numbers. Given the constraints, this is O(50), effectively constant space.
 */
var largestInteger = function (nums, k) {
  const countsMap = new Map();
  const n = nums.length;

  for (let i = 0; i <= n - k; i++) {
    const currentSubarrayElements = new Set();

    for (let j = 0; j < k; j++) {
      currentSubarrayElements.add(nums[i + j]);
    }

    for (const num of currentSubarrayElements) {
      countsMap.set(num, (countsMap.get(num) || 0) + 1);
    }
  }

  let maxAlmostMissing = -1;

  for (const [num, count] of countsMap.entries()) {
    if (count === 1) {
      maxAlmostMissing = Math.max(maxAlmostMissing, num);
    }
  }

  return maxAlmostMissing;
};
