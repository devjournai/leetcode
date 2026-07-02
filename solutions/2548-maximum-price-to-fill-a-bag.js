/**
 * Maximum Price To Fill A Bag
 * Intuition: This problem is a classic Fractional Knapsack variant. To maximize the total price when items can be divided, the most effective strategy is to prioritize items that offer the highest price per unit of weight. The additional constraint is that the bag must be filled *exactly* to its given capacity, not just up to it.
 * Approach: 1. Calculate the price-to-weight ratio for every item. This ratio represents the value density. 2. Sort the items in descending order based on their calculated price-to-weight ratios. This ensures that we always consider the most "valuable" items first. 3. Initialize a variable for the total accumulated price and another for the remaining capacity of the bag. 4. Iterate through the sorted items. For each item, determine the maximum weight that can be taken: this is the minimum of the item's total weight and the `currentRemainingCapacity`. Add the proportional price of this taken weight to the `totalAcquiredPrice` and reduce the `currentRemainingCapacity`. 5. If at any point the `currentRemainingCapacity` reaches zero, we can stop processing further items as the bag is full. 6. After the loop completes, check if the `currentRemainingCapacity` is exactly zero. If it is, return the `totalAcquiredPrice`. Otherwise, if `currentRemainingCapacity` is still greater than zero (meaning the bag couldn't be filled entirely), return -1.
 * Dry Run: items = [[10, 2], [20, 5], [15, 3]], capacity = 6
 * 1. Calculate ratios for each item:
 *    - [10, 2] -> 10/2 = 5
 *    - [20, 5] -> 20/5 = 4
 *    - [15, 3] -> 15/3 = 5
 * 2. Sort items by ratio in descending order (tie-breaking is stable or arbitrary): [[10, 2], [15, 3], [20, 5]]
 * 3. Initialize `totalAcquiredPrice = 0`, `currentRemainingCapacity = 6`.
 * 4. Iterate through `sortedItemsByRatio`:
 *    - Item 1: `itemElement = [10, 2]` (`itemElementPrice = 10`, `itemElementWeight = 2`)
 *      - `weightToTake = Math.min(2, 6) = 2`
 *      - `totalAcquiredPrice = 0 + (10 * 2 / 2) = 10`
 *      - `currentRemainingCapacity = 6 - 2 = 4`
 *    - Item 2: `itemElement = [15, 3]` (`itemElementPrice = 15`, `itemElementWeight = 3`)
 *      - `weightToTake = Math.min(3, 4) = 3`
 *      - `totalAcquiredPrice = 10 + (15 * 3 / 3) = 25`
 *      - `currentRemainingCapacity = 4 - 3 = 1`
 *    - Item 3: `itemElement = [20, 5]` (`itemElementPrice = 20`, `itemElementWeight = 5`)
 *      - `weightToTake = Math.min(5, 1) = 1`
 *      - `totalAcquiredPrice = 25 + (20 * 1 / 5) = 29`
 *      - `currentRemainingCapacity = 1 - 1 = 0`
 *      - `currentRemainingCapacity` is 0, so `break` from the loop.
 * 5. Loop ends.
 * 6. Check `currentRemainingCapacity === 0`. It is 0.
 * 7. Return `totalAcquiredPrice = 29`.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maxPrice = function (itemsCollection, bagCapacity) {
  const sortedItemsByRatio = itemsCollection.sort((itemA, itemB) => {
    const ratioB = itemB[0] / itemB[1];
    const ratioA = itemA[0] / itemA[1];
    return ratioB - ratioA;
  });

  let totalAcquiredPrice = 0;
  let currentRemainingCapacity = bagCapacity;

  for (const itemElement of sortedItemsByRatio) {
    const itemElementPrice = itemElement[0];
    const itemElementWeight = itemElement[1];

    const weightToTake = Math.min(itemElementWeight, currentRemainingCapacity);
    totalAcquiredPrice += (itemElementPrice * weightToTake) / itemElementWeight;
    currentRemainingCapacity -= weightToTake;

    if (currentRemainingCapacity === 0) {
      break;
    }
  }

  return currentRemainingCapacity === 0 ? totalAcquiredPrice : -1;
};
