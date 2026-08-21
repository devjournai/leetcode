/**
 * Longest Mountain In Array
 * Intuition: A mountain is a strictly increasing run then a strictly decreasing run (both nonempty). Scan, measure that span, then jump the scan pointer to the descent end.
 * Approach: 1. Length < 3 → 0. 2. From `scanPointer`, walk up then down. 3. If both legs exist, update max with `descendEnd - scan + 1`. 4. `scanPointer = max(scan+1, descendEnd)`.
 * Dry Run: [2,1,4,7,3,2,5]. From 1: 1<4<7 then 7>3>2 → length 5. Rest no mountain. Return 5.
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
        currentMountainSpan
      );
    }

    scanPointer = Math.max(scanPointer + 1, descendEndPointer);
  }

  return maximumMountainLength;
};
