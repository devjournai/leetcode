/**
 * Day Of The Year
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
