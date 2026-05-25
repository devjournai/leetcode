/**
 * Jump Game VII
 * Intuition: This problem asks if a target index can be reached from a starting index (0) following specific jump rules. This is a classic graph reachability problem, best solved using Breadth-First Search (BFS) to find the shortest path or simply existence of a path.
 * Approach: 1. Initialize a boolean array `canAccess` to track reachable indices, starting with `canAccess[0] = true`. 2. Use a queue (`exploreQueue`) for BFS, initially adding index 0. 3. Maintain `maxJumpedSoFar` to optimize exploration: this variable stores the maximum index up to which we have *already considered* potential jumps from previous reachable points. This allows us to skip re-checking indices. 4. In the BFS loop, when processing `currentIndex`, calculate the valid jump range `[potentialJumpMin, potentialJumpMax]`. 5. Iterate through `destinationIndex` in the range `[Math.max(potentialJumpMin, maxJumpedSoFar + 1), potentialJumpMax]`. For each `destinationIndex` that contains '0' and hasn't been marked as reachable, mark it `true` in `canAccess` and add it to `exploreQueue`. If `destinationIndex` is the target (`stringLength - 1`), return `true`. 6. Update `maxJumpedSoFar` after processing `currentIndex` to reflect the furthest point explored for potential jumps. 7. If the queue becomes empty and the target isn't reached, return `false`.
 * Dry Run: s = "011010", minJump = 2, maxJump = 3
 *   - stringLength = 6, canAccess = [T,F,F,F,F,F], exploreQueue = [0], maxJumpedSoFar = 0
 *   - Iteration 1 (currentIndex = 0):
 *     - potentialJumpMin = 0 + 2 = 2
 *     - potentialJumpMax = Math.min(0 + 3, 5) = 3
 *     - explorationPoint starts at Math.max(2, 0 + 1) = 2
 *     - Loop for explorationPoint from 2 to 3:
 *       - explorationPoint = 2: s[2] = '1' (skip)
 *       - explorationPoint = 3: s[3] = '0'. Not stringLength - 1. canAccess[3] is F -> T. exploreQueue.push(3).
 *     - exploreQueue = [3]
 *     - maxJumpedSoFar = Math.max(0, 3) = 3
 *   - Iteration 2 (currentIndex = 3):
 *     - potentialJumpMin = 3 + 2 = 5
 *     - potentialJumpMax = Math.min(3 + 3, 5) = 5
 *     - explorationPoint starts at Math.max(5, 3 + 1) = 5
 *     - Loop for explorationPoint from 5 to 5:
 *       - explorationPoint = 5: s[5] = '0'. Is stringLength - 1 (5). RETURN true.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var canReach = function (s, minJump, maxJump) {
  const stringLength = s.length;
  const canAccess = new Array(stringLength).fill(false);
  canAccess[0] = true;

  const exploreQueue = [0];
  let maxJumpedSoFar = 0;

  while (exploreQueue.length > 0) {
    const currentIndex = exploreQueue.shift();

    const potentialJumpMin = currentIndex + minJump;
    const potentialJumpMax = Math.min(currentIndex + maxJump, stringLength - 1);

    let explorationPoint = Math.max(potentialJumpMin, maxJumpedSoFar + 1);

    for (; explorationPoint <= potentialJumpMax; explorationPoint++) {
      if (s[explorationPoint] === "0") {
        if (explorationPoint === stringLength - 1) {
          return true;
        }
        if (!canAccess[explorationPoint]) {
          canAccess[explorationPoint] = true;
          exploreQueue.push(explorationPoint);
        }
      }
    }
    maxJumpedSoFar = Math.max(maxJumpedSoFar, potentialJumpMax);
  }

  return false;
};
