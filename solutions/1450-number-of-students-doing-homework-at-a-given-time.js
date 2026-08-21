/**
 * Number Of Students Doing Homework At A Given Time
 * Intuition: A student is busy if queryTime sits inside [startTime[i], endTime[i]].
 * Approach: 1. Loop every student index. 2. If queryTime is between that student's start and end, increment. 3. Return the count.
 * Dry Run: startTime = [1,2,3], endTime = [3,2,7], queryTime = 4
 *   - student0: 4 not in [1,3]
 *   - student1: 4 not in [2,2]
 *   - student2: 4 in [3,7]. Return 1.
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
