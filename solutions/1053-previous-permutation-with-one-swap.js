/**
 * Previous Permutation With One Swap
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var prevPermOpt1 = function (arr) {
  const arrayLength = arr.length;
  const temporaryArray = [...arr];

  let firstDecreaseIndex = -1;

  for (
    let currentLookupIndex = arrayLength - 2;
    currentLookupIndex >= 0;
    currentLookupIndex--
  ) {
    if (
      temporaryArray[currentLookupIndex] >
      temporaryArray[currentLookupIndex + 1]
    ) {
      firstDecreaseIndex = currentLookupIndex;
      break;
    }
  }

  if (firstDecreaseIndex === -1) {
    return arr;
  }

  let finalSwapIndex = firstDecreaseIndex + 1;

  for (
    let scanFurtherIndex = firstDecreaseIndex + 1;
    scanFurtherIndex < arrayLength;
    scanFurtherIndex++
  ) {
    if (temporaryArray[scanFurtherIndex] < temporaryArray[firstDecreaseIndex]) {
      if (temporaryArray[scanFurtherIndex] > temporaryArray[finalSwapIndex]) {
        finalSwapIndex = scanFurtherIndex;
      }
    }
  }

  const storedValue = temporaryArray[firstDecreaseIndex];
  temporaryArray[firstDecreaseIndex] = temporaryArray[finalSwapIndex];
  temporaryArray[finalSwapIndex] = storedValue;

  return temporaryArray;
};
