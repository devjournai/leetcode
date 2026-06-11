/**
 * Replace Elements In An Array
 * Intuition: To efficiently locate elements for replacement, we need a mechanism that provides O(1) average time lookups for values. A hash map (or Map in JavaScript) mapping each number to its current index in the array serves this purpose perfectly.
 * Approach: 1. Initialize a Map to store the current index of each number in `nums`. 2. Populate this Map by iterating through `nums` and storing `(number, index)` pairs. 3. Iterate through each operation `[oldVal, newVal]` in `operations`. For each operation, retrieve the index of `oldVal` from the Map. Update `nums` at this index with `newVal`. Then, update the Map by adding an entry for `newVal` at the same index and removing the entry for `oldVal`. 4. After all operations, return the modified `nums` array.
 * Dry Run:
 * nums = [1,2,4,6], operations = [[1,3],[4,7],[6,1]]
 *
 * 1. Initialize `numberIndexStore = new Map()`
 *
 * 2. Populate `numberIndexStore`:
 *    Loop through `nums`:
 *    - `numberIndexStore.set(1, 0)`
 *    - `numberIndexStore.set(2, 1)`
 *    - `numberIndexStore.set(4, 2)`
 *    - `numberIndexStore.set(6, 3)`
 *    `numberIndexStore` becomes `{1:0, 2:1, 4:2, 6:3}`
 *
 * 3. Process `operations`:
 *
 *    Operation 1: `[1,3]`
 *    - `currentOldValue = 1`, `currentNewValue = 3`
 *    - `positionToModify = numberIndexStore.get(1)` -> `positionToModify = 0`
 *    - `nums[0] = 3` -> `nums` becomes `[3,2,4,6]`
 *    - `numberIndexStore.set(3, 0)`
 *    - `numberIndexStore.delete(1)`
 *    - `numberIndexStore` becomes `{3:0, 2:1, 4:2, 6:3}`
 *
 *    Operation 2: `[4,7]`
 *    - `currentOldValue = 4`, `currentNewValue = 7`
 *    - `positionToModify = numberIndexStore.get(4)` -> `positionToModify = 2`
 *    - `nums[2] = 7` -> `nums` becomes `[3,2,7,6]`
 *    - `numberIndexStore.set(7, 2)`
 *    - `numberIndexStore.delete(4)`
 *    - `numberIndexStore` becomes `{3:0, 2:1, 7:2, 6:3}`
 *
 *    Operation 3: `[6,1]`
 *    - `currentOldValue = 6`, `currentNewValue = 1`
 *    - `positionToModify = numberIndexStore.get(6)` -> `positionToModify = 3`
 *    - `nums[3] = 1` -> `nums` becomes `[3,2,7,1]`
 *    - `numberIndexStore.set(1, 3)`
 *    - `numberIndexStore.delete(6)`
 *    - `numberIndexStore` becomes `{3:0, 2:1, 7:2, 1:3}`
 *
 * 4. Return `nums`: `[3,2,7,1]`
 *
 * Time Complexity: O(N + M)
 * Space Complexity: O(N)
 */
var arrayChange = function (nums, operations) {
  const numberIndexStore = new Map();
  let initialPointer = 0;
  const initialLength = nums.length;

  while (initialPointer < initialLength) {
    numberIndexStore.set(nums[initialPointer], initialPointer);
    initialPointer++;
  }

  let operationCounter = 0;
  const totalOperations = operations.length;

  while (operationCounter < totalOperations) {
    const currentOperation = operations[operationCounter];
    const currentOldValue = currentOperation[0];
    const currentNewValue = currentOperation[1];

    const positionToModify = numberIndexStore.get(currentOldValue);
    nums[positionToModify] = currentNewValue;

    numberIndexStore.set(currentNewValue, positionToModify);
    numberIndexStore.delete(currentOldValue);

    operationCounter++;
  }

  return nums;
};
