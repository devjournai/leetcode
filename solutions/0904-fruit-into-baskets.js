/**
 * Fruit Into Baskets
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
      (fruitBasketMap.get(currentFruitVariety) || 0) + 1,
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
