/**
 * Number of ZigZag Arrays I
 * Intuition: The condition "no three consecutive elements form a strictly increasing or strictly decreasing sequence" implies that the array must strictly alternate in trend: either `a < b > c < d ...` (peak-valley pattern) or `a > b < c > d ...` (valley-peak pattern). This structure allows for dynamic programming where the state captures the last element's value and the trend leading up to it.
 * Approach:
 * 1. Define DP states: We use `dp[i][j][state]` to represent the number of valid ZigZag arrays of length `i` where the last element `arr[i-1]` has value `j`, and `state` indicates the trend from `arr[i-2]` to `arr[i-1]`.
 *    - `state = 0`: `arr[i-2] < arr[i-1]` (increasing trend, making `arr[i-1]` potentially a peak if `arr[i-2]` was a valley or the end of an increasing segment)
 *    - `state = 1`: `arr[i-2] > arr[i-1]` (decreasing trend, making `arr[i-1]` potentially a valley if `arr[i-2]` was a peak or the end of a decreasing segment)
 * 2. Map values to indices: Elements are in `[l, r]`. To use 0-indexed arrays, map value `j` to index `j - l`. Let `D = r - l + 1` be the number of distinct values. Indices will range from `0` to `D-1`.
 * 3. Base Case (length `i=2`):
 *    - For `dp[2][j][0]` (arrays like `[k, j]` with `k < j`): `k` can be any value from `l` to `j-1`. There are `j - l` such values.
 *    - For `dp[2][j][1]` (arrays like `[k, j]` with `k > j`): `k` can be any value from `j+1` to `r`. There are `r - j` such values.
 * 4. Recurrence Relation (length `i` from `3` to `n`):
 *    - To calculate `dp[i][j][0]` (ending with `prev_val < j`): The preceding sequence must have ended with a decreasing trend to `prev_val`. So, we sum `dp[i-1][k][1]` for all `k < j`.
 *    - To calculate `dp[i][j][1]` (ending with `prev_val > j`): The preceding sequence must have ended with an increasing trend to `prev_val`. So, we sum `dp[i-1][k][0]` for all `k > j`.
 * 5. Optimization with Prefix Sums: The sums `sum(dp[i-1][k][state])` are range queries. These can be optimized using prefix sums. For each `i`, compute prefix sums for `dp[i-1][k][0]` and `dp[i-1][k][1]` arrays. This allows range sums in `O(1)`.
 * 6. Space Optimization: Since `dp[i]` only depends on `dp[i-1]`, we can reduce the space complexity from `O(N * D)` to `O(D)` by only storing the `prevDp` states and `currDp` states.
 * 7. Modulo Arithmetic: All calculations are performed modulo `10^9 + 7`. When performing subtraction `(A - B) % MOD`, ensure the result is non-negative by adding `MOD` if `A - B` is negative: `(A - B + MOD) % MOD`.
 *
 * Dry Run: (Example 1: n = 3, l = 4, r = 5)
 * D = 2. Values: 4 (idx 0), 5 (idx 1). MOD = 1e9+7.
 * Initial: `prevDpInc = [0, 0]`, `prevDpDec = [0, 0]`
 * Base Case i=2:
 *   v_idx = 0 (val=4): `prevDpInc[0] = (4-4) = 0`. `prevDpDec[0] = (5-4) = 1`.
 *   v_idx = 1 (val=5): `prevDpInc[1] = (5-4) = 1`. `prevDpDec[1] = (5-5) = 0`.
 * `prevDpInc = [0, 1]`, `prevDpDec = [1, 0]`
 *
 * Loop i=3 (to n):
 *   `currDpInc = [0, 0]`, `currDpDec = [0, 0]`
 *   `prefixSumIncPrev`, `prefixSumDecPrev`
 *   Compute prefix sums for `prevDpInc` and `prevDpDec`:
 *     `prefixSumIncPrev = [0, 1]`
 *     `prefixSumDecPrev = [1, 1]`
 *   Compute `currDp` for length 3:
 *     v_idx = 0 (val=4):
 *       `currDpInc[0]` (`... < 4`): `v_idx=0`, so `0`.
 *       `currDpDec[0]` (`... > 4`): `v_idx=0 < D-1`. Sum `prevDpInc[k]` for `k > 0`. This is `prefixSumIncPrev[1] - prefixSumIncPrev[0] = 1 - 0 = 1`. (`[4,5,4]`)
 *     v_idx = 1 (val=5):
 *       `currDpInc[1]` (`... < 5`): `v_idx=1 > 0`. Sum `prevDpDec[k]` for `k < 1`. This is `prefixSumDecPrev[0] = 1`. (`[5,4,5]`)
 *       `currDpDec[1]` (`... > 5`): `v_idx=1`, not `< D-1`. So `0`.
 *   `prevDpInc = [0, 1]`, `prevDpDec = [1, 0]`
 *
 * Final Sum: `(prevDpInc[0] + prevDpDec[0] + prevDpInc[1] + prevDpDec[1]) % MOD`
 * `(0 + 1 + 1 + 0) % MOD = 2`. Matches Example 1 output.
 *
 * Time Complexity: O(N * D)
 * Space Complexity: O(D)
 */
var zigZagArrays = function (n, l, r) {
  const MOD = 1000000007;
  const D = r - l + 1;
  let prevDpInc = new Array(D).fill(0);
  let prevDpDec = new Array(D).fill(0);

  for (let v_idx = 0; v_idx < D; v_idx++) {
    const currentVal = v_idx + l;
    prevDpInc[v_idx] = currentVal - l;
    prevDpDec[v_idx] = r - currentVal;
  }

  for (let i = 3; i <= n; i++) {
    let currDpInc = new Array(D).fill(0);
    let currDpDec = new Array(D).fill(0);
    let prefixSumIncPrev = new Array(D).fill(0);
    let prefixSumDecPrev = new Array(D).fill(0);

    let currentSumInc = 0;
    let currentSumDec = 0;
    for (let v_idx = 0; v_idx < D; v_idx++) {
      currentSumInc = (currentSumInc + prevDpInc[v_idx]) % MOD;
      currentSumDec = (currentSumDec + prevDpDec[v_idx]) % MOD;
      prefixSumIncPrev[v_idx] = currentSumInc;
      prefixSumDecPrev[v_idx] = currentSumDec;
    }

    for (let v_idx = 0; v_idx < D; v_idx++) {
      if (v_idx > 0) {
        currDpInc[v_idx] = prefixSumDecPrev[v_idx - 1];
      } else {
        currDpInc[v_idx] = 0;
      }

      if (v_idx < D - 1) {
        const totalSumInc = prefixSumIncPrev[D - 1];
        const sumUpToCurrent = prefixSumIncPrev[v_idx];
        currDpDec[v_idx] = (totalSumInc - sumUpToCurrent + MOD) % MOD;
      } else {
        currDpDec[v_idx] = 0;
      }
    }

    prevDpInc = currDpInc;
    prevDpDec = currDpDec;
  }

  let totalCount = 0;
  for (let v_idx = 0; v_idx < D; v_idx++) {
    totalCount = (totalCount + prevDpInc[v_idx]) % MOD;
    totalCount = (totalCount + prevDpDec[v_idx]) % MOD;
  }

  return totalCount;
};
