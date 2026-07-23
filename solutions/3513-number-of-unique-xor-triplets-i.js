/**
 * Number of Unique XOR Triplets I
 * Intuition: The key insight stems from `nums` being a permutation of `[1, n]` and the properties of XOR. The constraint `i <= j <= k` implies we pick three (not necessarily distinct) elements from `nums` and XOR them. Since XOR is commutative and associative, the order of elements in the XOR sum doesn't matter. The `i <= j <= k` constraint essentially means we can pick any three values `a, b, c` from the set `{1, 2, ..., n}` (with replacement), and we can always find indices `p_a, p_b, p_c` such that `nums[p_a]=a, nums[p_b]=b, nums[p_c]=c`. Sorting these indices `idx1 <= idx2 <= idx3` allows us to form the triplet `nums[idx1] XOR nums[idx2] XOR nums[idx3]`, which will result in `a XOR b XOR c`. Therefore, the problem simplifies to finding all unique values of `x XOR y XOR z` where `x, y, z` are chosen from the set `{1, 2, ..., n}` with replacement.
 *
 * Approach:
 * 1. Handle base cases for `n = 1` and `n = 2`:
 *    - If `n = 1`, `nums = [1]`. The only triplet is `(0,0,0)`, giving `1 XOR 1 XOR 1 = 1`. Unique values: `{1}`. Count: 1.
 *    - If `n = 2`, `nums = [1,2]`. Possible triplets give `1` or `2`. Unique values: `{1,2}`. Count: 2.
 * 2. For `n >= 3`:
 *    a. Determine `B`, the smallest integer such that `2^B > n`. This can be calculated using `B = Math.floor(Math.log2(n)) + 1`. This `B` defines the number of bits required to represent `n` (and thus `2^B - 1` is the largest number representable with `B` bits).
 *    b. Leverage a known property: For a set of numbers `S = {1, 2, ..., n}`, the set of all possible XOR sums of two elements (`x XOR y` where `x, y \in S`) is exactly `[0, 2^B - 1]`, provided `n \ge 2^(B-1)`. Since `B = floor(log2(n)) + 1`, we have `2^(B-1) <= n < 2^B`, so this condition holds for `n >= 1`.
 *    c. Show that any value `X` in `[0, 2^B - 1]` can be formed as `x XOR y XOR z`:
 *       - Choose `x = 1` (since `n >= 1`, `1` is always in `S`).
 *       - Let `Y = X XOR 1`. Since `X` is in `[0, 2^B - 1]`, `Y` will also be in `[0, 2^B - 1]`.
 *       - From step (b), since `Y \in [0, 2^B - 1]`, there exist `y, z \in S` such that `y XOR z = Y`.
 *       - Therefore, `X = 1 XOR Y = 1 XOR (y XOR z)`.
 *       - This shows any value `X` in `[0, 2^B - 1]` can be formed by XORing three elements (`1`, `y`, `z`) all taken from `S = {1, 2, ..., n}\}$.
 *    d. The set of unique XOR triplet values is exactly `[0, 2^B - 1]`. The count of unique values is `2^B`.
 *
 * Dry Run: `nums = [3,1,2]`
 * 1. `n = nums.length = 3`.
 * 2. `n` is not `1` or `2`. Proceed to the general case.
 * 3. Calculate `B`: `B = Math.floor(Math.log2(3)) + 1`.
 *    - `Math.log2(3)` is approximately `1.58496`.
 *    - `Math.floor(1.58496)` is `1`.
 *    - So, `B = 1 + 1 = 2`.
 * 4. The result is `1 << B`, which is `1 << 2`.
 * 5. `1 << 2` evaluates to `4`.
 * 6. The output is `4`, matching Example 2.
 *
 * Dry Run: `nums = [1,2]`
 * 1. `n = nums.length = 2`.
 * 2. The code hits the `if (n === 2)` condition.
 * 3. The function directly returns `2`.
 * 4. The output is `2`, matching Example 1.
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var uniqueXorTriplets = function (nums) {
  const n = nums.length;

  if (n === 1) {
    return 1;
  }

  if (n === 2) {
    return 2;
  }
  const B = Math.floor(Math.log2(n)) + 1;
  return 1 << B;
};
