/**
 * Student Attendance Record II
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var checkRecord = function (n) {
  const MOD = 1e9 + 7;

  let previousNoAbsenceNoLate = 1;
  let previousNoAbsenceOneLate = 0;
  let previousNoAbsenceTwoLate = 0;
  let previousOneAbsenceNoLate = 0;
  let previousOneAbsenceOneLate = 0;
  let previousOneAbsenceTwoLate = 0;

  for (
    let currentLengthTracker = 0;
    currentLengthTracker < n;
    currentLengthTracker++
  ) {
    let currentNoAbsenceNoLate;
    let currentNoAbsenceOneLate;
    let currentNoAbsenceTwoLate;
    let currentOneAbsenceNoLate;
    let currentOneAbsenceOneLate;
    let currentOneAbsenceTwoLate;

    currentNoAbsenceNoLate =
      (previousNoAbsenceNoLate +
        previousNoAbsenceOneLate +
        previousNoAbsenceTwoLate) %
      MOD;
    currentNoAbsenceOneLate = previousNoAbsenceNoLate;
    currentNoAbsenceTwoLate = previousNoAbsenceOneLate;

    const sumFromOneAbsenceAddingPresent =
      (previousOneAbsenceNoLate +
        previousOneAbsenceOneLate +
        previousOneAbsenceTwoLate) %
      MOD;
    const sumFromZeroAbsenceAddingAbsent =
      (previousNoAbsenceNoLate +
        previousNoAbsenceOneLate +
        previousNoAbsenceTwoLate) %
      MOD;
    currentOneAbsenceNoLate =
      (sumFromOneAbsenceAddingPresent + sumFromZeroAbsenceAddingAbsent) % MOD;

    currentOneAbsenceOneLate = previousOneAbsenceNoLate;
    currentOneAbsenceTwoLate = previousOneAbsenceOneLate;

    previousNoAbsenceNoLate = currentNoAbsenceNoLate;
    previousNoAbsenceOneLate = currentNoAbsenceOneLate;
    previousNoAbsenceTwoLate = currentNoAbsenceTwoLate;
    previousOneAbsenceNoLate = currentOneAbsenceNoLate;
    previousOneAbsenceOneLate = currentOneAbsenceOneLate;
    previousOneAbsenceTwoLate = currentOneAbsenceTwoLate;
  }

  const finalCount =
    (previousNoAbsenceNoLate +
      previousNoAbsenceOneLate +
      previousNoAbsenceTwoLate +
      previousOneAbsenceNoLate +
      previousOneAbsenceOneLate +
      previousOneAbsenceTwoLate) %
    MOD;
  return finalCount;
};
