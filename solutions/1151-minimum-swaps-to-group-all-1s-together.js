/**
 * Minimum Swaps To Group All 1s Together
 * Intuition: All ones must occupy some window of length equal to the total number of ones. Swaps needed equal the zeros in that window, i.e. onesCount minus the max ones already in any such window.
 * Approach: 1. Count total ones; if <=1 return 0. 2. Sliding window of that length, track max window sum. 3. Return onesCount - maxOnesInWindow.
 * Dry Run: data = [1,0,1,0,1].
 *   - 3 ones. Windows of 3: [1,0,1] sum 2, [0,1,0] sum 1, [1,0,1] sum 2. Max 2.
 *   - Swaps 3-2=1.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minSwaps = function (data) {
  const totalOnesPresent = data.reduce(
    (sumAccumulator, currentValue) => sumAccumulator + currentValue,
    0
  );

  if (totalOnesPresent <= 1) {
    return 0;
  }

  const dataLength = data.length;
  let currentWindowSum = 0;

  for (
    let initWindowIdx = 0;
    initWindowIdx < totalOnesPresent;
    initWindowIdx++
  ) {
    currentWindowSum += data[initWindowIdx];
  }

  let maxOnesInAnyWindow = currentWindowSum;

  for (let slideIdx = totalOnesPresent; slideIdx < dataLength; slideIdx++) {
    currentWindowSum =
      currentWindowSum - data[slideIdx - totalOnesPresent] + data[slideIdx];
    maxOnesInAnyWindow = Math.max(maxOnesInAnyWindow, currentWindowSum);
  }

  return totalOnesPresent - maxOnesInAnyWindow;
};
