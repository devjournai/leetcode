/**
 * Apply Operations On Array To Maximize Sum Of Squares
 * Intuition: The bitwise operations (AND, OR) on two numbers `a` and `b` transform them into `(a AND b)` and `(a OR b)`. A key property of this operation is that the total count of set bits at each individual bit position across the entire array remains invariant, regardless of how many times the operation is applied or on which pairs. This implies we can effectively redistribute all the available set bits among the numbers in the array in any way we choose, as long as the global counts of set bits for each position are preserved. To maximize the sum of squares of `k` selected elements, we should make these `k` elements as large as possible.
 * Approach: 1. Calculate the total frequency of each bit position (from 0 to 29) being set across all numbers in the initial `nums` array. This provides us with a `bitFrequencyTracker` array representing the global pool of '1's for each bit position. 2. Iterate `k` times, as we need to construct `k` numbers. In each iteration, greedily build the largest possible number by assigning available '1's. This is done by iterating from the most significant bit (MSB, bit 29) down to the least significant bit (LSB, bit 0). If `bitFrequencyTracker[currentBitPosition]` is greater than zero, it means a '1' is available for that position; so, we set that bit in our `currentConstructedNumber` and decrement `bitFrequencyTracker[currentBitPosition]`. 3. After constructing each of the `k` numbers, square it. Since the squares can be very large, use `BigInt` for the squaring operation and apply the modulo `10^9 + 7` immediately. Add this result to `resultantSum`, also taking modulo `10^9 + 7`.
 * Dry Run: nums = [2, 6], k = 2, MOD = 1e9 + 7
 * 1. Initialize `moduloValue` = 1000000007, `maximumBitsConstant` = 30.
 * 2. Initialize `bitFrequencyTracker` = `[0, 0, ..., 0]` (30 zeros).
 * 3. Populate `bitFrequencyTracker` from `nums`:
 *    - `currentArrayElement = 2` (binary `010`):
 *        - `bitCheckLoopIndex = 1`: `2 & (1 << 1)` is non-zero. `bitFrequencyTracker[1]` increments to 1.
 *    - `currentArrayElement = 6` (binary `110`):
 *        - `bitCheckLoopIndex = 1`: `6 & (1 << 1)` is non-zero. `bitFrequencyTracker[1]` increments to 2.
 *        - `bitCheckLoopIndex = 2`: `6 & (1 << 2)` is non-zero. `bitFrequencyTracker[2]` increments to 1.
 *    - After processing: `bitFrequencyTracker` = `[0, 2, 1, 0, ..., 0]`.
 * 4. Initialize `resultantSum` = 0.
 * 5. Loop `elementCreationIndex` from 0 to `k-1` (i.e., 0 to 1):
 *    - `elementCreationIndex = 0`:
 *        - `valueToSquare` = 0.
 *        - Loop `bitPositionLoopIndex` from `maximumBitsConstant-1` down to 0 (29 down to 0):
 *            - `bitPositionLoopIndex = 2`: `bitFrequencyTracker[2]` is 1 ( > 0).
 *                - `valueToSquare = 0 | (1 << 2)` = 4.
 *                - `bitFrequencyTracker[2]` decrements to 0. (`bitFrequencyTracker` becomes `[0, 2, 0, ...]`).
 *            - `bitPositionLoopIndex = 1`: `bitFrequencyTracker[1]` is 2 ( > 0).
 *                - `valueToSquare = 4 | (1 << 1)` = 6.
 *                - `bitFrequencyTracker[1]` decrements to 1. (`bitFrequencyTracker` becomes `[0, 1, 0, ...]`).
 *            - Other `bitPositionLoopIndex`s: `bitFrequencyTracker` values are 0 or remain 0.
 *        - `valueToSquare` is 6.
 *        - `squareModulo = Number(BigInt(6) * BigInt(6) % BigInt(moduloValue))` = 36.
 *        - `resultantSum = (0 + 36) % moduloValue` = 36.
 *    - `elementCreationIndex = 1`:
 *        - `valueToSquare` = 0.
 *        - Loop `bitPositionLoopIndex` from `maximumBitsConstant-1` down to 0 (29 down to 0):
 *            - `bitPositionLoopIndex = 2`: `bitFrequencyTracker[2]` is 0. Skip.
 *            - `bitPositionLoopIndex = 1`: `bitFrequencyTracker[1]` is 1 ( > 0).
 *                - `valueToSquare = 0 | (1 << 1)` = 2.
 *                - `bitFrequencyTracker[1]` decrements to 0. (`bitFrequencyTracker` becomes `[0, 0, 0, ...]`).
 *            - Other `bitPositionLoopIndex`s: `bitFrequencyTracker` values are 0.
 *        - `valueToSquare` is 2.
 *        - `squareModulo = Number(BigInt(2) * BigInt(2) % BigInt(moduloValue))` = 4.
 *        - `resultantSum = (36 + 4) % moduloValue` = 40.
 * 6. Return `resultantSum` = 40.
 * Time Complexity: O(N * M + k * M)
 * Space Complexity: O(M)
 */
var maxSum = function (nums, k) {
  const moduloValue = 1e9 + 7;
  const maximumBitsConstant = 30;
  const bitFrequencyTracker = new Array(maximumBitsConstant).fill(0);

  for (const currentArrayElement of nums) {
    for (
      let bitCheckLoopIndex = 0;
      bitCheckLoopIndex < maximumBitsConstant;
      bitCheckLoopIndex++
    ) {
      if (currentArrayElement & (1 << bitCheckLoopIndex)) {
        bitFrequencyTracker[bitCheckLoopIndex]++;
      }
    }
  }

  let resultantSum = 0;
  for (
    let elementCreationIndex = 0;
    elementCreationIndex < k;
    elementCreationIndex++
  ) {
    let valueToSquare = 0;
    for (
      let bitPositionLoopIndex = maximumBitsConstant - 1;
      bitPositionLoopIndex >= 0;
      bitPositionLoopIndex--
    ) {
      if (bitFrequencyTracker[bitPositionLoopIndex] > 0) {
        valueToSquare |= 1 << bitPositionLoopIndex;
        bitFrequencyTracker[bitPositionLoopIndex]--;
      }
    }
    const squareModulo = Number(
      (BigInt(valueToSquare) * BigInt(valueToSquare)) % BigInt(moduloValue)
    );
    resultantSum = (resultantSum + squareModulo) % moduloValue;
  }

  return resultantSum;
};
