/**
 * Water Bottles
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
