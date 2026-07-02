/**
 * Minimum Cost To Split An Array
 * Intuition: This problem can be solved using dynamic programming. We define `dp[i]` as the minimum cost to split the prefix `nums[0...i-1]`. To calculate `dp[i]`, we consider all possible split points `j` such that `nums[j...i-1]` is the last subarray. The cost would then be `dp[j]` (cost for the prefix `nums[0...j-1]`) plus the importance value of `nums[j...i-1]`. The importance value depends on the `trimmed` length, which can be efficiently calculated by iterating backwards from `i-1` to `j`, maintaining frequency counts and a counter for elements that appear exactly once.
 * Approach:
 * 1. Initialize `dynamicProgrammingTable` of size `totalSize + 1` with `Infinity`, setting `dynamicProgrammingTable[0] = 0` (cost to split an empty array).
 * 2. Iterate `currentEndPosition` from `1` to `totalSize` (representing the end index `+1` for the current prefix `nums[0...currentEndPosition-1]`).
 * 3. Inside this loop, initialize an `elementOccurrences` map and a `uniqueElementCounter` to `0`. These will track elements and their counts for the current subarray being evaluated.
 * 4. Use a `while` loop for `currentStartPosition`, starting from `currentEndPosition - 1` down to `0` (representing the start index of the last subarray `nums[currentStartPosition...currentEndPosition-1]`).
 * 5. In the inner loop, process `arrayElement = inputArray[currentStartPosition]`:
 *    a. Update its `occurrenceValue` in `elementOccurrences`.
 *    b. If `occurrenceValue` becomes `1`, increment `uniqueElementCounter` (it's now unique).
 *    c. If `occurrenceValue` becomes `2`, decrement `uniqueElementCounter` (it's no longer unique as it appeared twice).
 *    d. Calculate the `currentSubarrayLength = currentEndPosition - currentStartPosition`.
 *    e. The `trimmedLength` for `nums[currentStartPosition...currentEndPosition-1]` is `currentSubarrayLength - uniqueElementCounter`.
 *    f. The `currentSplitCost` is `constantCost + trimmedLength`.
 *    g. Update `dynamicProgrammingTable[currentEndPosition]` with the minimum of its current value and `dynamicProgrammingTable[currentStartPosition] + currentSplitCost`.
 * 6. After the loops complete, `dynamicProgrammingTable[totalSize]` will hold the minimum cost to split the entire `inputArray`.
 * Dry Run: `inputArray = [1,2,1], constantCost = 10`
 * `totalSize = 3`
 * `dynamicProgrammingTable = [0, Infinity, Infinity, Infinity]`
 *
 * `currentEndPosition = 1`: (Processing `nums[0...0] = [1]`)
 *   `elementOccurrences = {}`, `uniqueElementCounter = 0`
 *   `currentStartPosition = 0`: `arrayElement = nums[0] = 1`
 *     `elementOccurrences = {1:1}`, `occurrenceValue = 1`. `uniqueElementCounter = 1`
 *     `currentSubarrayLength = 1 - 0 = 1`. `trimmedLength = 1 - 1 = 0`. `currentSplitCost = 10 + 0 = 10`
 *     `dynamicProgrammingTable[1] = Math.min(Infinity, dynamicProgrammingTable[0] + 10) = 10`
 * `dynamicProgrammingTable = [0, 10, Infinity, Infinity]`
 *
 * `currentEndPosition = 2`: (Processing `nums[0...1] = [1,2]`)
 *   `elementOccurrences = {}`, `uniqueElementCounter = 0`
 *   `currentStartPosition = 1`: `arrayElement = nums[1] = 2`
 *     `elementOccurrences = {2:1}`, `occurrenceValue = 1`. `uniqueElementCounter = 1`
 *     `currentSubarrayLength = 2 - 1 = 1`. `trimmedLength = 1 - 1 = 0`. `currentSplitCost = 10 + 0 = 10`
 *     `dynamicProgrammingTable[2] = Math.min(Infinity, dynamicProgrammingTable[1] + 10) = 20`
 *   `currentStartPosition = 0`: `arrayElement = nums[0] = 1`
 *     `elementOccurrences = {2:1, 1:1}`, `occurrenceValue = 1`. `uniqueElementCounter = 2`
 *     `currentSubarrayLength = 2 - 0 = 2`. `trimmedLength = 2 - 2 = 0`. `currentSplitCost = 10 + 0 = 10`
 *     `dynamicProgrammingTable[2] = Math.min(20, dynamicProgrammingTable[0] + 10) = 10`
 * `dynamicProgrammingTable = [0, 10, 10, Infinity]`
 *
 * `currentEndPosition = 3`: (Processing `nums[0...2] = [1,2,1]`)
 *   `elementOccurrences = {}`, `uniqueElementCounter = 0`
 *   `currentStartPosition = 2`: `arrayElement = nums[2] = 1`
 *     `elementOccurrences = {1:1}`, `occurrenceValue = 1`. `uniqueElementCounter = 1`
 *     `currentSubarrayLength = 3 - 2 = 1`. `trimmedLength = 1 - 1 = 0`. `currentSplitCost = 10 + 0 = 10`
 *     `dynamicProgrammingTable[3] = Math.min(Infinity, dynamicProgrammingTable[2] + 10) = 20`
 *   `currentStartPosition = 1`: `arrayElement = nums[1] = 2`
 *     `elementOccurrences = {1:1, 2:1}`, `occurrenceValue = 1`. `uniqueElementCounter = 2`
 *     `currentSubarrayLength = 3 - 1 = 2`. `trimmedLength = 2 - 2 = 0`. `currentSplitCost = 10 + 0 = 10`
 *     `dynamicProgrammingTable[3] = Math.min(20, dynamicProgrammingTable[1] + 10) = 20`
 *   `currentStartPosition = 0`: `arrayElement = nums[0] = 1`
 *     `elementOccurrences = {1:2, 2:1}`, `occurrenceValue = 2`. `uniqueElementCounter = 1` (1 is no longer unique)
 *     `currentSubarrayLength = 3 - 0 = 3`. `trimmedLength = 3 - 1 = 2`. `currentSplitCost = 10 + 2 = 12`
 *     `dynamicProgrammingTable[3] = Math.min(20, dynamicProgrammingTable[0] + 12) = 12`
 * `dynamicProgrammingTable = [0, 10, 10, 12]`
 *
 * Return `dynamicProgrammingTable[3] = 12`.
 * Time Complexity: O(totalSize^2)
 * Space Complexity: O(totalSize)
 */
