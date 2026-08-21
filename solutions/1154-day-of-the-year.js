/**
 * Day Of The Year
 * Intuition: Add the day-of-month to the lengths of prior months, using 29 for February on leap years.
 * Approach: 1. Parse YYYY-MM-DD. 2. Leap if divisible by 400, or by 4 but not 100. 3. Sum month lengths before MM plus DD.
 * Dry Run: date = "2019-01-09".
 *   - Not leap, no prior months, day 9. Answer 9.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var dayOfYear = function (dateInput) {
  const parsedDate = dateInput.split("-");
  const yearIdentifier = Number(parsedDate[0]);
  const monthIdentifier = Number(parsedDate[1]);
  const dayIdentifier = Number(parsedDate[2]);

  const isCurrentYearLeap =
    (yearIdentifier % 4 === 0 && yearIdentifier % 100 !== 0) ||
    yearIdentifier % 400 === 0;

  const standardMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (isCurrentYearLeap) {
    standardMonthDays[1] = 29;
  }

  let cumulativeDays = dayIdentifier;
  let monthIter = 0;
  while (monthIter < monthIdentifier - 1) {
    cumulativeDays += standardMonthDays[monthIter];
    monthIter++;
  }

  return cumulativeDays;
};
