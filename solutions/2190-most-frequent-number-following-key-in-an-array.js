/**
 * Most Frequent Number Following Key In An Array
 * Intuition: To find the most frequent number immediately following a specific key, we need to iterate through the array, identify each occurrence of the key, and then count the number that appears directly after it. A hash map (or JavaScript Map) is an efficient data structure for tracking and updating the frequency of these 'following' numbers.
 * Approach: 1. Initialize a Map to store the frequency of numbers that immediately follow the 'key'. 2. Initialize variables to keep track of the maximum frequency encountered so far and the corresponding number. 3. Iterate through the input array from the first element up to the second-to-last element. 4. If the current element equals the 'key', identify the next element as a 'potential target'. 5. Increment the count for this 'potential target' in the frequency Map. 6. Compare this updated count with the current maximum frequency; if it's greater, update both the maximum frequency and the result number. 7. After completing the iteration, return the stored result number.
 * Dry Run: nums = [1,100,2,100,1,100], key = 1
 * - frequencyMap = Map {}, currentMaximumCount = 0, bestTarget = 0
 * - loopIndex = 0: nums[0] (currentNumber = 1) equals key.
 *   - nextNumber = nums[1] = 100.
 *   - calculatedCount = (frequencyMap.get(100) || 0) + 1 = 1.
 *   - frequencyMap.set(100, 1).
 *   - calculatedCount (1) > currentMaximumCount (0) is true.
 *     - currentMaximumCount = 1.
 *     - bestTarget = 100.
 * - loopIndex = 1: nums[1] (currentNumber = 100) does not equal key. Skip.
 * - loopIndex = 2: nums[2] (currentNumber = 2) does not equal key. Skip.
 * - loopIndex = 3: nums[3] (currentNumber = 100) does not equal key. Skip.
 * - loopIndex = 4: nums[4] (currentNumber = 1) equals key.
 *   - nextNumber = nums[5] = 100.
 *   - calculatedCount = (frequencyMap.get(100) || 0) + 1 = 2.
 *   - frequencyMap.set(100, 2).
 *   - calculatedCount (2) > currentMaximumCount (1) is true.
 *     - currentMaximumCount = 2.
 *     - bestTarget = 100.
 * - Loop finishes.
 * - Return bestTarget, which is 100.
 * Time Complexity: O(N)
 * Space Complexity: O(U)
 */
var mostFrequent = function (nums, key) {
  const frequencyMap = new Map();
  let currentMaximumCount = 0;
  let bestTarget = 0;

  for (let loopIndex = 0; loopIndex < nums.length - 1; loopIndex++) {
    const currentNumber = nums[loopIndex];
    if (currentNumber === key) {
      const nextNumber = nums[loopIndex + 1];
      const calculatedCount = (frequencyMap.get(nextNumber) || 0) + 1;
      frequencyMap.set(nextNumber, calculatedCount);

      if (calculatedCount > currentMaximumCount) {
        currentMaximumCount = calculatedCount;
        bestTarget = nextNumber;
      }
    }
  }

  return bestTarget;
};
