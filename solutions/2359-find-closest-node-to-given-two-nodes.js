/**
 * Find Closest Node To Given Two Nodes
 * Intuition: The problem asks to find a common meeting node for two distinct starting nodes, minimizing the maximum distance from either start node to that meeting node. This requires calculating the distance from each starting node to all reachable nodes in the functional graph.
 * Approach:
 * 1. Determine the total number of nodes in the graph.
 * 2. Initialize two arrays, `distancesFromNodeOne` and `distancesFromNodeTwo`, to store the shortest distance from `node1` and `node2` respectively to every other node. All distances are initially set to `Infinity`.
 * 3. Define a helper function, `calculatePathDistances`, that performs a traversal from a given `startPoint` and populates a specified `distanceArrayTarget`. This traversal follows the single outgoing edge at each step, incrementing the distance. It uses a `visited` set to detect and stop upon reaching a cycle or an already visited node, preventing infinite loops and ensuring shortest path in a functional graph.
 * 4. Call `calculatePathDistances` twice: once starting from `node1` to fill `distancesFromNodeOne`, and once starting from `node2` to fill `distancesFromNodeTwo`.
 * 5. Initialize `minimumOverallDistance` to `Infinity` and `foundMeetingNodeIndex` to `-1`.
 * 6. Iterate through all nodes from `0` to `n-1`. For each `currentCheckedNode`:
 *    a. Retrieve the distance from `node1` to `currentCheckedNode` and from `node2` to `currentCheckedNode`.
 *    b. If `currentCheckedNode` is reachable from both `node1` and `node2` (i.e., neither distance is `Infinity`), calculate the maximum of these two distances.
 *    c. If this `maxDistanceToCurrent` is less than `minimumOverallDistance`, update `minimumOverallDistance` with `maxDistanceToCurrent` and set `foundMeetingNodeIndex` to `currentCheckedNode`.
 * 7. Return `foundMeetingNodeIndex`.
 * Dry Run:
 * edges = [2,2,3,-1], node1 = 0, node2 = 1
 * n = 4
 *
 * 1. Initialize:
 *    totalNodesCount = 4
 *    distancesFromNodeOne = [inf, inf, inf, inf]
 *    distancesFromNodeTwo = [inf, inf, inf, inf]
 *    minimumOverallDistance = inf
 *    foundMeetingNodeIndex = -1
 *
 * 2. Call calculatePathDistances(0, distancesFromNodeOne):
 *    - currentNodeInPath = 0, pathLengthSoFar = 0, visitedNodesInPath = Set()
 *    - current = 0: distancesFromNodeOne[0] = 0, visited.add(0), current = edges[0]=2, pathLength = 1
 *    - current = 2: distancesFromNodeOne[2] = 1, visited.add(2), current = edges[2]=3, pathLength = 2
 *    - current = 3: distancesFromNodeOne[3] = 2, visited.add(3), current = edges[3]=-1, pathLength = 3
 *    - current = -1: Stop.
 *    distancesFromNodeOne = [0, inf, 1, 2]
 *
 * 3. Call calculatePathDistances(1, distancesFromNodeTwo):
 *    - currentNodeInPath = 1, pathLengthSoFar = 0, visitedNodesInPath = Set()
 *    - current = 1: distancesFromNodeTwo[1] = 0, visited.add(1), current = edges[1]=2, pathLength = 1
 *    - current = 2: distancesFromNodeTwo[2] = 1, visited.add(2), current = edges[2]=3, pathLength = 2
 *    - current = 3: distancesFromNodeTwo[3] = 2, visited.add(3), current = edges[3]=-1, pathLength = 3
 *    - current = -1: Stop.
 *    distancesFromNodeTwo = [inf, 0, 1, 2]
 *
 * 4. Iterate currentCheckedNode from 0 to 3:
 *    - currentCheckedNode = 0: distancesFromNodeOne[0] = 0, distancesFromNodeTwo[0] = inf. Not reachable from both.
 *    - currentCheckedNode = 1: distancesFromNodeOne[1] = inf, distancesFromNodeTwo[1] = 0. Not reachable from both.
 *    - currentCheckedNode = 2: distancesFromNodeOne[2] = 1, distancesFromNodeTwo[2] = 1. Reachable from both.
 *      maxDistanceToCurrent = max(1, 1) = 1.
 *      Since 1 < minimumOverallDistance (inf), update minimumOverallDistance = 1, foundMeetingNodeIndex = 2.
 *    - currentCheckedNode = 3: distancesFromNodeOne[3] = 2, distancesFromNodeTwo[3] = 2. Reachable from both.
 *      maxDistanceToCurrent = max(2, 2) = 2.
 *      Since 2 is not < minimumOverallDistance (1), no update.
 *
 * 5. Return foundMeetingNodeIndex = 2.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var closestMeetingNode = function (edges, node1, node2) {
  const totalNodesCount = edges.length;
  const distancesFromNodeOne = new Array(totalNodesCount).fill(Infinity);
  const distancesFromNodeTwo = new Array(totalNodesCount).fill(Infinity);

  function calculatePathDistances(startPoint, distanceArrayTarget) {
    let currentNodeInPath = startPoint;
    let pathLengthSoFar = 0;
    const visitedNodesInPath = new Set();

    while (
      currentNodeInPath !== -1 &&
      !visitedNodesInPath.has(currentNodeInPath)
    ) {
      distanceArrayTarget[currentNodeInPath] = pathLengthSoFar;
      visitedNodesInPath.add(currentNodeInPath);
      currentNodeInPath = edges[currentNodeInPath];
      pathLengthSoFar++;
    }
  }

  calculatePathDistances(node1, distancesFromNodeOne);
  calculatePathDistances(node2, distancesFromNodeTwo);

  let minimumOverallDistance = Infinity;
  let foundMeetingNodeIndex = -1;

  for (
    let currentCheckedNode = 0;
    currentCheckedNode < totalNodesCount;
    currentCheckedNode++
  ) {
    const distanceToCurrentFromOne = distancesFromNodeOne[currentCheckedNode];
    const distanceToCurrentFromTwo = distancesFromNodeTwo[currentCheckedNode];

    if (
      distanceToCurrentFromOne !== Infinity &&
      distanceToCurrentFromTwo !== Infinity
    ) {
      const maxDistanceToCurrent = Math.max(
        distanceToCurrentFromOne,
        distanceToCurrentFromTwo,
      );
      if (maxDistanceToCurrent < minimumOverallDistance) {
        minimumOverallDistance = maxDistanceToCurrent;
        foundMeetingNodeIndex = currentCheckedNode;
      }
    }
  }

  return foundMeetingNodeIndex;
};
