/**
 * Minimum Operations To Collect Elements
 * Intuition: To find the minimum operations by removing elements from the end, we should process the array in reverse. We need to keep track of the unique elements from 1 to k that we've encountered. Once all k unique elements are found, we have our answer.
 * Approach: 1. Initialize an empty Set to store unique collected numbers within the range [1, k]. 2. Initialize an operation counter to zero. 3. Iterate through the input array from the last element towards the first. 4. In each step, increment the operation counter. 5. If the current element is within the range [1, k], add it to the Set. 6. Check if the Set's size equals k; if so, all required elements have been collected, and the current operation counter is the minimum number of operations.
 * Dry Run: nums = [3,1,2,4,5], k = 3
 * collectedNumbersRecord = new Set(), operationCountResult = 0
 * 1. currentIndexPosition = 4 (nums[4] = 5):
 *    operationCountResult = 1. currentElementValue = 5. Is 5 <= 3? No. collectedNumbersRecord.size (0) === 3? No.
 * 2. currentIndexPosition = 3 (nums[3] = 4):
 *    operationCountResult = 2. currentElementValue = 4. Is 4 <= 3? No. collectedNumbersRecord.size (0) === 3? No.
 * 3. currentIndexPosition = 2 (nums[2] = 2):
 *    operationCountResult = 3. currentElementValue = 2. Is 2 <= 3? Yes. collectedNumbersRecord.add(2). collectedNumbersRecord = {2}.
 *    collectedNumbersRecord.size (1) === 3? No.
 * 4. currentIndexPosition = 1 (nums[1] = 1):
 *    operationCountResult = 4. currentElementValue = 1. Is 1 <= 3? Yes. collectedNumbersRecord.add(1). collectedNumbersRecord = {2, 1}.
 *    collectedNumbersRecord.size (2) === 3? No.
 * 5. currentIndexPosition = 0 (nums[0] = 3):
 *    operationCountResult = 5. currentElementValue = 3. Is 3 <= 3? Yes. collectedNumbersRecord.add(3). collectedNumbersRecord = {2, 1, 3}.
 *    collectedNumbersRecord.size (3) === 3? Yes. Return operationCountResult (5).
 * Time Complexity: O(N)
 * Space Complexity: O(k)
 */
var minOperations = function (nums, k) {
  const collectedNumbersRecord = new Set();
  let operationCountResult = 0;

  for (
    let currentIndexPosition = nums.length - 1;
    currentIndexPosition >= 0;
    currentIndexPosition--
  ) {
    operationCountResult++;
    const currentElementValue = nums[currentIndexPosition];
    if (currentElementValue <= k) {
      collectedNumbersRecord.add(currentElementValue);
    }
    if (collectedNumbersRecord.size === k) {
      return operationCountResult;
    }
  }

  return operationCountResult;
};
