/**
 * Duplicate Zeros
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
