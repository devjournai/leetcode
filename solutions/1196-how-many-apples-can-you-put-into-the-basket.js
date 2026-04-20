/**
 * How Many Apples Can You Put Into The Basket
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
