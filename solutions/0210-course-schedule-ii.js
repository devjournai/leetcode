/**
 * Course Schedule II
 * Intuition: A topological order is a valid course order. Kahn's algorithm repeatedly takes courses with in-degree 0; leftover nodes mean a cycle.
 * Approach: 1. Edge required → dependent; count incoming edges. 2. Enqueue every course with in-degree 0. 3. Pop, append to the order, decrement neighbors, enqueue when in-degree hits 0. 4. Return the order if it contains all courses, else [].
 * Dry Run: numCourses = 3, prerequisites = [[1,0],[2,0]].
 *   - Edges 0→1, 0→2; in-degree [0,1,1]; queue [0].
 *   - Take 0 → order [0]; 1 and 2 drop to 0 → queue [1,2].
 *   - Take 1, then 2 → [0,1,2]. Length 3 → return [0,1,2].
 * Time Complexity: O(V + E)
 * Space Complexity: O(V + E)
 */
var findOrder = function (numCourses, prerequisites) {
  const dependencyMap = Array(numCourses)
    .fill()
    .map(() => []);
  const courseIncomingCounts = new Array(numCourses).fill(0);

  for (const [dependentCourse, requiredCourse] of prerequisites) {
    dependencyMap[requiredCourse].push(dependentCourse);
    courseIncomingCounts[dependentCourse]++;
  }

  const coursesToProcess = [];
  for (let courseIndex = 0; courseIndex < numCourses; courseIndex++) {
    if (courseIncomingCounts[courseIndex] === 0) {
      coursesToProcess.push(courseIndex);
    }
  }

  const finalCourseOrder = [];
  let queueHead = 0;

  while (queueHead < coursesToProcess.length) {
    const currentCourse = coursesToProcess[queueHead];
    queueHead++;
    finalCourseOrder.push(currentCourse);

    for (const nextCourse of dependencyMap[currentCourse]) {
      courseIncomingCounts[nextCourse]--;
      if (courseIncomingCounts[nextCourse] === 0) {
        coursesToProcess.push(nextCourse);
      }
    }
  }

  if (finalCourseOrder.length === numCourses) {
    return finalCourseOrder;
  } else {
    return [];
  }
};
