/**
 * Find The Distinct Difference Array
 * Intuition: The distinct difference for each index `i` requires counting distinct elements in its prefix `nums[0...i]` and its suffix `nums[i+1...n-1]`. An efficient approach would be to track prefix distincts as we iterate forward and dynamically update suffix distincts without recomputing them entirely.
 * Approach: 1. First, iterate through the entire array to populate a frequency map of all elements. This map represents the initial distinct counts for the 'full suffix' (`nums[0...n-1]`). 2. Initialize a variable `currentDistinctSuffixCount` with the size of this frequency map. 3. Initialize an empty set `prefixUniqueElements` to track distinct elements in the current prefix. 4. Iterate from `i = 0` to `n-1`. In each step, add `nums[i]` to `prefixUniqueElements`. Then, decrement the count of `nums[i]` in the frequency map. If its count becomes 0, it means `nums[i]` is no longer present in the *remaining* suffix `nums[i+1...n-1]`, so decrement `currentDistinctSuffixCount`. 5. The difference `prefixUniqueElements.size - currentDistinctSuffixCount` is stored as `diff[i]`.
 * Dry Run: nums = [1, 1, 2, 3]
 *   arrayInputLength = 4
 *   resultantArray = [_, _, _, _]
 *   prefixUniqueElements = {} (Set)
 *   suffixFrequencyMap = {} (Map)
 *
 *   First pass (populate suffixFrequencyMap):
 *     initialElement = 1: suffixFrequencyMap = {1: 1}
 *     initialElement = 1: suffixFrequencyMap = {1: 2}
 *     initialElement = 2: suffixFrequencyMap = {1: 2, 2: 1}
 *     initialElement = 3: suffixFrequencyMap = {1: 2, 2: 1, 3: 1}
 *   currentDistinctSuffixCount = suffixFrequencyMap.size = 3
 *
 *   Second pass (main loop, iterationIndex from 0 to 3):
 *   iterationIndex = 0 (processingNumber = 1):
 *     prefixUniqueElements.add(1) -> {1}. prefixUniqueElements.size = 1.
 *     currentNumberFrequency = suffixFrequencyMap.get(1) = 2.
 *     suffixFrequencyMap.set(1, 1). (count becomes 1, not 0)
 *     currentDistinctSuffixCount remains 3.
 *     resultantArray[0] = 1 - 3 = -2.
 *
 *   iterationIndex = 1 (processingNumber = 1):
 *     prefixUniqueElements.add(1) -> {1}. prefixUniqueElements.size = 1.
 *     currentNumberFrequency = suffixFrequencyMap.get(1) = 1.
 *     suffixFrequencyMap.set(1, 0). (count becomes 0)
 *     suffixFrequencyMap.delete(1). currentDistinctSuffixCount decreases to 2.
 *     resultantArray[1] = 1 - 2 = -1.
 *
 *   iterationIndex = 2 (processingNumber = 2):
 *     prefixUniqueElements.add(2) -> {1, 2}. prefixUniqueElements.size = 2.
 *     currentNumberFrequency = suffixFrequencyMap.get(2) = 1.
 *     suffixFrequencyMap.set(2, 0). (count becomes 0)
 *     suffixFrequencyMap.delete(2). currentDistinctSuffixCount decreases to 1.
 *     resultantArray[2] = 2 - 1 = 1.
 *
 *   iterationIndex = 3 (processingNumber = 3):
 *     prefixUniqueElements.add(3) -> {1, 2, 3}. prefixUniqueElements.size = 3.
 *     currentNumberFrequency = suffixFrequencyMap.get(3) = 1.
 *     suffixFrequencyMap.set(3, 0). (count becomes 0)
 *     suffixFrequencyMap.delete(3). currentDistinctSuffixCount decreases to 0.
 *     resultantArray[3] = 3 - 0 = 3.
 *
 *   Returns [-2, -1, 1, 3].
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var distinctDifferenceArray = function (nums) {
  const arrayInputLength = nums.length;
  const resultantArray = new Array(arrayInputLength);
  const prefixUniqueElements = new Set();
  const suffixFrequencyMap = new Map();

  for (const initialElement of nums) {
    suffixFrequencyMap.set(
      initialElement,
      (suffixFrequencyMap.get(initialElement) || 0) + 1,
    );
  }

  let currentDistinctSuffixCount = suffixFrequencyMap.size;

  for (
    let iterationIndex = 0;
    iterationIndex < arrayInputLength;
    iterationIndex++
  ) {
    const processingNumber = nums[iterationIndex];
    prefixUniqueElements.add(processingNumber);

    const currentNumberFrequency = suffixFrequencyMap.get(processingNumber);
    suffixFrequencyMap.set(processingNumber, currentNumberFrequency - 1);

    if (currentNumberFrequency === 1) {
      suffixFrequencyMap.delete(processingNumber);
      currentDistinctSuffixCount--;
    }

    resultantArray[iterationIndex] =
      prefixUniqueElements.size - currentDistinctSuffixCount;
  }

  return resultantArray;
};
