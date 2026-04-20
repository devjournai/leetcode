/**
 * Find K Closest Elements
 * Time Complexity: O(logN + K)
 * Space Complexity: O(K)
 */
var findClosestElements = function (arr, k, x) {
  let initialLeftPosition = 0;
  let initialRightPosition = arr.length - 1;
  let insertionCandidateIndex = 0;

  while (initialLeftPosition <= initialRightPosition) {
    let midSearchIndex = Math.floor(
      initialLeftPosition + (initialRightPosition - initialLeftPosition) / 2,
    );
    if (arr[midSearchIndex] >= x) {
      insertionCandidateIndex = midSearchIndex;
      initialRightPosition = midSearchIndex - 1;
    } else {
      initialLeftPosition = midSearchIndex + 1;
    }
  }

  let leftExpansionPointer = insertionCandidateIndex - 1;
  let rightExpansionPointer = insertionCandidateIndex;
  let currentWindowSize = 0;

  while (currentWindowSize < k) {
    if (leftExpansionPointer < 0) {
      rightExpansionPointer++;
    } else if (rightExpansionPointer >= arr.length) {
      leftExpansionPointer--;
    } else {
      let leftValueDifference = Math.abs(arr[leftExpansionPointer] - x);
      let rightValueDifference = Math.abs(arr[rightExpansionPointer] - x);

      if (leftValueDifference <= rightValueDifference) {
        leftExpansionPointer--;
      } else {
        rightExpansionPointer++;
      }
    }
    currentWindowSize++;
  }

  return arr.slice(leftExpansionPointer + 1, rightExpansionPointer);
};
