/**
 * Largest Sum Of Averages
 * Intuition: DP `maxScores[i][p]` = best score splitting `nums[i..]` into p groups. First group is a prefix average plus remaining with p-1 groups.
 * Approach: 1. Prefix sums for `getAverage(l,r)`. 2. `maxScores[i][1]` = average of `i..n-1`. 3. For partitions 2..k, for each start, try first-group end and take max of avg + `maxScores[end+1][p-1]`. 4. Return `maxScores[0][k]`.
 * Dry Run: nums = [9,1,2,3,9], k = 3. Best is [9] + [1,2,3] + [9] averages 9+2+9 = 20.
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
      totalLength - 1
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
          firstSubarrayEndIndex
        );
        const remainingProblemScore =
          maxScores[firstSubarrayEndIndex + 1][numPartitions - 1];

        maxScores[segmentStartIndex][numPartitions] = Math.max(
          maxScores[segmentStartIndex][numPartitions],
          currentSubarrayAverage + remainingProblemScore
        );
      }
    }
  }

  return maxScores[0][k];
};
