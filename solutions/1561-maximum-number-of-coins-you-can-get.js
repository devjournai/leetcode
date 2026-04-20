/**
 * Maximum Number Of Coins You Can Get
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maxCoins = function (piles) {
  piles.sort(
    (firstPileValue, secondPileValue) => firstPileValue - secondPileValue,
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
