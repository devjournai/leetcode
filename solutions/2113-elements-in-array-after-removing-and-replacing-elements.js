/**
 * Elements In Array After Removing And Replacing Elements
 * Intuition: The array transformation is cyclic. We can determine the state of the array at any given time by calculating its position within a single cycle of removal and replacement.
 * Approach: 1. Calculate the total length of one full cycle (removal + replacement phases). 2. For each query, normalize the `time` to an `effectiveCycleTime` within this full cycle using the modulo operator. 3. If `effectiveCycleTime` falls within the removal phase (first half of the cycle), determine the current array's length and the starting index of the remaining elements from the original array. 4. If `effectiveCycleTime` falls within the replacement phase (second half of the cycle), determine the current array's length which grows from zero. 5. Based on the phase and current array length, check if the `index` is valid and return the corresponding element from the original `nums` array, or -1 if out of bounds.
 * Dry Run:
 * nums = [10, 20, 30], queries = [[1, 0], [4, 1]]
 *
 * numsArrayLength = 3
 * completeCycleLength = 2 * 3 = 6
 * answerList = []
 *
 * Query 1: [queryTime = 1, queryIndex = 0]
 *   effectiveCycleTime = 1 % 6 = 1
 *   effectiveCycleTime (1) < numsArrayLength (3) is TRUE. (Removal phase)
 *   currentArrayElementsCount = numsArrayLength - effectiveCycleTime = 3 - 1 = 2
 *   queryIndex (0) < currentArrayElementsCount (2) is TRUE.
 *   resultValue = nums[effectiveCycleTime + queryIndex] = nums[1 + 0] = nums[1] = 20
 *   answerList = [20]
 *
 * Query 2: [queryTime = 4, queryIndex = 1]
 *   effectiveCycleTime = 4 % 6 = 4
 *   effectiveCycleTime (4) < numsArrayLength (3) is FALSE. (Replacement phase)
 *   restorationProgressTime = effectiveCycleTime - numsArrayLength = 4 - 3 = 1
 *   currentArrayElementsCount = restorationProgressTime = 1
 *   queryIndex (1) < currentArrayElementsCount (1) is FALSE.
 *   resultValue = -1
 *   answerList = [20, -1]
 *
 * Final answerList: [20, -1]
 * Time Complexity: O(Q)
 * Space Complexity: O(Q)
 */
var elementInNums = function (nums, queries) {
  const numsArrayLength = nums.length;
  const completeCycleLength = 2 * numsArrayLength;

  const answerList = queries.map((currentQuery) => {
    const queryTime = currentQuery[0];
    const queryIndex = currentQuery[1];

    const effectiveCycleTime = queryTime % completeCycleLength;

    if (effectiveCycleTime < numsArrayLength) {
      // Removal phase: elements are being removed from the left
      const currentArrayElementsCount = numsArrayLength - effectiveCycleTime;
      if (queryIndex < currentArrayElementsCount) {
        return nums[effectiveCycleTime + queryIndex];
      } else {
        return -1;
      }
    } else {
      // Replacement phase: elements are being added to the right
      const restorationProgressTime = effectiveCycleTime - numsArrayLength;
      const currentArrayElementsCount = restorationProgressTime;
      if (queryIndex < currentArrayElementsCount) {
        return nums[queryIndex];
      } else {
        return -1;
      }
    }
  });

  return answerList;
};
