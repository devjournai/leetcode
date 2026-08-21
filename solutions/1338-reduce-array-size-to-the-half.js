/**
 * Reduce Array Size To The Half
 * Intuition: Removing an integer removes all its occurrences. Greedily drop the most frequent values until at least half the array is gone.
 * Approach: 1. Count frequencies. 2. Sort frequencies descending. 3. Accumulate until ≥ n/2. 4. Return how many distinct values were taken.
 * Dry Run: arr = [3,3,3,3,5,5,5,2,2,7]. Freqs 4,3,2,1; take 4 then 3 → 2 integers.
 * Time Complexity: O(N + U log U)
 * Space Complexity: O(U)
 */
var minSetSize = function (arr) {
  const elementFrequencies = new Map();
  const halfArrayLength = arr.length / 2;

  for (let indexValue = 0; indexValue < arr.length; indexValue++) {
    const currentElement = arr[indexValue];
    elementFrequencies.set(
      currentElement,
      (elementFrequencies.get(currentElement) || 0) + 1
    );
  }

  const frequencyList = Array.from(elementFrequencies.values()).sort(
    (valueA, valueB) => valueB - valueA
  );

  let removedItemsTotal = 0;
  let minimumSetCount = 0;

  for (let freqIndex = 0; freqIndex < frequencyList.length; freqIndex++) {
    const currentFrequencyValue = frequencyList[freqIndex];
    removedItemsTotal += currentFrequencyValue;
    minimumSetCount++;
    if (removedItemsTotal >= halfArrayLength) {
      break;
    }
  }

  return minimumSetCount;
};
