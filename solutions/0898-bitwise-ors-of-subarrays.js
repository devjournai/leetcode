/**
 * Bitwise Ors Of Subarrays
 * Intuition: Subarrays ending at i have ORs equal to `arr[i]` or `(OR of a subarray ending at i-1) | arr[i]`. That set stays small because OR only sets bits, so collect them into a global set of distinct values.
 * Approach: 1. `distinctOrs` global; `previousOrCombinations` for endings at i-1. 2. For each `currentNumber`, start a new set with itself, then OR every previous combination with it. 3. Replace previous with the new set and add all values to `distinctOrs`. 4. Return `distinctOrs.size`.
 * Dry Run: arr = [1, 1, 2].
 *   - End at 1: {1}. End at second 1: {1}. End at 2: {2, 3}. Distinct {1,2,3} size 3.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var subarrayBitwiseORs = function (arr) {
  const distinctOrs = new Set();
  let previousOrCombinations = new Set();

  for (const currentNumber of arr) {
    const currentOrCombinations = new Set([currentNumber]);
    for (const previousCombination of previousOrCombinations) {
      currentOrCombinations.add(previousCombination | currentNumber);
    }
    previousOrCombinations = currentOrCombinations;
    previousOrCombinations.forEach((distinctValue) =>
      distinctOrs.add(distinctValue)
    );
  }

  return distinctOrs.size;
};
