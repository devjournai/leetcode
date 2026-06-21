/**
 * Minimum Money Required Before Transactions
 * Intuition: The problem asks for the minimum initial money to complete all transactions regardless of their order. This suggests an optimal ordering exists, or an invariant property. The key is to cover the cumulative net losses from "bad" transactions (where cost > cashback) while also having enough money to pay the upfront cost of any individual transaction at its peak requirement.
 * Approach: 1. Initialize `accumulatedLossSum` to zero to track the total net money lost from transactions where `cost` exceeds `cashback`. 2. Initialize `peakPaymentThreshold` to zero to track the maximum money potentially required for a single transaction. 3. Iterate through each `[currentCost, currentCashback]` in `transactions`. 4. If `currentCost` is greater than `currentCashback` (a "losing" transaction): add `currentCost - currentCashback` to `accumulatedLossSum`, and update `peakPaymentThreshold` with `Math.max(peakPaymentThreshold, currentCashback)`. The reasoning for `currentCashback` here is that the `currentCost - currentCashback` part is already covered by `accumulatedLossSum`, so the remaining "liquid" amount needed for this specific transaction is `currentCashback`. 5. Else (`currentCost` is less than or equal to `currentCashback`, a "profitable" or "neutral" transaction): update `peakPaymentThreshold` with `Math.max(peakPaymentThreshold, currentCost)`. For these transactions, the full `currentCost` must be available, as they don't contribute to `accumulatedLossSum`. 6. The final minimum money required is `accumulatedLossSum + peakPaymentThreshold`. This sum represents the total "debt" to be covered plus the highest single temporary payment that needs to be made.
 * Dry Run: transactions = [[2,1],[5,0],[4,2]]
 *   1. Initialize `accumulatedLossSum = 0`, `peakPaymentThreshold = 0`.
 *   2. Process `[2,1]`:
 *      - `2 > 1` is true.
 *      - `accumulatedLossSum` becomes `0 + (2 - 1) = 1`.
 *      - `peakPaymentThreshold` becomes `Math.max(0, 1) = 1`.
 *      - State: `accumulatedLossSum = 1`, `peakPaymentThreshold = 1`.
 *   3. Process `[5,0]`:
 *      - `5 > 0` is true.
 *      - `accumulatedLossSum` becomes `1 + (5 - 0) = 6`.
 *      - `peakPaymentThreshold` becomes `Math.max(1, 0) = 1`.
 *      - State: `accumulatedLossSum = 6`, `peakPaymentThreshold = 1`.
 *   4. Process `[4,2]`:
 *      - `4 > 2` is true.
 *      - `accumulatedLossSum` becomes `6 + (4 - 2) = 8`.
 *      - `peakPaymentThreshold` becomes `Math.max(1, 2) = 2`.
 *      - State: `accumulatedLossSum = 8`, `peakPaymentThreshold = 2`.
 *   5. After all transactions, return `accumulatedLossSum + peakPaymentThreshold = 8 + 2 = 10`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumMoney = function (transactions) {
  let accumulatedLossSum = 0;
  let peakPaymentThreshold = 0;

  for (const [currentCost, currentCashback] of transactions) {
    if (currentCost > currentCashback) {
      accumulatedLossSum += currentCost - currentCashback;
      peakPaymentThreshold = Math.max(peakPaymentThreshold, currentCashback);
    } else {
      peakPaymentThreshold = Math.max(peakPaymentThreshold, currentCost);
    }
  }

  return accumulatedLossSum + peakPaymentThreshold;
};
