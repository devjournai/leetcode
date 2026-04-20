/**
 * Student Attendance Record I
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
