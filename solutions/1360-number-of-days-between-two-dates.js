/**
 * Number Of Days Between Two Dates
 * Time Complexity: O(MaxYearValue)
 * Space Complexity: O(1)
 */
var daysBetweenDates = function (date1String, date2String) {
  const parseDate = (dateStringInput) => {
    const partsArray = dateStringInput.split("-");
    const yearValue = parseInt(partsArray[0], 10);
    const monthValue = parseInt(partsArray[1], 10);
    const dayValue = parseInt(partsArray[2], 10);
    return { yearValue, monthValue, dayValue };
  };

  const isYearLeap = (currentYearNumber) => {
    return (
      (currentYearNumber % 4 === 0 && currentYearNumber % 100 !== 0) ||
      currentYearNumber % 400 === 0
    );
  };

  const getDaysInMonth = (specificMonthNumber, yearForMonthCheck) => {
    const monthDayCounts = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (specificMonthNumber === 2 && isYearLeap(yearForMonthCheck)) {
      return 29;
    }
    return monthDayCounts[specificMonthNumber];
  };

  const calculateTotalDaysFromEpoch = (inputYear, inputMonth, inputDay) => {
    let totalAggregateDays = 0;

    for (
      let currentYearIterator = 1;
      currentYearIterator < inputYear;
      currentYearIterator++
    ) {
      totalAggregateDays += isYearLeap(currentYearIterator) ? 366 : 365;
    }

    for (
      let currentMonthIterator = 1;
      currentMonthIterator < inputMonth;
      currentMonthIterator++
    ) {
      totalAggregateDays += getDaysInMonth(currentMonthIterator, inputYear);
    }

    totalAggregateDays += inputDay;

    return totalAggregateDays;
  };

  const {
    yearValue: yearOne,
    monthValue: monthOne,
    dayValue: dayOne,
  } = parseDate(date1String);
  const {
    yearValue: yearTwo,
    monthValue: monthTwo,
    dayValue: dayTwo,
  } = parseDate(date2String);

  const totalDaysForDateOne = calculateTotalDaysFromEpoch(
    yearOne,
    monthOne,
    dayOne,
  );
  const totalDaysForDateTwo = calculateTotalDaysFromEpoch(
    yearTwo,
    monthTwo,
    dayTwo,
  );

  return Math.abs(totalDaysForDateOne - totalDaysForDateTwo);
};
