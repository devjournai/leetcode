/**
 * Shortest Subarray To Be Removed To Make Array Sorted
 * Time Complexity: O(arraySize)
 * Space Complexity: O(1)
 */
var findLengthOfShortestSubarray = function (arr) {
  const arraySize = arr.length;

  let prefixRightmostIndex = 0;
  while (
    prefixRightmostIndex < arraySize - 1 &&
    arr[prefixRightmostIndex] <= arr[prefixRightmostIndex + 1]
  ) {
    prefixRightmostIndex++;
  }

  if (prefixRightmostIndex === arraySize - 1) {
    return 0;
  }

  let suffixLeftmostIndex = arraySize - 1;
  while (
    suffixLeftmostIndex > 0 &&
    arr[suffixLeftmostIndex - 1] <= arr[suffixLeftmostIndex]
  ) {
    suffixLeftmostIndex--;
  }

  let resultMinLength = arraySize - prefixRightmostIndex - 1;
  resultMinLength = Math.min(resultMinLength, suffixLeftmostIndex);

  let currentSuffixTraverser = suffixLeftmostIndex;
  for (
    let currentPrefixTraverser = 0;
    currentPrefixTraverser <= prefixRightmostIndex;
    currentPrefixTraverser++
  ) {
    while (
      currentSuffixTraverser < arraySize &&
      arr[currentPrefixTraverser] > arr[currentSuffixTraverser]
    ) {
      currentSuffixTraverser++;
    }
    resultMinLength = Math.min(
      resultMinLength,
      currentSuffixTraverser - currentPrefixTraverser - 1,
    );
  }

  return resultMinLength;
};
