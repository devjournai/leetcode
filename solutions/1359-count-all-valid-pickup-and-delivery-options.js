/**
 * Count All Valid Pickup And Delivery Options
 * Intuition: Insert order k into a 2(k-1)-slot sequence: k pickup slots then 2k-1 delivery slots after its pickup. Multiply and mod 1e9+7.
 * Approach: 1. Start with 1 way. 2. For k=1..n multiply by k * (2k-1) modulo 10^9+7. 3. Return totalWays.
 * Dry Run: n=2. k=1 → 1; k=2 → 1*2*3=6.
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
