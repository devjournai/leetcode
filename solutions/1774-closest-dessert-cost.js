/**
 * Closest Dessert Cost
 * Intuition: Each topping may be used 0, 1, or 2 times. DFS from every base cost enumerates topping combinations and keeps the cost closest to `target`, preferring the cheaper one on ties.
 * Approach: 1. `traverseToppings` updates `bestPossibleCost` by absolute difference (then by smaller cost). 2. Stop when toppings are exhausted or cost already exceeds target. 3. Recurse with +0, +1, and +2 of the current topping. 4. Try every `singleBaseValue`.
 * Dry Run: baseCosts = [1,7], toppingCosts = [3,4], target = 10.
 *   - Base 7 + one 3 = 10 exactly. Return 10.
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
