/**
 * Largest Sum Of Averages
 * Time Complexity: O(N^2 * K)
 * Space Complexity: O(N * K)
 */
var largestSumOfAverages = function (nums, k) {
  const totalLength = nums.length;

  const prefixSums = new Array(totalLength + 1).fill(0);
  for (let currentIdx = 0; currentIdx < totalLength; currentIdx++) {
    prefixSums[currentIdx + 1] = prefixSums[currentIdx] + nums[currentIdx];
  }

  const getAverage = (startIdx, endIdx) => {
    return (
      (prefixSums[endIdx + 1] - prefixSums[startIdx]) / (endIdx - startIdx + 1)
    );
  };

  const maxScores = Array(totalLength)
    .fill(0)
    .map(() => Array(k + 1).fill(0));

  for (
    let currentSegmentStart = 0;
    currentSegmentStart < totalLength;
    currentSegmentStart++
  ) {
    maxScores[currentSegmentStart][1] = getAverage(
      currentSegmentStart,
      totalLength - 1,
    );
  }

  for (let numPartitions = 2; numPartitions <= k; numPartitions++) {
    for (
      let segmentStartIndex = 0;
      segmentStartIndex <= totalLength - numPartitions;
      segmentStartIndex++
    ) {
      for (
        let firstSubarrayEndIndex = segmentStartIndex;
        firstSubarrayEndIndex <= totalLength - numPartitions;
        firstSubarrayEndIndex++
      ) {
        const currentSubarrayAverage = getAverage(
          segmentStartIndex,
          firstSubarrayEndIndex,
        );
        const remainingProblemScore =
          maxScores[firstSubarrayEndIndex + 1][numPartitions - 1];

        maxScores[segmentStartIndex][numPartitions] = Math.max(
          maxScores[segmentStartIndex][numPartitions],
          currentSubarrayAverage + remainingProblemScore,
        );
      }
    }
  }

  return maxScores[0][k];
};
