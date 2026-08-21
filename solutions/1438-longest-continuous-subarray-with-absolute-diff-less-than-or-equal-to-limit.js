/**
 * Longest Continuous Subarray With Absolute Diff Less Than Or Equal To Limit
 * Intuition: Maintain a sliding window whose max-min <= limit using two monotonic deques of indices (decreasing max, increasing min). Shrink from the left when the window violates the limit.
 * Approach: 1. Expand rightBoundary. 2. Push into max/min deques, popping stale worse values. 3. While window max - min > limit, drop the left index from deques if needed and increment leftBoundary. 4. Track max window size.
 * Dry Run: nums = [8,2,4,7], limit = 4
 *   - [8]: ok size 1
 *   - [8,2]: 8-2=6>4, shrink to [2] size 1
 *   - [2,4] size 2; [2,4,7] 7-2=5>4 shrink to [4,7] size 2. Return 2.
 * Time Complexity: O(dataSize)
 * Space Complexity: O(dataSize)
 */
var longestSubarray = function (dataArray, limitValue) {
  const maxIndexTracker = [];
  const minIndexTracker = [];
  let maxLengthFound = 0;
  let leftBoundary = 0;

  const dataSize = dataArray.length;

  for (let rightBoundary = 0; rightBoundary < dataSize; rightBoundary++) {
    const currentElementValue = dataArray[rightBoundary];

    while (
      maxIndexTracker.length > 0 &&
      dataArray[maxIndexTracker[maxIndexTracker.length - 1]] <=
        currentElementValue
    ) {
      maxIndexTracker.pop();
    }
    maxIndexTracker.push(rightBoundary);

    while (
      minIndexTracker.length > 0 &&
      dataArray[minIndexTracker[minIndexTracker.length - 1]] >=
        currentElementValue
    ) {
      minIndexTracker.pop();
    }
    minIndexTracker.push(rightBoundary);

    let windowMaximum = dataArray[maxIndexTracker[0]];
    let windowMinimum = dataArray[minIndexTracker[0]];

    while (windowMaximum - windowMinimum > limitValue) {
      let leftBoundCheckMax = maxIndexTracker[0];
      if (leftBoundCheckMax === leftBoundary) {
        maxIndexTracker.shift();
      }

      let leftBoundCheckMin = minIndexTracker[0];
      if (leftBoundCheckMin === leftBoundary) {
        minIndexTracker.shift();
      }

      leftBoundary++;

      windowMaximum = dataArray[maxIndexTracker[0]];
      windowMinimum = dataArray[minIndexTracker[0]];
    }

    let currentWindowSize = rightBoundary - leftBoundary + 1;
    if (currentWindowSize > maxLengthFound) {
      maxLengthFound = currentWindowSize;
    }
  }

  return maxLengthFound;
};
