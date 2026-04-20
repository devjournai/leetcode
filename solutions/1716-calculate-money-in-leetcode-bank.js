/**
 * Calculate Money In Leetcode Bank
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
