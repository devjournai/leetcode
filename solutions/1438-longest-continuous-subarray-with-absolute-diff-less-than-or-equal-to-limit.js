/**
 * Longest Continuous Subarray With Absolute Diff Less Than Or Equal To Limit
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
