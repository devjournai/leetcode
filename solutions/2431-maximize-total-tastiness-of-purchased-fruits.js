/**
 * Maximize Total Tastiness Of Purchased Fruits
 * Intuition: This problem exhibits optimal substructure and overlapping subproblems, characteristic of dynamic programming. For each fruit, we have three choices: not buy it, buy it at full price, or buy it with a coupon. We want to maximize tastiness within given budget and coupon limits, suggesting a recursive approach with memoization.
 * Approach: 1. Define a recursive function `calculateMaxTastiness(fruitIndex, currentBudget, couponsRemaining)` that returns the maximum tastiness from `fruitIndex` onwards. 2. Establish a base case: if `fruitIndex` reaches the end of the fruits array, return 0 as no more fruits can be purchased. 3. Implement memoization using a map to store results for `(fruitIndex, currentBudget, couponsRemaining)` to avoid redundant computations. 4. For each state, calculate three possible options: a) Skip the current fruit. b) Purchase the current fruit at full price if `currentBudget` allows. c) Purchase the current fruit at half price (rounded down) if `currentBudget` allows and `couponsRemaining` is greater than zero. 5. The result for the current state is the maximum tastiness obtained from these three options. 6. The initial call will be `calculateMaxTastiness(0, maxAmount, maxCoupons)`.
 * Dry Run:
 * Input: `price = [10, 20]`, `tastiness = [5, 8]`, `maxAmount = 25`, `maxCoupons = 1`
 * `n = 2`
 * `memoizationCache = new Map()`
 * Call `calculateMaxTastiness(0, 25, 1)`:
 *   `fruitIndex = 0`, `currentBudget = 25`, `couponsRemaining = 1`
 *   Key "0_25_1" not in cache.
 *
 *   1. `optionSkipFruit = calculateMaxTastiness(1, 25, 1)`:
 *     `fruitIndex = 1`, `currentBudget = 25`, `couponsRemaining = 1`
 *     Key "1_25_1" not in cache.
 *
 *     1.1. `nestedOptionSkip = calculateMaxTastiness(2, 25, 1)`:
 *       `fruitIndex = 2` (base case), returns `0`.
 *     `nestedOptionSkip = 0`.
 *
 *     1.2. `fruitPrice = price[1] = 20`, `fruitTastiness = tastiness[1] = 8`
 *     If `20 <= 25`: `nestedOptionFull = 8 + calculateMaxTastiness(2, 25 - 20, 1)`
 *       `calculateMaxTastiness(2, 5, 1)` (base case), returns `0`.
 *     `nestedOptionFull = 8 + 0 = 8`.
 *
 *     1.3. `discountedPrice = Math.floor(20 / 2) = 10`
 *     If `1 > 0` AND `10 <= 25`: `nestedOptionCoupon = 8 + calculateMaxTastiness(2, 25 - 10, 1 - 1)`
 *       `calculateMaxTastiness(2, 15, 0)` (base case), returns `0`.
 *     `nestedOptionCoupon = 8 + 0 = 8`.
 *
 *     `maxValFor1_25_1 = Math.max(0, 8, 8) = 8`.
 *     Cache "1_25_1" -> `8`. Return `8`.
 *   `optionSkipFruit = 8`.
 *
 *   2. `fruitPrice = price[0] = 10`, `fruitTastiness = tastiness[0] = 5`
 *   If `10 <= 25`: `optionBuyFull = 5 + calculateMaxTastiness(1, 25 - 10, 1)`
 *     `calculateMaxTastiness(1, 15, 1)`:
 *       `fruitIndex = 1`, `currentBudget = 15`, `couponsRemaining = 1`
 *       Key "1_15_1" not in cache.
 *       2.1. `nestedOptionSkip2 = calculateMaxTastiness(2, 15, 1)` (base case), returns `0`.
 *       `nestedOptionSkip2 = 0`.
 *       2.2. `fruitPrice = 20`. `20 <= 15` is false.
 *       2.3. `discountedPrice = 10`. `1 > 0` AND `10 <= 15`: `nestedOptionCoupon2 = 8 + calculateMaxTastiness(2, 15 - 10, 1 - 1)`
 *         `calculateMaxTastiness(2, 5, 0)` (base case), returns `0`.
 *       `nestedOptionCoupon2 = 8 + 0 = 8`.
 *       `maxValFor1_15_1 = Math.max(0, 8) = 8`.
 *       Cache "1_15_1" -> `8`. Return `8`.
 *     `optionBuyFull = 5 + 8 = 13`.
 *
 *   3. `discountedPrice = Math.floor(10 / 2) = 5`
 *   If `1 > 0` AND `5 <= 25`: `optionBuyCoupon = 5 + calculateMaxTastiness(1, 25 - 5, 1 - 1)`
 *     `calculateMaxTastiness(1, 20, 0)`:
 *       `fruitIndex = 1`, `currentBudget = 20`, `couponsRemaining = 0`
 *       Key "1_20_0" not in cache.
 *       3.1. `nestedOptionSkip3 = calculateMaxTastiness(2, 20, 0)` (base case), returns `0`.
 *       `nestedOptionSkip3 = 0`.
 *       3.2. `fruitPrice = 20`. `20 <= 20`: `nestedOptionFull3 = 8 + calculateMaxTastiness(2, 20 - 20, 0)`
 *         `calculateMaxMaxTastiness(2, 0, 0)` (base case), returns `0`.
 *       `nestedOptionFull3 = 8 + 0 = 8`.
 *       3.3. `couponsRemaining = 0` is not `> 0`, skip coupon option.
 *       `maxValFor1_20_0 = Math.max(0, 8) = 8`.
 *       Cache "1_20_0" -> `8`. Return `8`.
 *     `optionBuyCoupon = 5 + 8 = 13`.
 *
 *   `finalMaxTastiness = Math.max(8, 13, 13) = 13`.
 *   Cache "0_25_1" -> `13`. Return `13`.
 * Final result: `13`.
 *
 * Time Complexity: O(n * maxAmount * maxCoupons)
 * Space Complexity: O(n * maxAmount * maxCoupons)
 */
