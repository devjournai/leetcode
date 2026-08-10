/**
 * Minimum Number Of Coins To Be Added
 * Intuition: To cover all sums from 1 to `target` with the minimum number of added coins, we use a greedy approach. Maintain `maxSumPossible`, the largest integer such that all sums in `[1, maxSumPossible]` are currently obtainable. If `maxSumPossible` is `k`, and we want to reach `k+1`, we check the next available coin. If the coin is `c` and `c <= k+1`, we can use `c` to extend our obtainable range up to `k+c`. If `c > k+1` (or no more coins are available), there's a gap. To fill this gap and maximize the range extension with one added coin, we must add `k+1`. This new coin extends our obtainable range to `k + (k+1)`. We repeat this until `maxSumPossible` reaches or exceeds `target`.
 * Approach: 1. Sort the input `coins` array in ascending order to enable greedy selection. 2. Initialize `addedCoinsCount` to 0, `maxSumPossible` to 0, and `coinIterator` to 0. 3. Enter a `do-while` loop that continues as long as `maxSumPossible` is less than `target`. 4. Inside the loop, determine the `nextAvailableCoin`. If `coinIterator` is within array bounds, it's `coins[coinIterator]`; otherwise, consider it `Infinity` to signify no more available coins. 5. If `nextAvailableCoin` is less than or equal to `maxSumPossible + 1`, we use this coin to extend our range: add `nextAvailableCoin` to `maxSumPossible` and increment `coinIterator`. 6. Otherwise, we must add a new coin to cover the gap: add `maxSumPossible + 1` to `maxSumPossible` and increment `addedCoinsCount`. 7. After the loop, `addedCoinsCount` holds the minimum number of coins needed.
 * Dry Run: coins = [1, 4, 10], target = 20
 * 1. `coins` sorted: `[1, 4, 10]`. `addedCoinsCount = 0`, `maxSumPossible = 0`, `coinIterator = 0`.
 * 2. Loop (`maxSumPossible < target`): `0 < 20` true.
 *    `nextAvailableCoin = coins[0] = 1`. `1 <= 0 + 1` true.
 *    `maxSumPossible = 0 + 1 = 1`. `coinIterator = 1`.
 * 3. Loop: `1 < 20` true.
 *    `nextAvailableCoin = coins[1] = 4`. `4 <= 1 + 1` (which is 2) false.
 *    `maxSumPossible = 1 + (1 + 1) = 3`. `addedCoinsCount = 1`. (Added coin 2)
 * 4. Loop: `3 < 20` true.
 *    `nextAvailableCoin = coins[1] = 4`. `4 <= 3 + 1` (which is 4) true.
 *    `maxSumPossible = 3 + 4 = 7`. `coinIterator = 2`.
 * 5. Loop: `7 < 20` true.
 *    `nextAvailableCoin = coins[2] = 10`. `10 <= 7 + 1` (which is 8) false.
 *    `maxSumPossible = 7 + (7 + 1) = 15`. `addedCoinsCount = 2`. (Added coin 8)
 * 6. Loop: `15 < 20` true.
 *    `nextAvailableCoin = Infinity` (since `coinIterator` is 3, out of bounds). `Infinity <= 15 + 1` false.
 *    `maxSumPossible = 15 + (15 + 1) = 31`. `addedCoinsCount = 3`. (Added coin 16)
 * 7. Loop: `31 < 20` false. Loop terminates.
 * Return `addedCoinsCount = 3`.
 * Time Complexity: O(N log N + log Target)
 * Space Complexity: O(log N)
 */
var minimumAddedCoins = function (coins, target) {
  coins.sort((aPointer, bPointer) => aPointer - bPointer);

  let addedCoinsCount = 0;
  let maxSumPossible = 0;
  let coinIterator = 0;

  do {
    const nextAvailableCoin =
      coinIterator < coins.length ? coins[coinIterator] : Infinity;

    if (nextAvailableCoin <= maxSumPossible + 1) {
      maxSumPossible += nextAvailableCoin;
      coinIterator++;
    } else {
      maxSumPossible += maxSumPossible + 1;
      addedCoinsCount++;
    }
  } while (maxSumPossible < target);

  return addedCoinsCount;
};
