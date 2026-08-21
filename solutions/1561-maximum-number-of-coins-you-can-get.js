/**
 * Maximum Number Of Coins You Can Get
 * Intuition: Always give Alice the largest remaining, you the next, Bob the smallest. Sort and take every second-from-right pile.
 * Approach: 1. Sort ascending. 2. Two pointers: add piles[right-1], left++, right-=2.
 * Dry Run: piles = [2,4,1,2,7,8].
 *   - Sorted 1,2,2,4,7,8; you take 7+4+2=13.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maxCoins = function (piles) {
  piles.sort(
    (firstPileValue, secondPileValue) => firstPileValue - secondPileValue
  );

  let totalMyCoinCount = 0;
  let currentLeftIndex = 0;
  let currentRightIndex = piles.length - 1;

  while (currentLeftIndex < currentRightIndex) {
    totalMyCoinCount += piles[currentRightIndex - 1];

    currentLeftIndex++;
    currentRightIndex -= 2;
  }

  return totalMyCoinCount;
};
