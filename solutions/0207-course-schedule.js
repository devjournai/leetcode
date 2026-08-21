/**
 * Course Schedule
 * Intuition: A valid order exists iff the prerequisite graph has no cycle. DFS with colors (0 unvisited, 1 on the stack, 2 done) detects back edges.
 * Approach: 1. Build adjacency: each course points to its prerequisites. 2. DFS: visiting (1) again is a cycle; done (2) is safe. 3. Mark visiting, recurse on prereqs, then mark done. 4. Run DFS from every unfinished course; return false on a cycle, else true.
 * Dry Run: numCourses = 2, prerequisites = [[1,0],[0,1]].
 *   - Map: 1→[0], 0→[1].
 *   - DFS(0) marks 0 visiting, DFS(1) marks 1 visiting, DFS(0) sees state 1 → cycle → false.
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
