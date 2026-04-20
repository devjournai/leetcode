/**
 * Count All Valid Pickup And Delivery Options
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var countOrders = function (n) {
  const moduloConstant = 10 ** 9 + 7;
  let totalWays = 1;

  for (let currentOrder = 1; currentOrder <= n; currentOrder++) {
    const pickUpOptions = currentOrder;
    const deliveryOptions = 2 * currentOrder - 1;
    totalWays = (totalWays * pickUpOptions * deliveryOptions) % moduloConstant;
  }

  return totalWays;
};
