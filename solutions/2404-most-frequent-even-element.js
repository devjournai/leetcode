/**
 * Most Frequent Even Element
 * Intuition: We need to count frequencies of even numbers and identify the one with the highest count, breaking ties by selecting the smallest number. A single pass using a hash map allows us to efficiently track frequencies and update the candidate for the most frequent even element.
 * Approach: 1. Initialize a `Map` (`frequencyTracker`) to store counts of even numbers. 2. Set `highestFrequency` to 0 and `mostFrequentNumber` to -1. 3. Iterate through each `currentValue` in the input array. 4. If `currentValue` is even, update its count in `frequencyTracker`. 5. Retrieve the `updatedFrequency` for `currentValue`. 6. If `updatedFrequency` is greater than `highestFrequency`, update `highestFrequency` to `updatedFrequency` and `mostFrequentNumber` to `currentValue`. 7. If `updatedFrequency` is equal to `highestFrequency`, then if `currentValue` is smaller than `mostFrequentNumber`, update `mostFrequentNumber` to `currentValue` (this handles the tie-breaking rule). 8. After iterating through all numbers, return `mostFrequentNumber`.
 * Dry Run: nums = [0, 1, 2, 2, 4, 4, 1]
 * Initial: frequencyTracker = Map(), highestFrequency = 0, mostFrequentNumber = -1
 * 1. currentValue = 0: (0 % 2 === 0) is true.
 *    frequencyTracker.set(0, 1). updatedFrequency = 1.
 *    (1 > 0) is true. highestFrequency = 1, mostFrequentNumber = 0.
 * 2. currentValue = 1: (1 % 2 === 0) is false. Skip.
 * 3. currentValue = 2: (2 % 2 === 0) is true.
 *    frequencyTracker.set(2, 1). updatedFrequency = 1.
 *    (1 > 1) is false. (1 === 1 && 2 < 0) is false. No change.
 * 4. currentValue = 2: (2 % 2 === 0) is true.
 *    frequencyTracker.set(2, 2). updatedFrequency = 2.
 *    (2 > 1) is true. highestFrequency = 2, mostFrequentNumber = 2.
 * 5. currentValue = 4: (4 % 2 === 0) is true.
 *    frequencyTracker.set(4, 1). updatedFrequency = 1.
 *    (1 > 2) is false. (1 === 2 && 4 < 2) is false. No change.
 * 6. currentValue = 4: (4 % 2 === 0) is true.
 *    frequencyTracker.set(4, 2). updatedFrequency = 2.
 *    (2 > 2) is false. (2 === 2 && 4 < 2) is false. No change.
 * 7. currentValue = 1: (1 % 2 === 0) is false. Skip.
 * End loop. Return mostFrequentNumber = 2.
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */
var mostFrequentEven = function (nums) {
  const frequencyTracker = new Map();
  let highestFrequency = 0;
  let mostFrequentNumber = -1;

  for (const currentValue of nums) {
    if (currentValue % 2 === 0) {
      const updatedFrequency = (frequencyTracker.get(currentValue) || 0) + 1;
      frequencyTracker.set(currentValue, updatedFrequency);

      if (updatedFrequency > highestFrequency) {
        highestFrequency = updatedFrequency;
        mostFrequentNumber = currentValue;
      } else if (updatedFrequency === highestFrequency) {
        if (currentValue < mostFrequentNumber) {
          mostFrequentNumber = currentValue;
        }
      }
    }
  }

  return mostFrequentNumber;
};
