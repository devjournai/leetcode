/**
 * Minimum Number Of Removals To Make Mountain Array
 * Intuition: A mountain is LIS-to-the-left of a peak plus LDS-to-the-right. Precompute both, take the longest valid peak (both sides > 1), then removals = n - that length.
 * Approach: 1. left[i] = LIS ending at i (O(n^2)). 2. right[i] = longest decreasing sequence starting at i. 3. For peaks with left>1 and right>1, max mountain = left+right-1. 4. Return n - max.
 * Dry Run: [2,1,1,5,6,2,3,1].
 *   - Peak 6 with sides 2,1,5,6 and 6,2,1 (or 6,3,1) → mountain length 5, removals 3.
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
          leftIncreasingSubsequenceLengths[previousElementIndex] + 1
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
          rightIncreasingSubsequenceLengths[nextElementIndex] + 1
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
          1
      );
    }
  }

  return numElements - maxValidMountainLength;
};
