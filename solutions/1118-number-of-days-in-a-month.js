/**
 * Number Of Days In A Month
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
