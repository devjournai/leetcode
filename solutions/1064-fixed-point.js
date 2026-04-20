/**
 * Fixed Point
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var fixedPoint = function (arr) {
  let startIndex = 0;
  let endIndex = arr.length - 1;
  let smallestFixedPoint = -1;

  while (startIndex <= endIndex) {
    const middleIndex = Math.floor((startIndex + endIndex) / 2);

    if (arr[middleIndex] === middleIndex) {
      smallestFixedPoint = middleIndex;
      endIndex = middleIndex - 1;
    } else if (arr[middleIndex] < middleIndex) {
      startIndex = middleIndex + 1;
    } else {
      endIndex = middleIndex - 1;
    }
  }

  return smallestFixedPoint;
};
