/**
 * Longest Mountain In Array
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var longestMountain = function (arr) {
  const arrayLength = arr.length;
  if (arrayLength < 3) {
    return 0;
  }

  let maximumMountainLength = 0;
  let scanPointer = 0;

  while (scanPointer < arrayLength) {
    let ascendEndPointer = scanPointer;

    while (
      ascendEndPointer + 1 < arrayLength &&
      arr[ascendEndPointer] < arr[ascendEndPointer + 1]
    ) {
      ascendEndPointer++;
    }

    let descendEndPointer = ascendEndPointer;

    while (
      descendEndPointer + 1 < arrayLength &&
      arr[descendEndPointer] > arr[descendEndPointer + 1]
    ) {
      descendEndPointer++;
    }

    if (
      ascendEndPointer > scanPointer &&
      descendEndPointer > ascendEndPointer
    ) {
      const currentMountainSpan = descendEndPointer - scanPointer + 1;
      maximumMountainLength = Math.max(
        maximumMountainLength,
        currentMountainSpan,
      );
    }

    scanPointer = Math.max(scanPointer + 1, descendEndPointer);
  }

  return maximumMountainLength;
};
