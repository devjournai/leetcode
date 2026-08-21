/**
 * Valid Mountain Array
 * Intuition: A mountain strictly climbs from the left then strictly falls to the end, with the peak not at either end, and length ≥ 3.
 * Approach: 1. Length < 3 → false. 2. Walk while strictly increasing. 3. Peak cannot be index 0 or last. 4. Walk while strictly decreasing. 5. True iff descent reaches the last index.
 * Dry Run: [0,3,2,1] climb to 3, descend to end → true. [3,2,1] peak at 0 → false.
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
