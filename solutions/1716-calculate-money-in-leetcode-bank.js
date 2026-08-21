/**
 * Calculate Money In Leetcode Bank
 * Intuition: Week w (0-based) deposits 7w+1 … 7w+7, an arithmetic series. Closed form for full weeks plus a short loop for leftover days.
 * Approach: 1. `completeWeeks = floor(n/7)`; `totalSavingsFromFullWeeks = 7*w*(w+7)/2`. 2. For `remainingDays`, add `completeWeeks+1 + dayOffset`. 3. Return the sum.
 * Dry Run: n = 10
 * 1 full week = 28; leftover Mon–Wed: 2+3+4 = 9; total 37.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var totalMoney = function (n) {
  let completeWeeks = Math.floor(n / 7);
  let totalSavingsFromFullWeeks = 0;
  totalSavingsFromFullWeeks = (7 * completeWeeks * (completeWeeks + 7)) / 2;

  let remainingDays = n % 7;
  let totalSavingsFromPartialWeek = 0;

  let currentMondayValue = completeWeeks + 1;

  for (let dayOffset = 0; dayOffset < remainingDays; dayOffset++) {
    totalSavingsFromPartialWeek += currentMondayValue + dayOffset;
  }

  let overallMoneyAccumulated =
    totalSavingsFromFullWeeks + totalSavingsFromPartialWeek;
  return overallMoneyAccumulated;
};
