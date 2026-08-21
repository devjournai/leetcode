/**
 * Minimum Jumps To Reach Home
 * Intuition: Positions plus "last jump was backward" is a BFS state. You may always jump +a, and jump -b only if the previous jump was forward. Bound the search so you cannot run to infinity.
 * Approach: 1. Put forbidden cells in a set. 2. Cap position at max(x, max(forbidden))+a+b. 3. BFS from (0, not-backward). 4. Enqueue +a if in range and unseen; enqueue -b if last was not backward, position ≥ 0, and unseen. 5. Return steps at x, or -1.
 * Dry Run: forbidden=[14,4,18], a=3, b=15, x=9.
 *   - 0→3→6→9 in three forward jumps.
 * Time Complexity: O(X + A + B + F_MAX)
 * Space Complexity: O(X + A + B + F_MAX)
 */
var minimumJumps = function (forbidden, a, b, x) {
  const forbiddenLocations = new Set(forbidden);

  const maximumReachablePosition = Math.max(
    x + b + a,
    Math.max(...forbidden) + a + b
  );

  const jumpSequenceQueue = [[0, 0, false]];
  const exploredPaths = new Set(["0,false"]);

  while (jumpSequenceQueue.length > 0) {
    const [currentLocation, currentJumpCount, jumpedBackwardLast] =
      jumpSequenceQueue.shift();

    if (currentLocation === x) {
      return currentJumpCount;
    }

    const nextRightPosition = currentLocation + a;
    const nextRightStateKey = `${nextRightPosition},false`;

    if (
      nextRightPosition <= maximumReachablePosition &&
      !forbiddenLocations.has(nextRightPosition) &&
      !exploredPaths.has(nextRightStateKey)
    ) {
      jumpSequenceQueue.push([nextRightPosition, currentJumpCount + 1, false]);
      exploredPaths.add(nextRightStateKey);
    }

    const nextLeftPosition = currentLocation - b;
    const nextLeftStateKey = `${nextLeftPosition},true`;
    if (
      !jumpedBackwardLast &&
      b > 0 &&
      nextLeftPosition >= 0 &&
      !forbiddenLocations.has(nextLeftPosition) &&
      !exploredPaths.has(nextLeftStateKey)
    ) {
      jumpSequenceQueue.push([nextLeftPosition, currentJumpCount + 1, true]);
      exploredPaths.add(nextLeftStateKey);
    }
  }

  return -1;
};
