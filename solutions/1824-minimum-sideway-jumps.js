/**
 * Minimum Sideway Jumps
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minSideJumps = function (obstacles) {
  const totalWaypoints = obstacles.length;
  let currentMinJumps = [1, 0, 1];

  for (
    let currentWaypointIndex = 1;
    currentWaypointIndex < totalWaypoints;
    currentWaypointIndex++
  ) {
    const obstaclePresentLane = obstacles[currentWaypointIndex];
    let nextMinJumpsAccumulator = [Infinity, Infinity, Infinity];

    if (obstaclePresentLane !== 1) {
      nextMinJumpsAccumulator[0] = currentMinJumps[0];
    }
    if (obstaclePresentLane !== 1 && obstaclePresentLane !== 2) {
      const jumpsFromLaneTwo = currentMinJumps[1] + 1;
      if (jumpsFromLaneTwo < nextMinJumpsAccumulator[0]) {
        nextMinJumpsAccumulator[0] = jumpsFromLaneTwo;
      }
    }
    if (obstaclePresentLane !== 1 && obstaclePresentLane !== 3) {
      const jumpsFromLaneThree = currentMinJumps[2] + 1;
      if (jumpsFromLaneThree < nextMinJumpsAccumulator[0]) {
        nextMinJumpsAccumulator[0] = jumpsFromLaneThree;
      }
    }

    if (obstaclePresentLane !== 2) {
      nextMinJumpsAccumulator[1] = currentMinJumps[1];
    }
    if (obstaclePresentLane !== 2 && obstaclePresentLane !== 1) {
      const jumpsFromLaneOne = currentMinJumps[0] + 1;
      if (jumpsFromLaneOne < nextMinJumpsAccumulator[1]) {
        nextMinJumpsAccumulator[1] = jumpsFromLaneOne;
      }
    }
    if (obstaclePresentLane !== 2 && obstaclePresentLane !== 3) {
      const jumpsFromOtherLaneThree = currentMinJumps[2] + 1;
      if (jumpsFromOtherLaneThree < nextMinJumpsAccumulator[1]) {
        nextMinJumpsAccumulator[1] = jumpsFromOtherLaneThree;
      }
    }

    if (obstaclePresentLane !== 3) {
      nextMinJumpsAccumulator[2] = currentMinJumps[2];
    }
    if (obstaclePresentLane !== 3 && obstaclePresentLane !== 1) {
      const jumpsFromInitialLaneOne = currentMinJumps[0] + 1;
      if (jumpsFromInitialLaneOne < nextMinJumpsAccumulator[2]) {
        nextMinJumpsAccumulator[2] = jumpsFromInitialLaneOne;
      }
    }
    if (obstaclePresentLane !== 3 && obstaclePresentLane !== 2) {
      const jumpsFromLaneTwoAlternative = currentMinJumps[1] + 1;
      if (jumpsFromLaneTwoAlternative < nextMinJumpsAccumulator[2]) {
        nextMinJumpsAccumulator[2] = jumpsFromLaneTwoAlternative;
      }
    }

    currentMinJumps = nextMinJumpsAccumulator;
  }

  let minimumFinalJumps = Infinity;
  if (currentMinJumps[0] < minimumFinalJumps) {
    minimumFinalJumps = currentMinJumps[0];
  }
  if (currentMinJumps[1] < minimumFinalJumps) {
    minimumFinalJumps = currentMinJumps[1];
  }
  if (currentMinJumps[2] < minimumFinalJumps) {
    minimumFinalJumps = currentMinJumps[2];
  }
  return minimumFinalJumps;
};
