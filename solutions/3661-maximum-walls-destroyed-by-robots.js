/**
 * Maximum Walls Destroyed by Robots
 * Time Complexity: O(M log M + N log N + N log M)
 * Space Complexity: O(N + M)
 */
var maxWalls = function (robots, distance, walls) {
  function lowerBound(arr, target) {
    let low = 0;
    let high = arr.length;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (arr[mid] < target) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return low;
  }

  function upperBound(arr, target) {
    let low = 0;
    let high = arr.length;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (arr[mid] <= target) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return low;
  }

  walls.sort((a, b) => a - b);

  const robotsInfo = [];
  for (let i = 0; i < robots.length; i++) {
    robotsInfo.push({ pos: robots[i], dist: distance[i] });
  }
  robotsInfo.sort((a, b) => a.pos - b.pos);

  let maxDestroyedWalls = 0;

  for (let i = 0; i < robotsInfo.length; i++) {
    const currentRobot = robotsInfo[i];
    const robotPos = currentRobot.pos;
    const fireDist = currentRobot.dist;

    let actualLeftmostReach = robotPos - fireDist;

    if (i > 0) {
      const blockingRobotPos = robotsInfo[i - 1].pos;
      if (blockingRobotPos >= actualLeftmostReach) {
        actualLeftmostReach = blockingRobotPos;
      }
    }

    const leftWallStartIndex = lowerBound(walls, actualLeftmostReach);
    const leftWallEndIndex = upperBound(walls, robotPos);
    maxDestroyedWalls = Math.max(
      maxDestroyedWalls,
      leftWallEndIndex - leftWallStartIndex,
    );

    let actualRightmostReach = robotPos + fireDist;

    if (i < robotsInfo.length - 1) {
      const blockingRobotPos = robotsInfo[i + 1].pos;
      if (blockingRobotPos <= actualRightmostReach) {
        actualRightmostReach = blockingRobotPos;
      }
    }

    const rightWallStartIndex = lowerBound(walls, robotPos);
    const rightWallEndIndex = upperBound(walls, actualRightmostReach);
    maxDestroyedWalls = Math.max(
      maxDestroyedWalls,
      rightWallEndIndex - rightWallStartIndex,
    );
  }

  return maxDestroyedWalls;
};
