/**
 * Student Attendance Record II
 * Intuition: Valid records of length n have at most one 'A' and no three consecutive 'L's. Six rolling states (0/1 absence × 0/1/2 trailing lates) transition by appending P, L, or A, modulo 1e9+7.
 * Approach: 1. Seed length-0 as one empty record: no A, no L. 2. For each added day: no-A + P comes from all no-A states; no-A + one L from no-A no-L; no-A + two L from no-A one-L. 3. One-A + P from all one-A states plus all no-A states (append A). 4. One-A late chains analogously. 5. Sum the six states after n days.
 * Dry Run: n = 1.
 *   - Start empty. After one day: P (no A no L), L (no A one L), A (one A no L). Sum = 3.
 *   - n = 2 yields 8.
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
