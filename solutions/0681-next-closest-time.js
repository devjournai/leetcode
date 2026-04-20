/**
 * Next Closest Time
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var nextClosestTime = function (time) {
  const initialHour = parseInt(time.substring(0, 2), 10);
  const initialMinute = parseInt(time.substring(3, 5), 10);
  const currentTotalMinutes = initialHour * 60 + initialMinute;

  const availableCharacters = new Set();
  availableCharacters.add(time[0]);
  availableCharacters.add(time[1]);
  availableCharacters.add(time[3]);
  availableCharacters.add(time[4]);

  const sortedUniqueDigits = Array.from(availableCharacters).sort();
  const digitCount = sortedUniqueDigits.length;

  let minimumTimeDifference = Infinity;
  let closestFormattedTime = "";

  const totalCombinations = Math.pow(digitCount, 4);

  let combinationIterator = 0;
  while (combinationIterator < totalCombinations) {
    let temporaryIndex = combinationIterator;

    const minuteUnitIndex = temporaryIndex % digitCount;
    temporaryIndex = Math.floor(temporaryIndex / digitCount);
    const minuteTensIndex = temporaryIndex % digitCount;
    temporaryIndex = Math.floor(temporaryIndex / digitCount);
    const hourUnitIndex = temporaryIndex % digitCount;
    temporaryIndex = Math.floor(temporaryIndex / digitCount);
    const hourTensIndex = temporaryIndex % digitCount;

    const digitForHourTens = sortedUniqueDigits[hourTensIndex];
    const digitForHourUnits = sortedUniqueDigits[hourUnitIndex];
    const digitForMinuteTens = sortedUniqueDigits[minuteTensIndex];
    const digitForMinuteUnits = sortedUniqueDigits[minuteUnitIndex];

    const constructedHour = parseInt(digitForHourTens + digitForHourUnits, 10);
    const constructedMinute = parseInt(
      digitForMinuteTens + digitForMinuteUnits,
      10,
    );

    if (constructedHour < 24 && constructedMinute < 60) {
      const candidateTotalMinutes = constructedHour * 60 + constructedMinute;
      let calculatedDifference = candidateTotalMinutes - currentTotalMinutes;

      if (calculatedDifference <= 0) {
        calculatedDifference += 24 * 60; // Represents time on the next day
      }

      if (calculatedDifference < minimumTimeDifference) {
        minimumTimeDifference = calculatedDifference;
        const formattedHourString = String(constructedHour).padStart(2, "0");
        const formattedMinuteString = String(constructedMinute).padStart(
          2,
          "0",
        );
        closestFormattedTime =
          formattedHourString + ":" + formattedMinuteString;
      }
    }
    combinationIterator++;
  }

  return closestFormattedTime;
};
