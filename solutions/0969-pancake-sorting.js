/**
 * Pancake Sorting
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var pancakeSort = function (arr) {
  const flipOperations = [];
  let currentUnsortedLength = arr.length;

  while (currentUnsortedLength > 1) {
    const targetValue = currentUnsortedLength;
    let foundIndex = -1;
    let searchIterator = 0;
    while (searchIterator < currentUnsortedLength) {
      if (arr[searchIterator] === targetValue) {
        foundIndex = searchIterator;
        break;
      }
      searchIterator++;
    }

    if (foundIndex !== currentUnsortedLength - 1) {
      if (foundIndex !== 0) {
        flipOperations.push(foundIndex + 1);
        reverseSubarray(arr, foundIndex + 1);
      }
      flipOperations.push(currentUnsortedLength);
      reverseSubarray(arr, currentUnsortedLength);
    }
    currentUnsortedLength--;
  }

  return flipOperations;
};

function reverseSubarray(arrayReference, reverseK) {
  let leftBoundary = 0;
  let rightBoundary = reverseK - 1;

  while (leftBoundary < rightBoundary) {
    let tempStorage = arrayReference[leftBoundary];
    arrayReference[leftBoundary] = arrayReference[rightBoundary];
    arrayReference[rightBoundary] = tempStorage;
    leftBoundary++;
    rightBoundary--;
  }
}
