/**
 * Bitwise Ors Of Subarrays
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
      distinctOrs.add(distinctValue),
    );
  }

  return distinctOrs.size;
};
