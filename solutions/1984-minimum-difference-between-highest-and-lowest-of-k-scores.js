/**
 * Minimum Difference Between Highest and Lowest of K Scores
 * Intuition: After sorting, any optimal k-subset is a contiguous window (gaps only increase the max-min). Slide a window of length `k` and take the minimum of `windowMax - windowMin`.
 * Approach: 1. Sort `inputNumbers` ascending. 2. For each `windowStartIndex` with a full window of `groupSize`, compute last-minus-first. 3. Track the minimum of those differences and return it.
 * Dry Run: nums = [9,4,1,7], k = 2 → sorted [1,4,7,9].
 *   - windows: 4-1=3, 7-4=3, 9-7=2. Return 2.
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var minimumDifference = function (inputNumbers, groupSize) {
  inputNumbers.sort((valA, valB) => valA - valB);

  let minimumPossibleDifference = Infinity;
  let windowStartIndex = 0;
  const totalCount = inputNumbers.length;

  while (windowStartIndex <= totalCount - groupSize) {
    const windowEndIndex = windowStartIndex + groupSize - 1;
    const highestScoreInWindow = inputNumbers[windowEndIndex];
    const lowestScoreInWindow = inputNumbers[windowStartIndex];
    const currentWindowDifference = highestScoreInWindow - lowestScoreInWindow;
    minimumPossibleDifference = Math.min(
      minimumPossibleDifference,
      currentWindowDifference
    );
    windowStartIndex++;
  }

  return minimumPossibleDifference;
};
