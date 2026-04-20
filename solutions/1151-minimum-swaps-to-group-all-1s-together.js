/**
 * Minimum Swaps To Group All 1s Together
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minSwaps = function (data) {
  const totalOnesPresent = data.reduce(
    (sumAccumulator, currentValue) => sumAccumulator + currentValue,
    0,
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
