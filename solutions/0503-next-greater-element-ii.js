/**
 * Next Greater Element II
 * Intuition: Treat the array as circular by scanning it twice. A monotonic decreasing stack of indices waits for the next strictly larger value, which becomes that index's answer.
 * Approach: 1. Fill `resultContainer` with -1. 2. Loop `iterationCounter` from 0 to `2 * n - 1` with `activeIndex = iterationCounter % n`. 3. While the stack top's value is smaller than `nums[activeIndex]`, pop and write that larger value. 4. Push `activeIndex`.
 * Dry Run: nums = [1, 2, 1].
 *   - Scan 1: 1 waits; 2 resolves index 0 → 2; second 1 waits. Stack holds 1 then 2.
 *   - Wrap: 1 does not beat 2; next 2 resolves last 1 → 2. Result [2, -1, 2].
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var nextGreaterElements = function (nums) {
  const inputLength = nums.length;
  const resultContainer = new Array(inputLength).fill(-1);
  const indicesStorage = [];

  for (
    let iterationCounter = 0;
    iterationCounter < 2 * inputLength;
    iterationCounter++
  ) {
    const activeIndex = iterationCounter % inputLength;
    const currentElementValue = nums[activeIndex];

    while (
      indicesStorage.length > 0 &&
      currentElementValue > nums[indicesStorage[indicesStorage.length - 1]]
    ) {
      const lastPoppedIndex = indicesStorage.pop();
      resultContainer[lastPoppedIndex] = currentElementValue;
    }
    indicesStorage.push(activeIndex);
  }

  return resultContainer;
};
