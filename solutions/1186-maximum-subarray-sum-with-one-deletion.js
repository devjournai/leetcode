/**
 * Maximum Subarray Sum With One Deletion
 * Intuition: Kadane can track two endings: a subarray with no deletion, and one that already deleted exactly one element.
 * Approach: 1. Seed no-delete with arr[0]. 2. For each later value, update no-delete as max(value, previousNoDelete+value) and one-delete as max(previousNoDelete, previousOneDelete+value). 3. Track the global max of both.
 * Dry Run: arr = [1,-2,0,3]. After 1: noDel=1. After -2: noDel=-1, oneDel=1. After 0: noDel=0, oneDel=1. After 3: noDel=3, oneDel=4. Answer 4.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maximumSum = function (arr) {
  const inputArray = arr;

  let maxSumNoDeleteCurrent = inputArray[0];
  let maxSumOneDeleteCurrent = 0;
  let overallMaximumSum = inputArray[0];

  let loopIndex = 1;
  while (loopIndex < inputArray.length) {
    const currentElement = inputArray[loopIndex];
    const previousMaxSumNoDeletion = maxSumNoDeleteCurrent;

    maxSumNoDeleteCurrent = Math.max(
      currentElement,
      maxSumNoDeleteCurrent + currentElement
    );
    maxSumOneDeleteCurrent = Math.max(
      previousMaxSumNoDeletion,
      maxSumOneDeleteCurrent + currentElement
    );

    overallMaximumSum = Math.max(
      overallMaximumSum,
      maxSumNoDeleteCurrent,
      maxSumOneDeleteCurrent
    );

    loopIndex++;
  }

  return overallMaximumSum;
};
