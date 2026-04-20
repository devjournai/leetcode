/**
 * Course Schedule
 * Time Complexity: O(N + P)
 * Space Complexity: O(N + P)
 */
var canFinish = function (numCourses, prerequisites) {
  const dependencyMap = new Map();
  const nodeStates = new Array(numCourses).fill(0);

  prerequisites.forEach(([dependentCourseId, requiredCourseId]) => {
    if (!dependencyMap.has(dependentCourseId)) {
      dependencyMap.set(dependentCourseId, []);
    }
    dependencyMap.get(dependentCourseId).push(requiredCourseId);
  });

  function checkCourseCycle(currentCourseIdentifier) {
    if (nodeStates[currentCourseIdentifier] === 1) {
      return false;
    }
    if (nodeStates[currentCourseIdentifier] === 2) {
      return true;
    }

    nodeStates[currentCourseIdentifier] = 1;

    const directPrerequisites =
      dependencyMap.get(currentCourseIdentifier) || [];
    for (const prerequisiteId of directPrerequisites) {
      if (!checkCourseCycle(prerequisiteId)) {
        return false;
      }
    }

    nodeStates[currentCourseIdentifier] = 2;
    return true;
  }

  for (
    let courseIteration = 0;
    courseIteration < numCourses;
    courseIteration++
  ) {
    if (nodeStates[courseIteration] !== 2) {
      if (!checkCourseCycle(courseIteration)) {
        return false;
      }
    }
  }

  return true;
};
