/**
 * Day Of The Week
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var dayOfTheWeek = function (day, month, year) {
  const dayNamesArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let effectiveMonth = month;
  let effectiveYear = year;

  if (month === 1 || month === 2) {
    effectiveMonth = month + 12;
    effectiveYear = year - 1;
  }

  const centuryComponent = Math.floor(effectiveYear / 100);
  const yearInCentury = effectiveYear % 100;

  const termOne = day;
  const termTwo = Math.floor((13 * (effectiveMonth + 1)) / 5);
  const termThree = yearInCentury;
  const termFour = Math.floor(yearInCentury / 4);
  const termFive = Math.floor(centuryComponent / 4);
  const termSix = 2 * centuryComponent;

  const zellerIntermediateResult =
    termOne + termTwo + termThree + termFour + termFive - termSix;
  const zellerModuloResult = zellerIntermediateResult % 7;

  const finalDayIndex = (zellerModuloResult + 6) % 7;

  return dayNamesArray[finalDayIndex];
};
