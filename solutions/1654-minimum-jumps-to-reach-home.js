/**
 * Minimum Jumps To Reach Home
 * Time Complexity: O(X + A + B + F_MAX)
 * Space Complexity: O(X + A + B + F_MAX)
 */
var minimumJumps = function (forbidden, a, b, x) {
  const forbiddenLocations = new Set(forbidden);

  const maximumReachablePosition = Math.max(
    x + b + a,
    Math.max(...forbidden) + a + b,
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
