/**
 * Account Balance After Rounded Purchase
 * Intuition: The core task is to correctly round the purchase amount to the nearest multiple of 10, with 5 rounding up. Once the rounded amount is determined, it is simply subtracted from the initial balance of 100.
 * Approach: 1. Divide the given `purchaseAmount` by 10 to get a decimal representation indicating how many tens are in the amount. 2. Use `Math.round()` to round this decimal to the nearest whole number. This function naturally handles the "5 rounds up" rule. 3. Multiply the rounded whole number by 10 to convert it back to the nearest multiple of 10, which is the `roundedAmount`. 4. Subtract this `roundedAmount` from 100 to get the final account balance.
 * Dry Run: purchaseAmount = 45
 *   1. `amountDividedByTen` = 45 / 10 = 4.5
 *   2. `roundedTens` = Math.round(4.5) = 5
 *   3. `finalPaymentValue` = 5 * 10 = 50
 *   4. `remainingBalance` = 100 - 50 = 50
 *   Result: 50
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var accountBalanceAfterPurchase = function (purchaseAmount) {
  const originalBalance = 100;
  const amountDividedByTen = purchaseAmount / 10;
  const roundedTens = Math.round(amountDividedByTen);
  const finalPaymentValue = roundedTens * 10;
  const remainingBalance = originalBalance - finalPaymentValue;
  return remainingBalance;
};
