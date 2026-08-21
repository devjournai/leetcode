/**
 * Number Of Days In A Month
 * Intuition: Month lengths are a fixed calendar table except February, which uses the Gregorian leap rule (divisible by 400, or by 4 but not by 100).
 * Approach: 1. If month is 2, return 29 on leap else 28. 2. Apr/Jun/Sep/Nov → 30. 3. Else 31.
 * Dry Run: year=2019, month=2 → not leap → 28. year=2000, month=2 → 29.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var numberOfDays = function (year, month) {
  let monthDayCount;

  if (month === 2) {
    let isYearDivisibleByFourHundred = year % 400 === 0;
    let isYearDivisibleByFour = year % 4 === 0;
    let isYearDivisibleByOneHundred = year % 100 === 0;

    let isCurrentYearLeap =
      isYearDivisibleByFourHundred ||
      (isYearDivisibleByFour && !isYearDivisibleByOneHundred);

    if (isCurrentYearLeap) {
      monthDayCount = 29;
    } else {
      monthDayCount = 28;
    }
  } else if (month === 4 || month === 6 || month === 9 || month === 11) {
    monthDayCount = 30;
  } else {
    monthDayCount = 31;
  }

  return monthDayCount;
};
