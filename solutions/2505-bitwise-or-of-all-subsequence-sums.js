/**
 * Bitwise Or Of All Subsequence Sums
 * Intuition: The bitwise OR of all subsequence sums is effectively a union of all set bits from all possible sums. A bit `k` will be set in the final result if and only if there exists at least one subsequence whose sum has its `k`-th bit set. This problem can be solved by tracking the cumulative "weight" of each bit position, including carries from lower bits. If a bit position `k` has any effective weight (i.e., its count is > 0 after carry propagation), it implies that a sum can be formed where this bit is set.
 * Approach: 1. Initialize an array `bitSignificances` of size 64 with `0n` (BigInt zeros) to store the count of set bits at each position from the input numbers, and later, accumulated carries. 2. Iterate through each `currentNumber` in the input `nums`. For each `currentNumber`, iterate through its bits from `lowBitIndex = 0` to `30` (since max number is 10^9). If the `lowBitIndex`-th bit of `currentNumber` is set, increment `bitSignificances[lowBitIndex]`. 3. Iterate from `propagateIndex = 0` to `62`. In this loop, simulate carries: for each `propagateIndex`, add `bitSignificances[propagateIndex] / 2n` to `bitSignificances[propagateIndex + 1]`. This accounts for pairs of set bits at `propagateIndex` contributing to the `propagateIndex + 1` position. 4. Initialize `finalOrValue` to `0n`. Iterate from `constructIndex = 63` down to `0`. If `bitSignificances[constructIndex]` is greater than `0n`, it means that the `constructIndex`-th bit can be set by some subsequence sum. Set this bit in `finalOrValue` by left-shifting `finalOrValue` by one and then ORing with `1n`. 5. Return the `finalOrValue` converted to a `Number`.
 * Dry Run: nums = [3, 4, 10]
 *   1. Initialize `bitSignificances = [0n, ..., 0n]` (length 64).
 *   2. Populate `bitSignificances` from `nums`:
 *      - `currentNumber = 3` (binary `0011`): `bitSignificances[0]` becomes `1n`, `bitSignificances[1]` becomes `1n`.
 *      - `currentNumber = 4` (binary `0100`): `bitSignificances[2]` becomes `1n`.
 *      - `currentNumber = 10` (binary `1010`): `bitSignificances[1]` becomes `2n` (from `1n + 1n`), `bitSignificances[3]` becomes `1n`.
 *      - After this loop, `bitSignificances` (relevant part): `[1n, 2n, 1n, 1n, 0n, ...]`
 *   3. Propagate carries:
 *      - `propagateIndex = 0`: `bitSignificances[1] += bitSignificances[0] / 2n = 2n + 1n/2n = 2n + 0n = 2n`.
 *      - `propagateIndex = 1`: `bitSignificances[2] += bitSignificances[1] / 2n = 1n + 2n/2n = 1n + 1n = 2n`.
 *      - `propagateIndex = 2`: `bitSignificances[3] += bitSignificances[2] / 2n = 1n + 2n/2n = 1n + 1n = 2n`.
 *      - `propagateIndex = 3`: `bitSignificances[4] += bitSignificances[3] / 2n = 0n + 2n/2n = 0n + 1n = 1n`.
 *      - Subsequent `propagateIndex` values (up to 62) will not change `bitSignificances` as `bitSignificances[propagateIndex]` will be `0n`.
 *      - Final `bitSignificances` (relevant part): `[1n, 2n, 2n, 2n, 1n, 0n, ...]`
 *   4. Construct `finalOrValue`:
 *      - `finalOrValue = 0n`.
 *      - Loop `constructIndex` from `63` down to `0`:
 *        - For `constructIndex` from `63` to `5`, `bitSignificances[constructIndex]` is `0n`. `finalOrValue` remains `0n`.
 *        - `constructIndex = 4`: `bitSignificances[4] = 1n > 0n`. `finalOrValue = (0n << 1n) | 1n = 1n`. (binary `1`)
 *        - `constructIndex = 3`: `bitSignificances[3] = 2n > 0n`. `finalOrValue = (1n << 1n) | 1n = 2n | 1n = 3n`. (binary `11`)
 *        - `constructIndex = 2`: `bitSignificances[2] = 2n > 0n`. `finalOrValue = (3n << 1n) | 1n = 6n | 1n = 7n`. (binary `111`)
 *        - `constructIndex = 1`: `bitSignificances[1] = 2n > 0n`. `finalOrValue = (7n << 1n) | 1n = 14n | 1n = 15n`. (binary `1111`)
 *        - `constructIndex = 0`: `bitSignificances[0] = 1n > 0n`. `finalOrValue = (15n << 1n) | 1n = 30n | 1n = 31n`. (binary `11111`)
 *   5. Return `Number(31) = 31`.
 * Time Complexity: O(N * log(MAX_NUM) + MAX_BITS)
 * Space Complexity: O(MAX_BITS)
 */
var subsequenceSumOr = function (nums) {
  const bitSignificances = new Array(64).fill(0n);

  for (const currentNumber of nums) {
    for (let lowBitIndex = 0; lowBitIndex < 31; lowBitIndex++) {
      if (currentNumber & (1 << lowBitIndex)) {
        bitSignificances[lowBitIndex]++;
      }
    }
  }

  for (let propagateIndex = 0; propagateIndex < 63; propagateIndex++) {
    bitSignificances[propagateIndex + 1] +=
      bitSignificances[propagateIndex] / 2n;
  }

  let finalOrValue = 0n;
  for (let constructIndex = 63; constructIndex >= 0; constructIndex--) {
    finalOrValue =
      (finalOrValue << 1n) | (bitSignificances[constructIndex] > 0n ? 1n : 0n);
  }

  return Number(finalOrValue);
};
