/**
 * Maximum Employees To Be Invited To A Meeting
 * Intuition: The problem describes a graph where each employee 'i' likes 'favorite[i]', forming a functional graph where each node has an out-degree of 1. Such a graph consists of components, each being a set of directed trees pointing towards a cycle. Employees will attend if they can sit next to their favorite person, which implies they must be part of a cycle. There are two main types of cycles relevant to seating:
 * 1. 2-person cycles (A likes B, and B likes A): These form a stable pair. Additionally, employees who like A (but not B) or B (but not A), and so on, can form chains leading into these 2-person cycles. All employees in such a configuration (the 2-person cycle plus all its feeder chains) can be invited together. We sum the lengths of all such feeder chains + 2 for each unique 2-person cycle.
 * 2. Larger cycles (3 or more employees): All employees within a single cycle of length 3 or more can be invited. For example, A likes B, B likes C, C likes A.
 * The "maximum number of employees that can be invited to a meeting" implies finding the largest possible group that can sit together in a single meeting. This means we compare the total number of employees from all disjoint 2-person cycle structures (sum of feeder chains for all 2-cycles) against the length of the single largest cycle (of length >= 3). The final answer is the maximum of these two values.
 *
 * Approach:
 * 1. Preprocessing: Create a reverse adjacency list (`predecessorAdjacency`) where `predecessorAdjacency[j]` contains all employees `i` such that `favoriteEmployees[i] == j`. This helps to find incoming chains. Initialize a `globalVisitedStatus` boolean array to track employees included in any part of the meeting.
 * 2. Phase 1 - Calculate total employees for 2-person cycles and their feeder chains:
 *    Iterate through all employees `idxFirst`. If `idxFirst` and `favoriteEmployees[idxFirst]` (`idxSecond`) form a 2-person cycle (i.e., `favoriteEmployees[idxSecond] == idxFirst`), and `idxFirst < idxSecond` (to process each pair only once):
 *    a. For each employee in the 2-cycle (`idxFirst` and `idxSecond`), find the maximum length of a feeder chain ending at that employee, excluding the other employee in the pair. This is done using a recursive helper function `calculateLongestFeeder`.
 *    b. The `calculateLongestFeeder` function takes `currentNodeIdentifier`, `forbiddenTargetIdentifier`, and `visitedArray` (the `globalVisitedStatus` array). It marks `currentNodeIdentifier` as visited in `visitedArray` to ensure each employee is counted once across all 2-cycle structures and is excluded from consideration in Phase 2. It then recursively finds the longest path among its predecessors, avoiding the `forbiddenTargetIdentifier` and already visited employees.
 *    c. Sum the lengths of the two feeder chains (for `idxFirst` and `idxSecond`) and add this to `maximumOverallAttendees`.
 * 3. Phase 2 - Find the maximum length of any other cycle (length >= 3):
 *    Iterate through all employees `idxIterator`. If `idxIterator` has not been visited (`globalVisitedStatus[idxIterator]` is false), start a traversal:
 *    a. Use a `currentCyclePath` map to track nodes visited in the current traversal path along with their depths.
 *    b. Traverse the `favoriteEmployees` graph starting from `idxIterator`. For each `explorerNode` in the path:
 *       i. Mark `explorerNode` as visited in `globalVisitedStatus`.
 *       ii. If `explorerNode` is already in `currentCyclePath`, a cycle is detected. Calculate its length (`currentDepthCount - currentCyclePath.get(explorerNode)`).
 *       iii. Update `maximumOverallAttendees` with the maximum of its current value and the detected cycle's length.
 *       iv. Break the traversal for the current `idxIterator` as the cycle is processed.
 *    c. If the traversal encounters a node already in `globalVisitedStatus` but not in `currentCyclePath`, it means the path leads to an already processed chain or cycle. Break the traversal.
 * 4. Return `maximumOverallAttendees`.
 *
 * Dry Run: favorite = [1, 2, 0, 4, 3] (n=5)
 * 1. Initialize:
 *    `maximumOverallAttendees = 0`
 *    `globalVisitedStatus = [F, F, F, F, F]`
 *    `predecessorAdjacency`:
 *       `0: [2]` (2 likes 0)
 *       `1: [0]` (0 likes 1)
 *       `2: [1, 4]` (1 likes 2, 4 likes 2)
 *       `3: [5]` (No employee likes 3 initially, `favorite[4]=3` means `4` likes `3`. So `predecessorAdjacency[3]=[4]`) -> Correction: `favorite = [1, 2, 0, 4, 3]`
 *          `favoriteEmployees[0]=1` -> `predecessorAdjacency[1].push(0)`
 *          `favoriteEmployees[1]=2` -> `predecessorAdjacency[2].push(1)`
 *          `favoriteEmployees[2]=0` -> `predecessorAdjacency[0].push(2)`
 *          `favoriteEmployees[3]=4` -> `predecessorAdjacency[4].push(3)`
 *          `favoriteEmployees[4]=3` -> `predecessorAdjacency[3].push(4)`
 *       So, `predecessorAdjacency`:
 *          `0: [2]`
 *          `1: [0]`
 *          `2: [1]`
 *          `3: [4]`
 *          `4: [3]`
 *
 * 2. Phase 1 - 2-person cycles:
 *    `idxFirst = 0`: `idxSecond = favoriteEmployees[0] = 1`. `favoriteEmployees[1] = 2` (not 0). No 2-cycle.
 *    `idxFirst = 1`: `idxSecond = favoriteEmployees[1] = 2`. `favoriteEmployees[2] = 0` (not 1). No 2-cycle.
 *    `idxFirst = 2`: `idxSecond = favoriteEmployees[2] = 0`. `favoriteEmployees[0] = 1` (not 2). No 2-cycle.
 *    `idxFirst = 3`: `idxSecond = favoriteEmployees[3] = 4`. `favoriteEmployees[4] = 3`. This is a 2-cycle (`3 <-> 4`). Condition `idxFirst < idxSecond` (3 < 4) is true.
 *       Call `calculateLongestFeeder(3, 4, globalVisitedStatus)`:
 *          `globalVisitedStatus[3] = true`. `maxPathSegment = 0`.
 *          Predecessors of 3: `[4]`. `pred = 4`. `pred === forbiddenTargetIdentifier` (4 === 4). Continue.
 *          Return `1 + 0 = 1`. (`chainOneLen = 1`)
 *       Call `calculateLongestFeeder(4, 3, globalVisitedStatus)`:
 *          `globalVisitedStatus[4] = true`. `maxPathSegment = 0`.
 *          Predecessors of 4: `[3]`. `pred = 3`. `pred === forbiddenTargetIdentifier` (3 === 3). Continue.
 *          Return `1 + 0 = 1`. (`chainTwoLen = 1`)
 *       `maximumOverallAttendees += (1 + 1) = 2`.
 *       `globalVisitedStatus = [F, F, F, T, T]`
 *    `idxFirst = 4`: `idxSecond = favoriteEmployees[4] = 3`. `favoriteEmployees[3] = 4`. This is a 2-cycle (`4 <-> 3`). Condition `idxFirst < idxSecond` (4 < 3) is false. Skip.
 * After Phase 1: `maximumOverallAttendees = 2`. `globalVisitedStatus = [F, F, F, T, T]`.
 *
 * 3. Phase 2 - Larger cycles:
 *    `idxIterator = 0`: `globalVisitedStatus[0]` is `F`.
 *       `currentCyclePath = {}`
 *       `explorerNode = 0`, `currentDepthCount = 0`
 *       Loop:
 *          `explorerNode = 0`: `globalVisitedStatus[0] = T`. `currentCyclePath.set(0, 0)`. `explorerNode = favoriteEmployees[0] = 1`. `currentDepthCount = 1`.
 *          `currentCyclePath.has(1)` is `F`.
 *          `explorerNode = 1`: `globalVisitedStatus[1] = T`. `currentCyclePath.set(1, 1)`. `explorerNode = favoriteEmployees[1] = 2`. `currentDepthCount = 2`.
 *          `currentCyclePath.has(2)` is `F`.
 *          `explorerNode = 2`: `globalVisitedStatus[2] = T`. `currentCyclePath.set(2, 2)`. `explorerNode = favoriteEmployees[2] = 0`. `currentDepthCount = 3`.
 *          `currentCyclePath.has(0)` is `T`. Cycle detected!
 *             `cycleLength = currentDepthCount - currentCyclePath.get(0) = 3 - 0 = 3`.
 *             `maximumOverallAttendees = Math.max(2, 3) = 3`.
 *             Break loop.
 *    `globalVisitedStatus = [T, T, T, T, T]`.
 *    `idxIterator = 1`: `globalVisitedStatus[1]` is `T`. Skip.
 *    `idxIterator = 2`: `globalVisitedStatus[2]` is `T`. Skip.
 *    `idxIterator = 3`: `globalVisitedStatus[3]` is `T`. Skip.
 *    `idxIterator = 4`: `globalVisitedStatus[4]` is `T`. Skip.
 *
 * 4. Return `maximumOverallAttendees = 3`.
 * Correct for input `[1, 2, 0, 4, 3]`. The 2-cycle `3<->4` invites 2 people. The 3-cycle `0->1->2->0` invites 3 people. Max is 3.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maximumInvitations = function (favoriteEmployees) {
  const employeeCount = favoriteEmployees.length;
  let maximumOverallAttendees = 0;

  const predecessorAdjacency = new Array(employeeCount).fill().map(() => []);
  for (
    let currentEmployee = 0;
    currentEmployee < employeeCount;
    currentEmployee++
  ) {
    predecessorAdjacency[favoriteEmployees[currentEmployee]].push(
      currentEmployee,
    );
  }

  const globalVisitedStatus = new Array(employeeCount).fill(false);

  function calculateLongestFeeder(
    currentNodeIdentifier,
    forbiddenTargetIdentifier,
    visitedArray,
  ) {
    visitedArray[currentNodeIdentifier] = true;
    let maxPathSegment = 0;
    for (let predecessorNode of predecessorAdjacency[currentNodeIdentifier]) {
      if (
        predecessorNode === forbiddenTargetIdentifier ||
        visitedArray[predecessorNode]
      ) {
        continue;
      }
      maxPathSegment = Math.max(
        maxPathSegment,
        calculateLongestFeeder(
          predecessorNode,
          forbiddenTargetIdentifier,
          visitedArray,
        ),
      );
    }
    return 1 + maxPathSegment;
  }

  for (let idxFirst = 0; idxFirst < employeeCount; idxFirst++) {
    let idxSecond = favoriteEmployees[idxFirst];
    if (favoriteEmployees[idxSecond] === idxFirst && idxFirst < idxSecond) {
      let chainOneLength = calculateLongestFeeder(
        idxFirst,
        idxSecond,
        globalVisitedStatus,
      );
      let chainTwoLength = calculateLongestFeeder(
        idxSecond,
        idxFirst,
        globalVisitedStatus,
      );
      maximumOverallAttendees += chainOneLength + chainTwoLength;
    }
  }

  for (let idxIterator = 0; idxIterator < employeeCount; idxIterator++) {
    if (globalVisitedStatus[idxIterator]) {
      continue;
    }

    const currentCyclePath = new Map();
    let explorerNode = idxIterator;
    let currentDepthCount = 0;

    while (!globalVisitedStatus[explorerNode]) {
      globalVisitedStatus[explorerNode] = true;
      currentCyclePath.set(explorerNode, currentDepthCount);
      explorerNode = favoriteEmployees[explorerNode];
      currentDepthCount++;

      if (currentCyclePath.has(explorerNode)) {
        let cycleCurrentLength =
          currentDepthCount - currentCyclePath.get(explorerNode);
        maximumOverallAttendees = Math.max(
          maximumOverallAttendees,
          cycleCurrentLength,
        );
        break;
      }
    }
  }

  return maximumOverallAttendees;
};
