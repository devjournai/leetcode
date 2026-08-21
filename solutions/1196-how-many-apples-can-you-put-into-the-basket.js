/**
 * How Many Apples Can You Put Into The Basket
 * Intuition: A 5000-unit basket holds the most apples if we take the lightest ones first.
 * Approach: 1. Sort weights ascending. 2. Greedily add apples while the running sum stays ≤ 5000. 3. Stop at the first apple that would overflow.
 * Dry Run: weight = [100,200,150,1000,200]. Sorted [100,150,200,200,1000]; all fit except maybe later ones; count 5 if sum≤5000.
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var maxNumberOfApples = function (weight) {
  const basketCapacity = 5000;

  weight.sort((valueA, valueB) => valueA - valueB);

  let currentBasketWeight = 0;
  let takenApplesCount = 0;

  for (let applePosition = 0; applePosition < weight.length; applePosition++) {
    const singleAppleWeight = weight[applePosition];
    if (currentBasketWeight + singleAppleWeight <= basketCapacity) {
      currentBasketWeight += singleAppleWeight;
      takenApplesCount++;
    } else {
      break;
    }
  }

  return takenApplesCount;
};