var maxTastiness = function (price, tastiness, maxAmount, maxCoupons) {
  const totalFruits = price.length;
  const memoizationCache = new Map();

  function calculateMaxTastiness(fruitIndex, currentBudget, couponsRemaining) {
    if (fruitIndex === totalFruits) {
      return 0;
    }

    const stateKey = `${fruitIndex}_${currentBudget}_${couponsRemaining}`;
    if (memoizationCache.has(stateKey)) {
      return memoizationCache.get(stateKey);
    }

    let currentMaximumValue = calculateMaxTastiness(
      fruitIndex + 1,
      currentBudget,
      couponsRemaining,
    );

    const currentFruitPrice = price[fruitIndex];
    const currentFruitTastiness = tastiness[fruitIndex];

    if (currentFruitPrice <= currentBudget) {
      const valueWithFullPrice =
        currentFruitTastiness +
        calculateMaxTastiness(
          fruitIndex + 1,
          currentBudget - currentFruitPrice,
          couponsRemaining,
        );
      currentMaximumValue = Math.max(currentMaximumValue, valueWithFullPrice);
    }

    if (couponsRemaining > 0) {
      const discountedCost = Math.floor(currentFruitPrice / 2);
      if (discountedCost <= currentBudget) {
        const valueWithDiscount =
          currentFruitTastiness +
          calculateMaxTastiness(
            fruitIndex + 1,
            currentBudget - discountedCost,
            couponsRemaining - 1,
          );
        currentMaximumValue = Math.max(currentMaximumValue, valueWithDiscount);
      }
    }

    memoizationCache.set(stateKey, currentMaximumValue);
    return currentMaximumValue;
  }

  return calculateMaxTastiness(0, maxAmount, maxCoupons);
};
