/**
 * Neighboring Bitwise Xor
 * Intuition: The problem defines a system of equations in GF(2) (the finite field with two elements). Each element `derived[i]` is formed by XORing two adjacent elements from an `original` array, with a wrap-around for the last element. When we XOR all the `derived` values together, a critical property of XOR operations and the problem's structure emerges: every `original[k]` term will appear exactly twice across all these equations. For instance, `original[k]` contributes to `derived[k-1]` (as `original[k-1] ^ original[k]`) and `derived[k]` (as `original[k] ^ original[k+1]`). The cyclic definition for `derived[n-1]` ensures `original[0]` and `original[n-1]` also participate in two equations each. Since `x ^ x = 0`, all `original[k]` terms will cancel out in the overall XOR sum of `derived` elements. Therefore, for a consistent system to exist (i.e., a valid `original` array to be constructible), the total XOR sum of all elements in the `derived` array must be 0. If this condition holds, an `original` array can always be constructed (e.g., by setting `original[0] = 0` and inferring the rest).
 * Approach: 1. Initialize a variable, `xorAccumulator`, to 0. This variable will maintain the running bitwise XOR sum of the elements processed so far in the `derived` array. 2. Iterate through the `derived` array using a standard `for` loop. For each element encountered during iteration: 3. Update `xorAccumulator` by performing a bitwise XOR operation between `xorAccumulator` and the `currentArrayElement`. 4. After the loop completes, all elements of `derived` will have been XORed into `xorAccumulator`. The final step is to check if `xorAccumulator` is equal to 0. 5. Return `true` if `xorAccumulator` is 0, signifying that a binary `original` array can exist; otherwise, return `false`.
 * Dry Run: derived = [0, 1]
 *   Array length is 2.
 *   xorAccumulator = 0
 *   Iteration 1 (currentArrayIndex = 0):
 *     currentArrayElement = derived[0] = 0
 *     xorAccumulator = 0 ^ 0 = 0
 *   Iteration 2 (currentArrayIndex = 1):
 *     currentArrayElement = derived[1] = 1
 *     xorAccumulator = 0 ^ 1 = 1
 *   Loop finishes.
 *   Check if xorAccumulator === 0: 1 === 0 is false.
 *   Return false.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var doesValidArrayExist = function (derived) {
  let xorAccumulator = 0;
  let arrayElementsCount = derived.length;

  for (
    let currentArrayIndex = 0;
    currentArrayIndex < arrayElementsCount;
    currentArrayIndex++
  ) {
    let currentArrayElement = derived[currentArrayIndex];
    xorAccumulator = xorAccumulator ^ currentArrayElement;
  }

  return xorAccumulator === 0;
};
