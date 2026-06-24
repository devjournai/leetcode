/**
 * Number of ZigZag Arrays II
 * Intuition: The conditions imply a strict alternating pattern of increasing and decreasing steps. Specifically, if arr[i-2] < arr[i-1], then arr[i-1] > arr[i], and if arr[i-2] > arr[i-1], then arr[i-1] < arr[i]. This property makes the problem suitable for dynamic programming. Since 'n' is very large (up to 10^9), a DP approach using matrix exponentiation is required to compute the result efficiently. The small constraint on 'r' (up to 75) indicates that the state space for the DP should depend on 'r - l + 1', which is small enough for matrix operations.
 * Approach:
 * 1. Define the state: To track the alternating pattern, a state must capture the value of the last element (`arr[i]`) and the direction of the step leading to it from the previous element (`arr[i-1]`). Let `dp[idx][val][dir]` be the number of valid ZigZag arrays of length `idx+1` ending with `val`, where `dir=0` signifies an increasing step (`arr[idx] > arr[idx-1]`) and `dir=1` signifies a decreasing step (`arr[idx] < arr[idx-1]`).
 * 2. Normalize values: For convenience, the given range `[l, r]` is normalized to `[0, k-1]`, where `k = r - l + 1`. All subsequent value references (`val`, `currVal`, `nextVal`) are within this normalized range.
 * 3. State space: There are `k` possible values (`0` to `k-1`) and `2` possible directions (`0` for increasing, `1` for decreasing), leading to `2k` total distinct states. A mapping is used: `index(val, 0) = val` for increasing steps and `index(val, 1) = val + k` for decreasing steps.
 * 4. Build the Transition Matrix `T`: This `2k x 2k` matrix describes how states transition from `dp[idx]` to `dp[idx+1]`.
 *    - To reach `(nextVal, increasing)`: The previous step must have been `(currVal, decreasing)`, and `currVal` must be less than `nextVal` (`X > currVal < nextVal`). Thus, `T[index(currVal, 1)][index(nextVal, 0)] = 1` if `currVal < nextVal`.
 *    - To reach `(nextVal, decreasing)`: The previous step must have been `(currVal, increasing)`, and `currVal` must be greater than `nextVal` (`X < currVal > nextVal`). Thus, `T[index(currVal, 0)][index(nextVal, 1)] = 1` if `currVal > nextVal`.
 *    - The condition `arr[i] != arr[i+1]` is naturally satisfied by `currVal < nextVal` or `currVal > nextVal`.
 * 5. Initialize Base Case Vector `M_initial`: This vector represents the counts for valid sequences of length 2 (`arr[0], arr[1]`). For an element `y` (normalized value):
 *    - `M_initial[index(y, 0)] = y`: This counts sequences like `[x, y]` where `x < y`. There are `y` such values for `x` (from `0` to `y-1`).
 *    - `M_initial[index(y, 1)] = (k - 1 - y)`: This counts sequences like `[x, y]` where `x > y`. There are `k-1-y` such values for `x` (from `y+1` to `k-1`).
 * 6. Matrix Exponentiation: Compute `T^(n-2)` using binary exponentiation (exponentiation by squaring). The exponent is `n-2` because `M_initial` represents sequences of length 2, and `n-2` additional transitions are needed to reach a total length of `n`.
 * 7. Final Calculation: Multiply the `T^(n-2)` matrix with the `M_initial` column vector to obtain the final state vector `finalCounts`. The total number of valid ZigZag arrays is the sum of all elements in `finalCounts`, taken modulo `10^9 + 7`.
 * 8. Handle `n=2` explicitly: For `n=2`, any pair `(v1, v2)` with `v1 != v2` is valid. There are `k * (k-1)` such pairs. This is correctly given by the sum of `M_initial` elements and serves as a base case, avoiding matrix exponentiation for a power of 0.
 * Dry Run:
 *   Example 1: n=3, l=4, r=5
 *     k = 2. Normalized values: 0 (for 4), 1 (for 5). State size = 2*2 = 4.
 *     M_initial: [0 (for (0,inc)), 1 (for (1,inc)), 1 (for (0,dec)), 0 (for (1,dec))].
 *       (e.g., [4,5] maps to (1,inc); [5,4] maps to (0,dec)).
 *     Transition matrix T (4x4):
 *       T[index(0,1)][index(1,0)] = T[2][1] = 1 (transition 5,4 -> 4,5 is not this, it's [...,5,4] -> [...,5,4,5])
 *       T[index(1,0)][index(0,1)] = T[1][2] = 1 (transition 4,5 -> 5,4)
 *       (Corrected interpretation: `fromIdx` is (currVal, prev_step_direction_to_currVal) and `toIdx` is (nextVal, curr_step_direction_to_nextVal)).
 *       So, `T[2][1]=1` represents (curr=0,dec) -> (next=1,inc), e.g., `X>0<1`. (e.g., `[5,4,5]`)
 *       `T[1][2]=1` represents (curr=1,inc) -> (next=0,dec), e.g., `X<1>0`. (e.g., `[4,5,4]`)
 *     Since n=3, exponent is n-2 = 1. `M_final = T * M_initial`.
 *     M_initial = [0, 1, 1, 0]^T
 *     T = [[0, 0, 0, 0], [0, 0, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]]
 *     M_final = [0, (T[1][2]*M_initial[2])=1, (T[2][1]*M_initial[1])=1, 0]^T = [0,1,1,0]^T
 *     Total sum = 0+1+1+0 = 2. (Matches example: [4,5,4], [5,4,5])
 * Time Complexity: O((2k)^3 * log(n))
 * Space Complexity: O((2k)^2)
 */

