/**
 * Previous Permutation With One Swap
 * Intuition: The previous permutation from one swap is found by the rightmost ascent (A[i]>A[i+1]), then swapping A[i] with the largest value to its right that is still smaller (leftmost of that value).
 * Approach: 1. Copy the array. 2. Scan from the right for the first i with A[i]>A[i+1]; if none, return original. 3. Among j>i with A[j]<A[i], pick the largest A[j] (later equal values overwrite so we keep the rightmost of that max). 4. Swap i and j.
 * Dry Run: arr = [3,2,1].
 *   - Rightmost descent at index 1 (2>1). Only smaller value to the right is 1. Swap -> [3,1,2].
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
