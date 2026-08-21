/**
 * Parallel Courses Iii
 * Intuition: The problem involves finding the maximum duration to complete all courses given prerequisites and individual course times, where courses can run in parallel. This is a classic longest path problem in a Directed Acyclic Graph (DAG). The completion time for any course is the maximum completion time of its prerequisites plus its own duration.
 * Approach: 1. Construct an adjacency list representation of the course dependencies (graph) and compute the in-degree (number of prerequisites) for each course. 2. Initialize an array to store the maximum time taken to complete each course. 3. Identify all courses with no prerequisites (in-degree of 0) and add them to a processing queue. Their initial completion time is simply their individual duration. 4. Process courses from the queue: for each course, iterate through its direct successor courses. Update the successor's completion time by taking the maximum of its current recorded time and the sum of the current course's completion time plus the successor's own duration. Decrement the successor's in-degree. If a successor's in-degree drops to zero, it means all its prerequisites are met, so add it to the processing queue. 5. After processing all courses via the topological sort, the maximum value in the completion time array will be the minimum total months required.
 * Dry Run: n=3, relations=[[1,3],[2,3]], time=[1,2,3]
 *   1. Initialize `courseGraph`=[[],[],[],[]], `incomingEdgesCount`=[0,0,0,0], `courseCompletionDurations`=[0,0,0,0]. (1-based indexing)
 *   2. Process `relations`:
 *      - `[1,3]`: `courseGraph[1].push(3)`, `incomingEdgesCount[3]` becomes 1.
 *      - `[2,3]`: `courseGraph[2].push(3)`, `incomingEdgesCount[3]` becomes 2.
 *      `courseGraph` = [[],[3],[3],[]], `incomingEdgesCount` = [0,0,0,2].
 *   3. Populate `coursesToProcess` and initial `courseCompletionDurations`:
 *      - `courseId = 1`: `incomingEdgesCount[1]` is 0. `coursesToProcess.push(1)`. `courseCompletionDurations[1] = time[0]` (1).
 *      - `courseId = 2`: `incomingEdgesCount[2]` is 0. `coursesToProcess.push(2)`. `courseCompletionDurations[2] = time[1]` (2).
 *      - `courseId = 3`: `incomingEdgesCount[3]` is 2. (Not added)
 *      `coursesToProcess` = [1, 2], `courseCompletionDurations` = [0, 1, 2, 0].
 *   4. Main processing loop (`headPointer = 0`):
 *      - **Iteration 1**: `activeCourse = coursesToProcess[0]` (1), `headPointer` becomes 1.
 *          - `nextCourse` for 1 is 3.
 *          - `courseCompletionDurations[3] = Math.max(courseCompletionDurations[3], courseCompletionDurations[1] + time[2])`
 *          - `courseCompletionDurations[3] = Math.max(0, 1 + 3)` (now 4).
 *          - `incomingEdgesCount[3]` becomes 1. (Not 0)
 *      - **Iteration 2**: `activeCourse = coursesToProcess[1]` (2), `headPointer` becomes 2.
 *          - `nextCourse` for 2 is 3.
 *          - `courseCompletionDurations[3] = Math.max(courseCompletionDurations[3], courseCompletionDurations[2] + time[2])`
 *          - `courseCompletionDurations[3] = Math.max(4, 2 + 3)` (now 5).
 *          - `incomingEdgesCount[3]` becomes 0.
 *          - `coursesToProcess.push(3)`. `coursesToProcess` = [1, 2, 3].
 *      - **Iteration 3**: `activeCourse = coursesToProcess[2]` (3), `headPointer` becomes 3.
 *          - `courseGraph[3]` is empty. No dependent courses.
 *   Loop ends as `headPointer` (3) is not less than `coursesToProcess.length` (3).
 *   5. Calculate `overallMaxTime`:
 *      - `overallMaxTime` starts at 0.
 *      - `courseCompletionDurations[1]` (1) > `overallMaxTime`, `overallMaxTime` = 1.
 *      - `courseCompletionDurations[2]` (2) > `overallMaxTime`, `overallMaxTime` = 2.
 *      - `courseCompletionDurations[3]` (5) > `overallMaxTime`, `overallMaxTime` = 5.
 *   Return 5.
 * Time Complexity: O(N + E)
 * Space Complexity: O(N + E)
 */
var minimumTime = function (n, relations, time) {
  const courseGraph = Array.from({ length: n + 1 }, () => []);
  const incomingEdgesCount = new Array(n + 1).fill(0);
  const courseCompletionDurations = new Array(n + 1).fill(0);

  for (
    let relationIndex = 0;
    relationIndex < relations.length;
    relationIndex++
  ) {
    const precedingCourse = relations[relationIndex][0];
    const succeedingCourse = relations[relationIndex][1];
    courseGraph[precedingCourse].push(succeedingCourse);
    incomingEdgesCount[succeedingCourse]++;
  }

  const coursesToProcess = [];
  for (let courseId = 1; courseId <= n; courseId++) {
    if (incomingEdgesCount[courseId] === 0) {
      coursesToProcess.push(courseId);
      courseCompletionDurations[courseId] = time[courseId - 1];
    }
  }

  let headPointer = 0;
  while (headPointer < coursesToProcess.length) {
    const activeCourse = coursesToProcess[headPointer++];

    for (
      let dependentIndex = 0;
      dependentIndex < courseGraph[activeCourse].length;
      dependentIndex++
    ) {
      const nextCourse = courseGraph[activeCourse][dependentIndex];
      courseCompletionDurations[nextCourse] = Math.max(
        courseCompletionDurations[nextCourse],
        courseCompletionDurations[activeCourse] + time[nextCourse - 1]
      );
      incomingEdgesCount[nextCourse]--;
      if (incomingEdgesCount[nextCourse] === 0) {
        coursesToProcess.push(nextCourse);
      }
    }
  }

  let overallMaxTime = 0;
  for (let durationIndex = 1; durationIndex <= n; durationIndex++) {
    if (courseCompletionDurations[durationIndex] > overallMaxTime) {
      overallMaxTime = courseCompletionDurations[durationIndex];
    }
  }

  return overallMaxTime;
};
