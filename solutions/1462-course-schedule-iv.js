/**
 * Course Schedule Iv
 * Intuition: Reachability among courses is transitive. Floyd-Warshall on a boolean prerequisite matrix answers every query in O(1).
 * Approach: 1. Mark direct edges u->v as true. 2. Triple loop k,i,j: if i reaches k and k reaches j, set i reaches j. 3. Map each query [a,b] to matrix[a][b].
 * Dry Run: numCourses=2, prerequisites=[[1,0]], queries=[[0,1],[1,0]]
 *   - matrix[1][0]=true, Floyd adds nothing else
 *   - [0,1] false, [1,0] true
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
