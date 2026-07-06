/**
 * Convert An Array Into A 2d Array With Conditions
 * Intuition: To minimize the number of rows, we must ensure that each distinct number appears in as many rows as its frequency demands. The maximum frequency of any number in the input array will determine the minimum number of rows required. For instance, if '1' appears three times, it must be placed in three different rows. We can construct these rows iteratively by picking one instance of each available number for the current row until all numbers are placed.
 * Approach: 1. Initialize a `Map` to store the frequency of each number in the input array `nums`. 2. Iterate through `nums` to populate this `itemFrequencies` map. 3. Initialize an empty `finalArrangement` array which will store our 2D result. 4. Enter a `while` loop that continues as long as `itemFrequencies` contains any numbers (i.e., its size is greater than 0). 5. Inside this `while` loop, create a new temporary array `rowBuilder` for the current row. 6. Iterate over the entries (`numberKey`, `occurrenceCount`) of the `itemFrequencies` map. For each entry: a. Add `numberKey` to `rowBuilder`. b. Decrement `occurrenceCount` in `itemFrequencies`. c. If `occurrenceCount` becomes 0, remove `numberKey` from `itemFrequencies` as all its instances have been placed. 7. After iterating through all current entries in `itemFrequencies` for the current row, add `rowBuilder` to `finalArrangement`. 8. Once the `while` loop finishes (meaning `itemFrequencies` is empty), return `finalArrangement`.
 * Dry Run: nums = [1, 3, 4, 1, 2, 3, 1]
 * 1. Initialize itemFrequencies = new Map().
 * 2. Populate itemFrequencies: { 1: 3, 3: 2, 4: 1, 2: 1 }.
 * 3. Initialize finalArrangement = [].
 * 4. While loop (itemFrequencies.size > 0):
 *    - Pass 1:
 *      - rowBuilder = []
 *      - Iterate itemFrequencies:
 *        - (1, 3): rowBuilder.push(1). itemFrequencies.set(1, 2). itemFrequencies is now {1:2, 3:2, 4:1, 2:1}.
 *        - (3, 2): rowBuilder.push(3). itemFrequencies.set(3, 1). itemFrequencies is now {1:2, 3:1, 4:1, 2:1}.
 *        - (4, 1): rowBuilder.push(4). itemFrequencies.delete(4). itemFrequencies is now {1:2, 3:1, 2:1}.
 *        - (2, 1): rowBuilder.push(2). itemFrequencies.delete(2). itemFrequencies is now {1:2, 3:1}.
 *      - finalArrangement.push([1, 3, 4, 2]). finalArrangement = [[1, 3, 4, 2]].
 *    - Pass 2: (itemFrequencies.size is 2 > 0)
 *      - rowBuilder = []
 *      - Iterate itemFrequencies:
 *        - (1, 2): rowBuilder.push(1). itemFrequencies.set(1, 1). itemFrequencies is now {1:1, 3:1}.
 *        - (3, 1): rowBuilder.push(3). itemFrequencies.delete(3). itemFrequencies is now {1:1}.
 *      - finalArrangement.push([1, 3]). finalArrangement = [[1, 3, 4, 2], [1, 3]].
 *    - Pass 3: (itemFrequencies.size is 1 > 0)
 *      - rowBuilder = []
 *      - Iterate itemFrequencies:
 *        - (1, 1): rowBuilder.push(1). itemFrequencies.delete(1). itemFrequencies is now {}.
 *      - finalArrangement.push([1]). finalArrangement = [[1, 3, 4, 2], [1, 3], [1]].
 *    - Pass 4: (itemFrequencies.size is 0). Loop terminates.
 * 5. Return [[1, 3, 4, 2], [1, 3], [1]].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var findMatrix = function (nums) {
  const itemFrequencies = new Map();
  for (const currentNumber of nums) {
    itemFrequencies.set(
      currentNumber,
      (itemFrequencies.get(currentNumber) || 0) + 1,
    );
  }

  const finalArrangement = [];
  while (itemFrequencies.size > 0) {
    const rowBuilder = [];
    for (const [numberKey, occurrenceCount] of itemFrequencies) {
      rowBuilder.push(numberKey);
      if (occurrenceCount === 1) {
        itemFrequencies.delete(numberKey);
      } else {
        itemFrequencies.set(numberKey, occurrenceCount - 1);
      }
    }
    finalArrangement.push(rowBuilder);
  }

  return finalArrangement;
};
