/**
 * Maximum Number Of Consecutive Values You Can Make
 * Intuition: If you can already form every value in [0, s], a new coin x ≤ s+1 extends the range to [0, s+x]; a larger x leaves a gap. Sort and grow the reachable prefix.
 * Approach: 1. Sort `coins` ascending. 2. `currentMaxConsecutiveSum` is the max formable value. 3. If a coin exceeds that plus one, stop. 4. Else add it. Return sum+1 (count of values 0..sum).
 * Dry Run: coins = [1,3].
 *   - Start 0, take 1 → 1. 3 > 2, stop. Return 2 (values 0,1).
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
