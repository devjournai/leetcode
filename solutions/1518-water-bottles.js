/**
 * Water Bottles
 * Intuition: Drink all full bottles, then recursively exchange empties for new full bottles until fewer than numExchange remain.
 * Approach: 1. Start with numBottles drunk and empty. 2. Recurse: floor(empty/exchange) new drinks plus leftover empties. 3. Sum.
 * Dry Run: numBottles = 9, numExchange = 3.
 *   - 9 + 3 + 1 = 13.
 * Time Complexity: O(numBottles)
 * Space Complexity: O(numBottles)
 */
var numWaterBottles = function (numBottlesGiven, numExchangeRate) {
  let totalDrinksConsumed = numBottlesGiven;
  let currentEmptyContainers = numBottlesGiven;

  function calculateAdditionalDrinks(emptyBottleCount) {
    if (emptyBottleCount < numExchangeRate) {
      return 0;
    }

    let newFullBottlesObtained = Math.floor(emptyBottleCount / numExchangeRate);
    let remainingEmptyFromExchange = emptyBottleCount % numExchangeRate;
    let newEmptyFromDrinking = newFullBottlesObtained;
    let nextRoundEmptyBottles =
      remainingEmptyFromExchange + newEmptyFromDrinking;

    return (
      newFullBottlesObtained + calculateAdditionalDrinks(nextRoundEmptyBottles)
    );
  }

  totalDrinksConsumed += calculateAdditionalDrinks(currentEmptyContainers);

  return totalDrinksConsumed;
};
