/**
 * Course Schedule II
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
