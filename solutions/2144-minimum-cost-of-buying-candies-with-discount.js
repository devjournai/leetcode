/**
 * Minimum Cost Of Buying Candies With Discount
 * Intuition: To minimize the total cost, we should maximize the value of the free candies. The problem states that for every two candies bought, a third candy with cost less than or equal to the minimum of the two bought can be taken for free. By consistently buying the two most expensive available candies, the third most expensive available candy can always be taken for free. This strategy ensures we pay for the highest value candies possible while getting the most expensive permissible candy for free.
 * Approach: 1. Create a copy of the input `cost` array and sort it in descending order. 2. Initialize `totalAccumulatedCost` to zero. 3. Use a `while` loop with an `itemIndex` to iterate through the `sortedCosts` array, processing candies in groups of three. 4. In each iteration, if `itemIndex` is within bounds, add `sortedCosts[itemIndex]` to `totalAccumulatedCost`. 5. Check if a second candy exists at `itemIndex + 1`. If it does, add `sortedCosts[itemIndex + 1]` to `totalAccumulatedCost`. The candy at `itemIndex + 2` is implicitly taken for free. 6. Increment `itemIndex` by 3 to move to the next group. 7. Return `totalAccumulatedCost`.
 * Dry Run: cost = [6, 5, 7, 9, 2, 2]
 *   1. sortedCosts = [9, 7, 6, 5, 2, 2]
 *   2. totalAccumulatedCost = 0
 *   3. itemIndex = 0
 *   4. while (itemIndex < sortedCosts.length) (0 < 6) is true:
 *      - totalAccumulatedCost = 0 + sortedCosts[0] (9) = 9
 *      - secondCandyOffset = 1. (itemIndex + secondCandyOffset) < sortedCosts.length (1 < 6) is true.
 *      - totalAccumulatedCost = 9 + sortedCosts[1] (7) = 16
 *      - itemIndex = 0 + 3 = 3
 *   5. while (itemIndex < sortedCosts.length) (3 < 6) is true:
 *      - totalAccumulatedCost = 16 + sortedCosts[3] (5) = 21
 *      - secondCandyOffset = 1. (itemIndex + secondCandyOffset) < sortedCosts.length (4 < 6) is true.
 *      - totalAccumulatedCost = 21 + sortedCosts[4] (2) = 23
 *      - itemIndex = 3 + 3 = 6
 *   6. while (itemIndex < sortedCosts.length) (6 < 6) is false. Loop terminates.
 *   7. Return totalAccumulatedCost (23).
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minimumCost = function (candiesInputArray) {
  const sortedCosts = [...candiesInputArray].sort(
    (candyPriceA, candyPriceB) => candyPriceB - candyPriceA
  );
  let totalAccumulatedCost = 0;
  let itemIndex = 0;

  while (itemIndex < sortedCosts.length) {
    totalAccumulatedCost += sortedCosts[itemIndex];
    const secondCandyOffset = 1;
    if (itemIndex + secondCandyOffset < sortedCosts.length) {
      totalAccumulatedCost += sortedCosts[itemIndex + secondCandyOffset];
    }
    itemIndex += 3;
  }

  return totalAccumulatedCost;
};
