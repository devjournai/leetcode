/**
 * Course Schedule Iv
 * Time Complexity: O(numCourses^3)
 * Space Complexity: O(numCourses^2)
 */
var checkIfPrerequisite = function (numCourses, prerequisites, queries) {
  const courseCount = numCourses;
  const allPrerequisites = prerequisites;
  const allQueries = queries;

  const prerequisiteMatrix = new Array(courseCount)
    .fill(null)
    .map(() => new Array(courseCount).fill(false));

  allPrerequisites.forEach((coursePair) => {
    const startingCourse = coursePair[0];
    const endingCourse = coursePair[1];
    prerequisiteMatrix[startingCourse][endingCourse] = true;
  });

  let kPointer = 0;
  while (kPointer < courseCount) {
    let iPointer = 0;
    while (iPointer < courseCount) {
      let jPointer = 0;
      while (jPointer < courseCount) {
        if (
          prerequisiteMatrix[iPointer][kPointer] &&
          prerequisiteMatrix[kPointer][jPointer]
        ) {
          prerequisiteMatrix[iPointer][jPointer] = true;
        }
        jPointer++;
      }
      iPointer++;
    }
    kPointer++;
  }

  const queryResults = allQueries.map((currentQuery) => {
    const queryFrom = currentQuery[0];
    const queryTo = currentQuery[1];
    return prerequisiteMatrix[queryFrom][queryTo];
  });

  return queryResults;
};
