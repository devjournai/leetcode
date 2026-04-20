/**
 * Closest Dessert Cost
 * Time Complexity: O(n * 3^m)
 * Space Complexity: O(m)
 */
var closestCost = function (baseCosts, toppingCosts, target) {
  let bestPossibleCost = Infinity;

  function traverseToppings(toppingIterationIndex, currentIterationCost) {
    const costDifference = Math.abs(currentIterationCost - target);
    const bestDifferenceSoFar = Math.abs(bestPossibleCost - target);

    if (costDifference < bestDifferenceSoFar) {
      bestPossibleCost = currentIterationCost;
    } else if (
      costDifference === bestDifferenceSoFar &&
      currentIterationCost < bestPossibleCost
    ) {
      bestPossibleCost = currentIterationCost;
    }

    if (toppingIterationIndex >= toppingCosts.length) {
      return;
    }

    if (currentIterationCost > target) {
      return;
    }

    const nextToppingIndex = toppingIterationIndex + 1;
    const currentToppingPrice = toppingCosts[toppingIterationIndex];

    traverseToppings(nextToppingIndex, currentIterationCost);

    const costWithOneTopping = currentIterationCost + currentToppingPrice;
    traverseToppings(nextToppingIndex, costWithOneTopping);

    const costWithTwoToppings = currentIterationCost + 2 * currentToppingPrice;
    traverseToppings(nextToppingIndex, costWithTwoToppings);
  }

  for (const singleBaseValue of baseCosts) {
    traverseToppings(0, singleBaseValue);
  }

  return bestPossibleCost;
};
