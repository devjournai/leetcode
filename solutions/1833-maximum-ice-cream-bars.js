/**
 * Maximum Ice Cream Bars
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maxIceCream = function (costs, coins) {
  costs.sort((firstPrice, secondPrice) => firstPrice - secondPrice);

  let totalBarsBought = 0;
  for (let barIndex = 0; barIndex < costs.length; barIndex++) {
    const currentBarCost = costs[barIndex];

    if (currentBarCost <= coins) {
      totalBarsBought++;
      coins -= currentBarCost;
    } else {
      break;
    }
  }

  return totalBarsBought;
};
