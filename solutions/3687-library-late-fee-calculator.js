/**
 * Library Late Fee Calculator
 * Intuition: Each book's fee depends only on how late it is, so sum independent piecewise penalties.
 * Approach: 1 day → 1; 2..5 days → 2x; more than 5 → 3x. Sum over daysLate.
 * Dry Run: [5, 1, 7] → 2*5 + 1 + 3*7 = 32.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var lateFee = function (daysLate) {
  let totalFee = 0;
  for (const days of daysLate) {
    if (days === 1) {
      totalFee += 1;
    } else if (days > 5) {
      totalFee += 3 * days;
    } else {
      totalFee += 2 * days;
    }
  }
  return totalFee;
};
