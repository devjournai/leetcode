/**
 * Permutations II
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
