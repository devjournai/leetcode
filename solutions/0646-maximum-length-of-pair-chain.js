/**
 * Maximum Length Of Pair Chain
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var findLongestChain = function (pairs) {
  pairs.sort((firstPair, secondPair) => firstPair[1] - secondPair[1]);

  let currentMaximumEnd = -Infinity;
  let longestChainCount = 0;

  for (const singlePair of pairs) {
    const pairStartValue = singlePair[0];
    const pairEndValue = singlePair[1];

    if (pairStartValue > currentMaximumEnd) {
      currentMaximumEnd = pairEndValue;
      longestChainCount++;
    }
  }

  return longestChainCount;
};
