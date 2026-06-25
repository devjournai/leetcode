/**
 * Count Subarrays With Majority Element I
 * Intuition: The problem asks us to count subarrays where `target` is the majority element. An element is a majority element if it appears strictly more than half the times in a subarray.
 * Let a subarray have length `L`. Let `countTarget` be the number of times `target` appears, and `countOther` be the number of times other elements appear.
 * The condition is `countTarget > L / 2`, which is equivalent to `2 * countTarget > L`.
 * Since `L = countTarget + countOther`, substituting this into the inequality gives:
 * `2 * countTarget > countTarget + countOther`
 * `countTarget > countOther`
 * This transformation is key. We can now convert the `nums` array into a new array `transformedNums` where each element `x` is `1` if `x === target` and `-1` if `x !== target`.
 * For any subarray in `transformedNums`, its sum `S` will be `countTarget * 1 + countOther * (-1) = countTarget - countOther`.
 * Therefore, the original condition `countTarget > countOther` is equivalent to `S > 0`.
 * The problem is reduced to finding the number of subarrays in `transformedNums` whose sum is strictly positive.
 *
 * Approach:
 * 1. Initialize `ans = 0` to store the total count of valid subarrays.
 * 2. Initialize `currentSum = 0` to keep track of the prefix sum of the `transformedNums` array up to the current element.
 * 3. To efficiently count subarrays with positive sums, we can use a Fenwick Tree (BIT). The prefix sums can range from `-N` to `N` (where `N` is `nums.length`).
 * 4. We need to map these prefix sums to 1-based indices for the BIT. A common mapping is `s_mapped = s + N + 1`. This maps the smallest possible sum `-N` to `1`, `0` to `N+1`, and the largest `N` to `2N+1`. The BIT will have a size of `2N+1`.
 * 5. Initialize the Fenwick Tree. Before processing any elements, the prefix sum is `0`. So, we update the BIT to indicate one occurrence of prefix sum `0` by calling `bit.update(0 + bitOffset, 1)`.
 * 6. Iterate through `nums` from `k = 0` to `N-1`:
 *    a. Determine the `value` for `nums[k]`: `1` if `nums[k] === target`, else `-1`.
 *    b. Update `currentSum` by adding `value`. This `currentSum` represents `sum(transformedNums[0]...transformedNums[k])`.
 *    c. We are looking for subarrays `transformedNums[i...k]` whose sum is positive. This sum is `currentSum - prefixSum_before_i`. So we need `currentSum - prefixSum_before_i > 0`, which means `prefixSum_before_i < currentSum`.
 *    d. Query the Fenwick Tree to find the number of `prefixSum_before_i` values that are strictly less than `currentSum`. This is done by querying `bit.query(currentSum + bitOffset - 1)`. Add this count to `ans`.
 *    e. Update the Fenwick Tree by adding `1` at the mapped index for the `currentSum`. This records the `currentSum` as a prefix sum encountered so far.
 * 7. After iterating through all elements, return `ans`.
 *
 * Dry Run: nums = [1,2,2,3], target = 2
 * N = 4. `bitOffset = N + 1 = 5`. `bitSize = 2*N + 1 = 9`.
 * `bit` is a FenwickTree of size 9.
 * `ans = 0`, `currentSum = 0`.
 * `bit.update(0 + bitOffset, 1)` -> `bit.update(5, 1)`. (Represents prefix sum 0 before any elements).
 *
 * k = 0 (nums[0] = 1):
 *   `value = -1`. `currentSum = -1`.
 *   Query: `ans += bit.query(-1 + bitOffset - 1)` -> `ans += bit.query(3)`. Returns `0`. `ans` remains `0`.
 *   Update: `bit.update(-1 + bitOffset, 1)` -> `bit.update(4, 1)`. (Records prefix sum -1).
 *   `bit` now reflects counts for prefix sums `(-1:1, 0:1)`.
 *
 * k = 1 (nums[1] = 2):
 *   `value = 1`. `currentSum = 0`.
 *   Query: `ans += bit.query(0 + bitOffset - 1)` -> `ans += bit.query(4)`. Returns `1` (for prefix sum -1). `ans = 0 + 1 = 1`. (Subarray [2] from index 1 is valid).
 *   Update: `bit.update(0 + bitOffset, 1)` -> `bit.update(5, 1)`. (Records another prefix sum 0).
 *   `bit` now reflects `(-1:1, 0:2)`.
 *
 * k = 2 (nums[2] = 2):
 *   `value = 1`. `currentSum = 1`.
 *   Query: `ans += bit.query(1 + bitOffset - 1)` -> `ans += bit.query(5)`. Returns `3` (for prefix sums -1, 0, 0). `ans = 1 + 3 = 4`. (Subarrays [2], [2,2], [1,2,2] ending at index 2 are valid).
 *   Update: `bit.update(1 + bitOffset, 1)` -> `bit.update(6, 1)`. (Records prefix sum 1).
 *   `bit` now reflects `(-1:1, 0:2, 1:1)`.
 *
 * k = 3 (nums[3] = 3):
 *   `value = -1`. `currentSum = 0`.
 *   Query: `ans += bit.query(0 + bitOffset - 1)` -> `ans += bit.query(4)`. Returns `1` (for prefix sum -1). `ans = 4 + 1 = 5`. (Subarray [2,2,3] ending at index 3 is valid).
 *   Update: `bit.update(0 + bitOffset, 1)` -> `bit.update(5, 1)`. (Records another prefix sum 0).
 *   `bit` now reflects `(-1:1, 0:3, 1:1)`.
 *
 * Loop ends. Return `ans = 5`. This matches Example 1.
 *
 * Time Complexity: O(N log N),
 * Space Complexity: O(N)
 */
var countMajoritySubarrays = function (nums, target) {
  const n = nums.length;

  class FenwickTree {
    constructor(size) {
      this.tree = new Array(size + 1).fill(0);
      this.size = size;
    }

    update(index, delta) {
      if (index <= 0 || index > this.size) {
        return;
      }
      while (index <= this.size) {
        this.tree[index] += delta;
        index += index & -index;
      }
    }

    query(index) {
      if (index <= 0) {
        return 0;
      }
      if (index > this.size) {
        index = this.size;
      }
      let sum = 0;
      while (index > 0) {
        sum += this.tree[index];
        index -= index & -index;
      }
      return sum;
    }
  }

  const bitOffset = n + 1;
  const bitSize = 2 * n + 1;
  const bit = new FenwickTree(bitSize);

  let ans = 0;
  let currentSum = 0;

  bit.update(0 + bitOffset, 1);

  for (let k = 0; k < n; k++) {
    const value = nums[k] === target ? 1 : -1;
    currentSum += value;

    ans += bit.query(currentSum + bitOffset - 1);

    bit.update(currentSum + bitOffset, 1);
  }

  return ans;
};
