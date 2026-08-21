/**
 * Count Good Meals
 * Intuition: A good meal is two items whose deliciousness sums to a power of two. For each value, add counts of (2^p − x) already seen, then record x (unordered pairs, i < j).
 * Approach: 1. For each `currentDeliciousness`, loop `currentPowerOfTwo` from 1 through 2^21; add `valueCounts.get(complement)` into `totalGoodMeals` mod 1e9+7. 2. Increment the map for the current value. 3. Return the total.
 * Dry Run: foodItems = [1,3,5,7,9]
 * 1+3=4, 1+7=8, 3+5=8, 7+9=16 → 4 meals.
 * Time Complexity: O(N * log(MAX_SUM_VALUE))
 * Space Complexity: O(U)
 */
var countGoodMeals = function (foodItems) {
  const moduloValue = 1e9 + 7;
  const valueCounts = new Map();
  let totalGoodMeals = 0;

  const highestPossibleSum = 1 << 21;

  for (let j = 0; j < foodItems.length; ++j) {
    const currentDeliciousness = foodItems[j];

    let currentPowerOfTwo = 1;
    while (currentPowerOfTwo <= highestPossibleSum) {
      const requiredComplement = currentPowerOfTwo - currentDeliciousness;
      if (valueCounts.has(requiredComplement)) {
        totalGoodMeals =
          (totalGoodMeals + valueCounts.get(requiredComplement)) % moduloValue;
      }
      currentPowerOfTwo <<= 1;
    }

    valueCounts.set(
      currentDeliciousness,
      (valueCounts.get(currentDeliciousness) || 0) + 1
    );
  }

  return totalGoodMeals;
};