const MOD = 1000000007;
const MOD_BIG = 1000000007n;

function multiply(A, B, size) {
  const B_T = Array(size);
  for (let j = 0; j < size; j++) {
    B_T[j] = new Int32Array(size);
    for (let k_idx = 0; k_idx < size; k_idx++) {
      B_T[j][k_idx] = B[k_idx][j];
    }
  }

  const C = Array(size);
  for (let i = 0; i < size; i++) {
    C[i] = new Int32Array(size);
    const a_i = A[i];
    for (let j = 0; j < size; j++) {
      const b_t_j = B_T[j];
      let sum = 0n;

      for (let k_idx = 0; k_idx < size; k_idx++) {
        const valA = a_i[k_idx];
        const valB = b_t_j[k_idx];
        if (valA !== 0 && valB !== 0) {
          sum += BigInt(valA) * BigInt(valB);
        }
      }
      C[i][j] = Number(sum % MOD_BIG);
    }
  }
  return C;
}

function matrixPower(A, p, size) {
  let res = Array(size);
  for (let i = 0; i < size; i++) {
    res[i] = new Int32Array(size);
    res[i][i] = 1;
  }

  let currentMatrix = A;
  while (p > 0) {
    if (p % 2 === 1) {
      res = multiply(res, currentMatrix, size);
    }
    currentMatrix = multiply(currentMatrix, currentMatrix, size);
    p = Math.floor(p / 2);
  }
  return res;
}

var zigZagArrays = function (n, l, r) {
  const k = r - l + 1;

  if (k <= 1) return n === 1 ? k : 0;
  if (n === 1) return k % MOD;
  if (n === 2) return Number((BigInt(k) * BigInt(k - 1)) % MOD_BIG);

  const T = Array(k);
  for (let y = 0; y < k; y++) {
    T[y] = new Int32Array(k);
    for (let z = k - y; z < k; z++) {
      T[y][z] = 1;
    }
  }

  const T_pow = matrixPower(T, n - 2, k);

  let total = 0n;
  for (let y = 0; y < k; y++) {
    for (let z = 0; z < k; z++) {
      if (T_pow[y][z] !== 0 && z !== 0) {
        total = (total + BigInt(T_pow[y][z]) * BigInt(z)) % MOD_BIG;
      }
    }
  }
  return Number((total * 2n) % MOD_BIG);
};
