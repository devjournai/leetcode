/**
 * Permutations II
 * Intuition: Duplicates create identical permutations unless we skip a repeated value when its previous twin is unused at this depth. Sorting plus a used[] array enforces that.
 * Approach: 1. Sort a copy of nums. 2. Backtrack with a used boolean array. 3. Skip an index if already used, or if it equals the previous value and that previous value is not used (same-depth duplicate). 4. Mark, push, recurse, then unmark and pop.
 * Dry Run: nums = [1, 1, 2] sorted [1, 1, 2].
 *   - Take first 1, then second 1, then 2 → [1, 1, 2]. After popping, skip using the second 1 as the second pick in ways that duplicate.
 *   - Unique results: [1,1,2], [1,2,1], [2,1,1].
 * Time Complexity: O(N * N!)
 * Space Complexity: O(N * N!)
 */
var permuteUnique = function (nums) {
  const orderedNumbers = [...nums].sort((valueA, valueB) => valueA - valueB);

  const finalPermutationsCollection = [];
  const elementUsageTracker = new Array(orderedNumbers.length).fill(false);

  const generatePermutations = (currentCombination) => {
    if (currentCombination.length === orderedNumbers.length) {
      finalPermutationsCollection.push([...currentCombination]);
      return;
    }

    for (
      let currentIndex = 0;
      currentIndex < orderedNumbers.length;
      currentIndex++
    ) {
      if (elementUsageTracker[currentIndex]) {
        continue;
      }

      if (
        currentIndex > 0 &&
        orderedNumbers[currentIndex] === orderedNumbers[currentIndex - 1] &&
        !elementUsageTracker[currentIndex - 1]
      ) {
        continue;
      }

      elementUsageTracker[currentIndex] = true;
      currentCombination.push(orderedNumbers[currentIndex]);

      generatePermutations(currentCombination);

      currentCombination.pop();
      elementUsageTracker[currentIndex] = false;
    }
  };

  generatePermutations([]);

  return finalPermutationsCollection;
};
