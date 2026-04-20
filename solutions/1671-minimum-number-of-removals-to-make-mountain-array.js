/**
 * Minimum Number Of Removals To Make Mountain Array
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
var minimumMountainRemovals = function (nums) {
  const numElements = nums.length;
  const leftIncreasingSubsequenceLengths = new Array(numElements).fill(1);
  const rightIncreasingSubsequenceLengths = new Array(numElements).fill(1);

  for (
    let currentElementIndex = 1;
    currentElementIndex < numElements;
    currentElementIndex++
  ) {
    for (
      let previousElementIndex = 0;
      previousElementIndex < currentElementIndex;
      previousElementIndex++
    ) {
      if (nums[currentElementIndex] > nums[previousElementIndex]) {
        leftIncreasingSubsequenceLengths[currentElementIndex] = Math.max(
          leftIncreasingSubsequenceLengths[currentElementIndex],
          leftIncreasingSubsequenceLengths[previousElementIndex] + 1,
        );
      }
    }
  }

  for (
    let reverseElementIndex = numElements - 2;
    reverseElementIndex >= 0;
    reverseElementIndex--
  ) {
    for (
      let nextElementIndex = numElements - 1;
      nextElementIndex > reverseElementIndex;
      nextElementIndex--
    ) {
      if (nums[reverseElementIndex] > nums[nextElementIndex]) {
        rightIncreasingSubsequenceLengths[reverseElementIndex] = Math.max(
          rightIncreasingSubsequenceLengths[reverseElementIndex],
          rightIncreasingSubsequenceLengths[nextElementIndex] + 1,
        );
      }
    }
  }

  let maxValidMountainLength = 0;
  for (
    let peakCandidateIndex = 1;
    peakCandidateIndex < numElements - 1;
    peakCandidateIndex++
  ) {
    if (
      leftIncreasingSubsequenceLengths[peakCandidateIndex] > 1 &&
      rightIncreasingSubsequenceLengths[peakCandidateIndex] > 1
    ) {
      maxValidMountainLength = Math.max(
        maxValidMountainLength,
        leftIncreasingSubsequenceLengths[peakCandidateIndex] +
          rightIncreasingSubsequenceLengths[peakCandidateIndex] -
          1,
      );
    }
  }

  return numElements - maxValidMountainLength;
};
