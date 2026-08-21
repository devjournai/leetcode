/**
 * Maximum Length Of Pair Chain
 * Intuition: The longest chain is a greedy interval selection: always take the pair that finishes earliest among remaining valid starts.
 * Approach: 1. Sort `pairs` by second element. 2. Track `currentMaximumEnd` (init −∞). 3. If `pairStartValue > currentMaximumEnd`, take it, update end, increment `longestChainCount`.
 * Dry Run: pairs=[[1,2],[2,3],[3,4]].
 *   Sorted by end: [1,2] then [2,3] then [3,4]. Take [1,2] (end=2); skip [2,3]; take [3,4]. Return 2.
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