var minCost = function (inputArray, constantCost) {
  const totalSize = inputArray.length;
  const dynamicProgrammingTable = new Array(totalSize + 1).fill(Infinity);
  dynamicProgrammingTable[0] = 0;

  for (
    let currentEndPosition = 1;
    currentEndPosition <= totalSize;
    currentEndPosition += 1
  ) {
    const elementOccurrences = new Map();
    let uniqueElementCounter = 0;
    let currentStartPosition = currentEndPosition - 1;

    while (currentStartPosition >= 0) {
      const arrayElement = inputArray[currentStartPosition];
      const occurrenceValue = (elementOccurrences.get(arrayElement) || 0) + 1;
      elementOccurrences.set(arrayElement, occurrenceValue);

      if (occurrenceValue === 1) {
        uniqueElementCounter += 1;
      } else if (occurrenceValue === 2) {
        uniqueElementCounter -= 1;
      }

      const currentSubarrayLength = currentEndPosition - currentStartPosition;
      const trimmedLength = currentSubarrayLength - uniqueElementCounter;
      const currentSplitCost = constantCost + trimmedLength;

      dynamicProgrammingTable[currentEndPosition] = Math.min(
        dynamicProgrammingTable[currentEndPosition],
        dynamicProgrammingTable[currentStartPosition] + currentSplitCost,
      );
      currentStartPosition -= 1;
    }
  }

  return dynamicProgrammingTable[totalSize];
};
