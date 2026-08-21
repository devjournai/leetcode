/**
 * Stone Game VIII
 * Intuition: Prefix sums are the values of taking the first i+1 stones. Optimal play from the right: dp = max(take prefix[i] − opponent’s best).
 * Approach: 1. Build `prefixSums`. 2. Start `currentMaxScoreDiff` = prefix[n-1]. 3. For i from n-2 down to 1, set it to max(itself, prefix[i] − itself). 4. Return that difference (Alice − Bob).
 * Dry Run: stones=[-1,2,-3,4,-5]. Prefix ends at -3; DP yields 5.
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
      currentPrefixSum - currentMaxScoreDiff
    );
  }

  return currentMaxScoreDiff;
};
