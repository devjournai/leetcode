/**
 * Replace Elements With Greatest Element On Right Side
 * Intuition: Scan right to left, remembering the max seen so far. Write that max into the cell, then update the max with the original value. The last cell becomes -1.
 * Approach: 1. greatestElementFound = -1. 2. From the end, save originalValue, write greatestElementFound, then max with original. 3. Return arr.
 * Dry Run: arr = [17,18,5,4,6,1]
 *   i=5: write -1, max=1. i=4: write 1, max=6. i=3: write 6, max=6. i=2: 6, max=6. i=1: 6, max=18. i=0: 18. Result [18,6,6,6,1,-1].
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
