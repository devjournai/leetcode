/**
 * Replace Elements With Greatest Element On Right Side
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var replaceElements = function (arr) {
  let greatestElementFound = -1;
  let totalLength = arr.length;

  for (
    let currentPosition = totalLength - 1;
    currentPosition >= 0;
    currentPosition--
  ) {
    let originalValue = arr[currentPosition];
    arr[currentPosition] = greatestElementFound;
    greatestElementFound = Math.max(greatestElementFound, originalValue);
  }

  return arr;
};
