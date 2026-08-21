/**
 * Parallel Courses
 * Intuition: Relations form a DAG of prerequisites. Each semester take every course with indegree 0 (Kahn BFS by layers). Cycles make some courses unreachable.
 * Approach: 1. Build adjacency and indegrees. 2. Queue all indegree-0 courses. 3. Each queue layer is one semester; decrement neighbors and enqueue when indegree hits 0. 4. Return semester count if all n courses were taken, else -1.
 * Dry Run: n = 3, relations = [[1,3],[2,3]].
 *   - Semester 1: take 1 and 2. Semester 2: take 3. Answer 2.
 * Time Complexity: O(N + M)
 * Space Complexity: O(N + M)
 */
var minimumSemesters = function (numberOfCourses, courseRelations) {
  const courseGraph = new Map();
  const indegreeArray = new Array(numberOfCourses + 1).fill(0);

  for (let courseIdx = 1; courseIdx <= numberOfCourses; courseIdx++) {
    courseGraph.set(courseIdx, []);
  }

  for (const relationEntry of courseRelations) {
    const prerequisiteCourse = relationEntry[0];
    const nextDependentCourse = relationEntry[1];
    courseGraph.get(prerequisiteCourse).push(nextDependentCourse);
    indegreeArray[nextDependentCourse]++;
  }

  const initialQueue = [];
  for (
    let queueCourseIdx = 1;
    queueCourseIdx <= numberOfCourses;
    queueCourseIdx++
  ) {
    if (indegreeArray[queueCourseIdx] === 0) {
      initialQueue.push(queueCourseIdx);
    }
  }

  let currentSemesters = 0;
  let coursesTakenCount = 0;

  while (initialQueue.length > 0) {
    const levelSize = initialQueue.length;
    currentSemesters++;

    for (let levelIterator = 0; levelIterator < levelSize; levelIterator++) {
      const currentProcessingCourse = initialQueue.shift();
      coursesTakenCount++;

      for (const neighborCourse of courseGraph.get(currentProcessingCourse)) {
        indegreeArray[neighborCourse]--;
        if (indegreeArray[neighborCourse] === 0) {
          initialQueue.push(neighborCourse);
        }
      }
    }
  }

  return coursesTakenCount === numberOfCourses ? currentSemesters : -1;
};
