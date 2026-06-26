/**
 * Count Subarrays With Majority Element II
 * Intuition: The condition "target appears strictly more than half the times" in a subarray
 * can be transformed. If we assign a value of `1` to `target` and `-1` to any other element,
 * a subarray `nums[i...j]` has `target` as its majority element if and only if the sum of these
 * assigned values for `b[i...j]` (where `b` is the transformed array) is strictly greater than 0.
 * This is because if `count_target` is the number of `target` elements and `count_other` is the
 * number of other elements, the sum is `count_target - count_other`. The condition `count_target > count_other`
 * is equivalent to `count_target - count_other > 0`.
 *
 * Approach:
 * 1. Transform the input array `nums` into a binary array `b` where `b[k] = 1` if `nums[k] === target`
 *    and `b[k] = -1` if `nums[k] !== target`.
 * 2. The problem now becomes finding the number of subarrays `b[i...j]` whose sum is strictly positive.
 * 3. We use the concept of prefix sums. Let `s_x` be the sum of `b[0...x-1]`, with `s_0 = 0` representing
 *    the sum of an empty prefix. The sum of a subarray `b[i...j]` is `s_{j+1} - s_i`.
 *    We need to find pairs `(i, j)` (where `0 <= i <= j < n`) such that `s_{j+1} - s_i > 0`,
 *    which simplifies to `s_i < s_{j+1}`.
 * 4. Iterate `j` from `0` to `n-1`. In each iteration, we consider `s_{j+1}` as the current prefix sum.
 *    We need to count how many previous prefix sums `s_i` (where `0 <= i <= j`) are strictly less than `s_{j+1}`.
 * 5. To efficiently count elements less than a given value in a dynamic set of numbers, a Fenwick Tree
 *    (Binary Indexed Tree) is suitable.
 *    - The prefix sums `s_k` can range from `-n` to `n`. To map these values to 1-based non-negative indices
 *      suitable for a Fenwick Tree, we apply an `offset`. Let `offset = n`. Then, `mapped_s_k = s_k + offset`,
 *      which maps the range `[-n, n]` to `[0, 2n]`.
 *    - The Fenwick Tree itself uses 1-based indices. So, a mapped value `M` will correspond to `M + 1` in the FT.
 *      The maximum FT index required will be `(2n) + 1 = 2n + 1`. The Fenwick Tree array size should be `2n + 2`.
 * 6. Initialize the Fenwick Tree. The initial prefix sum `s_0 = 0` needs to be accounted for.
 *    Its mapped value is `0 + offset = n`. Update the Fenwick Tree at index `n + 1` with a count of `1`.
 * 7. Loop `j` from `0` to `n-1`:
 *    a. Calculate `currentPrefixSum = s_{j+1}` by adding `b[j]` to the previous `currentPrefixSum` (which was `s_j`).
 *    b. Query the Fenwick Tree: We want to count `s_i < currentPrefixSum`. This means `mapped_s_i < mapped_currentPrefixSum`.
 *       The highest FT index to query for this condition is `(mapped_currentPrefixSum - 1) + 1 = mapped_currentPrefixSum`.
 *       So, `ans += ft.query(currentPrefixSum + offset)`.
 *    c. Update the Fenwick Tree: Add the `currentPrefixSum` (`s_{j+1}`) to the set of seen prefix sums.
 *       Its mapped value is `currentPrefixSum + offset`. Update the Fenwick Tree at index `currentPrefixSum + offset + 1`
 *       with a count of `1`.
 * 8. Return the total count `ans`.
 *
 * Dry Run: `nums = [1,2,2,3], target = 2`
 * `n = 4`, `offset = 4`. `b = [-1, 1, 1, -1]`. `ft = new FenwickTree(10)` (indices 1-9). `ans = 0`.
 *
 * Initial: `ft.update(0 + 4 + 1, 1)` -> `ft.update(5, 1)`. `ft` has count 1 at index 5.
 *
 * `j = 0`: `b[0] = -1`
 *   `currentPrefixSum = -1`. `mapped = 3`.
 *   `ans += ft.query(3)` (sums up to mapped val 2) -> `ans += 0`. `ans = 0`.
 *   `ft.update(3 + 1, 1)` -> `ft.update(4, 1)`. `ft` has count 1 at 4, 1 at 5.
 *
 * `j = 1`: `b[1] = 1`
 *   `currentPrefixSum = -1 + 1 = 0`. `mapped = 4`.
 *   `ans += ft.query(4)` (sums up to mapped val 3) -> `ans += 1` (from FT index 4 for `s_i=-1`). `ans = 1`.
 *   `ft.update(4 + 1, 1)` -> `ft.update(5, 1)`. `ft` has count 1 at 4, 2 at 5.
 *
 * `j = 2`: `b[2] = 1`
 *   `currentPrefixSum = 0 + 1 = 1`. `mapped = 5`.
 *   `ans += ft.query(5)` (sums up to mapped val 4) -> `ans += 3` (from FT indices 4 for `s_i=-1` and 5 for `s_i=0` twice). `ans = 1 + 3 = 4`.
 *   `ft.update(5 + 1, 1)` -> `ft.update(6, 1)`. `ft` has count 1 at 4, 2 at 5, 1 at 6.
 *
 * `j = 3`: `b[3] = -1`
 *   `currentPrefixSum = 1 - 1 = 0`. `mapped = 4`.
 *   `ans += ft.query(4)` (sums up to mapped val 3) -> `ans += 1` (from FT index 4 for `s_i=-1`). `ans = 4 + 1 = 5`.
 *   `ft.update(4 + 1, 1)` -> `ft.update(5, 1)`. `ft` has count 1 at 4, 3 at 5, 1 at 6.
 *
 * Final `ans = 5`.
 *
 * Time Complexity: O(N log N)
 * - Transforming `nums` to `b`: O(N)
 * - Fenwick Tree initialization: O(N) (array creation and fill)
 * - Loop runs N times. Each iteration involves an O(log N) Fenwick Tree `query` and `update` operation.
 *   Total: N * O(log N) = O(N log N).
 * Space Complexity: O(N)
 * - `b` array: O(N)
 * - Fenwick Tree: O(2N) due to mapping, which simplifies to O(N).
 */
class FenwickTree {
  constructor(size) {
    this.tree = new Array(size).fill(0);
    this.size = size;
  }

  update(index, delta) {
    while (index < this.size) {
      this.tree[index] += delta;
      index += index & -index;
    }
  }

  query(index) {
    let sum = 0;
    while (index > 0) {
      sum += this.tree[index];
      index -= index & -index;
    }
    return sum;
  }
}

var countMajoritySubarrays = function (nums, target) {
  const n = nums.length;

  const b = new Array(n);
  for (let i = 0; i < n; i++) {
    b[i] = nums[i] === target ? 1 : -1;
  }

  let currentPrefixSum = 0;
  let ans = 0;

  const offset = n;
  const fenwickTreeLogicalMaxIndex = 2 * n;
  const fenwickTreeArraySize = fenwickTreeLogicalMaxIndex + 1 + 1;
  const ft = new FenwickTree(fenwickTreeArraySize);

  ft.update(0 + offset + 1, 1);

  for (let j = 0; j < n; j++) {
    currentPrefixSum += b[j];
    ans += ft.query(currentPrefixSum + offset);
    ft.update(currentPrefixSum + offset + 1, 1);
  }

  return ans;
};
