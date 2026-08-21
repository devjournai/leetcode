/**
 * Fruit Into Baskets
 * Intuition: Longest subarray with at most two distinct values. Sliding window: expand `windowEnd`, shrink `windowStart` while the map has more than two types.
 * Approach: 1. `fruitBasketMap` counts types in `[windowStart, windowEnd]`. 2. Add `fruits[windowEnd]`. 3. While size > 2, decrement the start fruit and delete at 0, then `windowStart++`. 4. Track max window length.
 * Dry Run: fruits = [1, 2, 1, 2, 3].
 *   - Window grows to [1,2,1,2] size 2 length 4; adding 3 forces shrink until only two types. Max 4.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var totalFruit = function (fruits) {
  const fruitBasketMap = new Map();
  let maxCollectedFruits = 0;
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < fruits.length; windowEnd++) {
    const currentFruitVariety = fruits[windowEnd];
    fruitBasketMap.set(
      currentFruitVariety,
      (fruitBasketMap.get(currentFruitVariety) || 0) + 1
    );

    while (fruitBasketMap.size > 2) {
      const fruitAtStart = fruits[windowStart];
      const remainingCount = fruitBasketMap.get(fruitAtStart) - 1;
      fruitBasketMap.set(fruitAtStart, remainingCount);

      if (remainingCount === 0) {
        fruitBasketMap.delete(fruitAtStart);
      }
      windowStart++;
    }

    const currentWindowLength = windowEnd - windowStart + 1;
    maxCollectedFruits = Math.max(maxCollectedFruits, currentWindowLength);
  }

  return maxCollectedFruits;
};
