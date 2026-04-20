/**
 * Maximum Number Of Consecutive Values You Can Make
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var getMaximumConsecutive = function (coins) {
  let currentMaxConsecutiveSum = 0;

  coins.sort((firstValue, secondValue) => firstValue - secondValue);

  for (
    let currentCoinIndex = 0;
    currentCoinIndex < coins.length;
    ++currentCoinIndex
  ) {
    const coinDenomination = coins[currentCoinIndex];

    if (coinDenomination > currentMaxConsecutiveSum + 1) {
      break;
    }

    currentMaxConsecutiveSum += coinDenomination;
  }

  return currentMaxConsecutiveSum + 1;
};
