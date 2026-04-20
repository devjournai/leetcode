/**
 * Count Good Meals
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
      (valueCounts.get(currentDeliciousness) || 0) + 1,
    );
  }

  return totalGoodMeals;
};
