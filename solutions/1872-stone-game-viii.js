/**
 * Stone Game VIII
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var stoneGameVIII = function (stones) {
  const lenStones = stones.length;
  const prefixSums = new Array(lenStones).fill(0);

  prefixSums[0] = stones[0];
  for (let indexIterator = 1; indexIterator < lenStones; indexIterator++) {
    prefixSums[indexIterator] =
      prefixSums[indexIterator - 1] + stones[indexIterator];
  }

  let currentMaxScoreDiff = prefixSums[lenStones - 1];
  for (let dpIndex = lenStones - 2; dpIndex >= 1; dpIndex--) {
    const currentPrefixSum = prefixSums[dpIndex];
    currentMaxScoreDiff = Math.max(
      currentMaxScoreDiff,
      currentPrefixSum - currentMaxScoreDiff,
    );
  }

  return currentMaxScoreDiff;
};
