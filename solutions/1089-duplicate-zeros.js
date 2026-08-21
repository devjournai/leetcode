/**
 * Duplicate Zeros
 * Intuition: Each zero consumes two slots in the final window. First pass finds how far the original prefix that still fits goes; second pass writes from the right so in-place duplication does not overwrite unread values.
 * Approach: 1. Advance i while a simulated write index stays inside n, doubling on zeros. 2. If the last zero would overflow, write one trailing 0. 3. Copy backward, writing zeros twice.
 * Dry Run: [1,0,2,3,0,4,5,0]. After expansion the first n slots are 1,0,0,2,3,0,0,4.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var duplicateZeros = function (arr) {
  const arraySize = arr.length;
  let sourceScanPointer = 0;
  let targetSimulatedPosition = 0;

  while (sourceScanPointer < arraySize) {
    if (arr[sourceScanPointer] === 0) {
      targetSimulatedPosition += 2;
    } else {
      targetSimulatedPosition += 1;
    }

    if (targetSimulatedPosition >= arraySize) {
      break;
    }
    sourceScanPointer++;
  }

  let actualReadIndex = sourceScanPointer;
  let actualWriteIndex = arraySize - 1;

  if (targetSimulatedPosition > arraySize) {
    arr[actualWriteIndex] = 0;
    actualWriteIndex--;
    actualReadIndex--;
  }

  while (actualReadIndex >= 0 && actualWriteIndex >= 0) {
    if (arr[actualReadIndex] === 0) {
      arr[actualWriteIndex] = 0;
      actualWriteIndex--;
      arr[actualWriteIndex] = 0;
      actualWriteIndex--;
    } else {
      arr[actualWriteIndex] = arr[actualReadIndex];
      actualWriteIndex--;
    }
    actualReadIndex--;
  }
};
