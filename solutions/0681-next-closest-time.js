/**
 * Next Closest Time
 * Intuition: The next valid clock time uses only the digits already in the input. Enumerate every 4-digit combo from those digits, keep valid HH:MM, and pick the smallest forward wrap-around delta from the current minute-of-day.
 * Approach: 1. Parse hours/minutes into `currentTotalMinutes`. 2. Unique sorted digits from positions 0,1,3,4. 3. Loop `digitCount^4` combos via mixed-radix indices. 4. If hour<24 and minute<60, delta = candidate-current, add 24*60 if ≤0. 5. Track min delta and formatted string.
 * Dry Run: time="19:34". Digits {1,9,3,4}. Next valid using those digits is 19:39 (delta 5). Return "19:39".
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
      10
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
          "0"
        );
        closestFormattedTime =
          formattedHourString + ":" + formattedMinuteString;
      }
    }
    combinationIterator++;
  }

  return closestFormattedTime;
};
