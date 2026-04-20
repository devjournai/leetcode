/**
 * Valid Mountain Array
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var validMountainArray = function (arr) {
  const arraySize = arr.length;

  if (arraySize < 3) {
    return false;
  }

  let currentAscentIndex = 0;

  while (
    currentAscentIndex + 1 < arraySize &&
    arr[currentAscentIndex] < arr[currentAscentIndex + 1]
  ) {
    currentAscentIndex++;
  }

  if (currentAscentIndex === 0 || currentAscentIndex === arraySize - 1) {
    return false;
  }

  let currentDescentIndex = currentAscentIndex;

  while (
    currentDescentIndex + 1 < arraySize &&
    arr[currentDescentIndex] > arr[currentDescentIndex + 1]
  ) {
    currentDescentIndex++;
  }

  return currentDescentIndex === arraySize - 1;
};
