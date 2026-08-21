/**
 * Student Attendance Record I
 * Intuition: A student is rewarded only if absences are fewer than 2 and there is no streak of 3 lates. Scan once, counting A's and consecutive L's (reset L on A or P).
 * Approach: 1. Track `absentCount` and `consecutiveLateCount`. 2. On 'A', increment absences, reset lates; fail if absences >= 2. 3. On 'L', increment lates; fail if >= 3. 4. Else reset lates. 5. Return true if the loop finishes.
 * Dry Run: s = "PPALLP".
 *   - P/P reset lates; A → absent=1; LL → consecutiveLate=2; P resets. Return true.
 *   - "PPALLL" would hit 3 L's and return false.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var checkRecord = function (s) {
  let absentCount = 0;
  let consecutiveLateCount = 0;
  const recordLength = s.length;

  for (
    let currentPosition = 0;
    currentPosition < recordLength;
    currentPosition++
  ) {
    const attendanceChar = s[currentPosition];

    if (attendanceChar === "A") {
      absentCount++;
      consecutiveLateCount = 0;
      if (absentCount >= 2) {
        return false;
      }
    } else if (attendanceChar === "L") {
      consecutiveLateCount++;
      if (consecutiveLateCount >= 3) {
        return false;
      }
    } else {
      consecutiveLateCount = 0;
    }
  }

  return true;
};
