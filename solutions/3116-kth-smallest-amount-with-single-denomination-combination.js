/**
 * Kth Smallest Amount With Single Denomination Combination
 * Intuition: Every amount is a positive multiple of exactly one coin, so the countable set is the union of arithmetic progressions `coins[i], 2*coins[i], ...`. Inclusion-exclusion on LCMs of coin subsets counts how many distinct amounts are `<= x`. Binary search the smallest `x` with at least `k` such amounts.
 * Approach: 1. For every non-empty subset of coins, store LCM grouped by subset size. 2. Binary search `x` in `[1, k * min(coins)]`. 3. Count(`x`) = sum over odd-sized subsets of `floor(x / lcm)` minus even-sized subsets. 4. Return the lower bound where count >= k.
 * Dry Run:
 * Input: coins = [3,6,9], k = 3
 * 1. Multiples: 3,6,9,12,... Unique: 3,6,9. The 3rd is 9
 * Time Complexity: O(2^n * log(k * min(coins)))
 * Space Complexity: O(2^n)
 */
var findKthSmallest = function (coins, k) {
  const gcd = (valueA, valueB) => {
    let first = valueA;
    let second = valueB;
    while (second !== 0) {
      const remainder = first % second;
      first = second;
      second = remainder;
    }
    return first;
  };

  const lcm = (valueA, valueB) => {
    return (valueA / gcd(valueA, valueB)) * valueB;
  };

  const coinCount = coins.length;
  const lcmsBySubsetSize = Array.from({ length: coinCount + 1 }, () => []);
  const subsetLimit = 1 << coinCount;
  for (let subsetMask = 1; subsetMask < subsetLimit; subsetMask++) {
    let subsetLcm = 1;
    let bitsSet = 0;
    for (let coinIndex = 0; coinIndex < coinCount; coinIndex++) {
      if ((subsetMask >> coinIndex) & 1) {
        subsetLcm = lcm(subsetLcm, coins[coinIndex]);
        bitsSet++;
      }
    }
    lcmsBySubsetSize[bitsSet].push(subsetLcm);
  }

  const countAmountsAtMost = (limit) => {
    let amountCount = 0;
    for (let subsetSize = 1; subsetSize <= coinCount; subsetSize++) {
      const sign = subsetSize % 2 === 1 ? 1 : -1;
      const lcms = lcmsBySubsetSize[subsetSize];
      for (let lcmIndex = 0; lcmIndex < lcms.length; lcmIndex++) {
        amountCount += Math.floor(limit / lcms[lcmIndex]) * sign;
      }
    }
    return amountCount;
  };

  let smallestCoin = coins[0];
  for (let coinIndex = 1; coinIndex < coinCount; coinIndex++) {
    smallestCoin = Math.min(smallestCoin, coins[coinIndex]);
  }

  let searchLow = 1;
  let searchHigh = k * smallestCoin;
  while (searchLow < searchHigh) {
    const searchMid = Math.floor((searchLow + searchHigh) / 2);
    if (countAmountsAtMost(searchMid) >= k) {
      searchHigh = searchMid;
    } else {
      searchLow = searchMid + 1;
    }
  }

  return searchLow;
};
