/**
 * Number Of Students Doing Homework At A Given Time
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var busyStudent = function (startTime, endTime, queryTime) {
  let studentsWorking = 0;
  const numberOfEntries = startTime.length;

  for (
    let currentStudentIndex = 0;
    currentStudentIndex < numberOfEntries;
    currentStudentIndex++
  ) {
    const individualStartTime = startTime[currentStudentIndex];
    const individualEndTime = endTime[currentStudentIndex];

    if (queryTime >= individualStartTime && queryTime <= individualEndTime) {
      studentsWorking++;
    }
  }

  return studentsWorking;
};
