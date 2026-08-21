/**
 * Fruits Into Baskets II
 * Intuition: Each fruit must go into the leftmost unused basket whose capacity is at least the fruit's quantity. Scanning baskets left to right for every fruit matches that greedy rule.
 * Approach: 1. Mark every basket unused. 2. For each fruit, walk baskets from index 0 and place it in the first unused basket with capacity >= fruit. 3. If no basket works, count it as unplaced. 4. Return the unplaced count.
 * Dry Run: fruits = [4,2,5], baskets = [3,5,4].
 *   - 4 → leftmost fit is basket 1 (5); used.
 *   - 2 → leftmost fit is basket 0 (3); used.
 *   - 5 → no remaining basket is large enough → 1 unplaced.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var numOfUnplacedFruits = function (fruits, baskets) {
  const basketUsed = new Array(baskets.length).fill(false);
  let unplacedFruitCount = 0;

  for (const fruitQuantity of fruits) {
    let fruitPlaced = false;

    for (let basketIndex = 0; basketIndex < baskets.length; basketIndex++) {
      if (!basketUsed[basketIndex] && baskets[basketIndex] >= fruitQuantity) {
        basketUsed[basketIndex] = true;
        fruitPlaced = true;
        break;
      }
    }

    if (!fruitPlaced) {
      unplacedFruitCount++;
    }
  }

  return unplacedFruitCount;
};
