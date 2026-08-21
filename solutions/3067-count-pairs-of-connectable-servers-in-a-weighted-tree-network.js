/**
 * Count Pairs Of Connectable Servers In A Weighted Tree Network
 * Intuition: For each server `c`, we need to find pairs of servers `(a, b)` such that `a < b`, `a` and `b` are in different branches stemming from `c`, and their distances from `c` are both multiples of `signalSpeed`.
 * Approach: 1. Build an adjacency list representation of the tree from the given `edges`. 2. Iterate through each possible server `c` (from 0 to `n-1`) to serve as the central server. 3. For each central server `c`, perform a Depth First Search (DFS) from each of its direct children to calculate the count of reachable servers `s` in that particular branch whose distance from `c` is a multiple of `signalSpeed`. The DFS function will take the current node, its parent, and the accumulated distance from `c` as parameters. 4. Store these counts for each branch originating from `c`. 5. To find connectable pairs, iterate through the list of branch counts. For each branch's count `X`, it forms `X * Y` pairs with all previously processed branches that had a total count `Y`. Maintain a running sum of counts from previous branches to efficiently calculate `Y`.
 * Dry Run:
 * edges = [[0,1,1],[1,2,5],[2,3,2],[2,4,4]], signalSpeed = 2
 * n = 5
 * adjacencyList = [
 *   0: [[1,1]],
 *   1: [[0,1],[2,5]],
 *   2: [[1,5],[3,2],[4,4]],
 *   3: [[2,2]],
 *   4: [[2,4]]
 * ]
 * serverPairCounts = [0,0,0,0,0]
 *
 * Iterate serverIdx from 0 to 4:
 *
 * serverIdx = 0: (centralServer = 0)
 *   branchPathCounts = []
 *   Direct child of 0: [1,1]
 *     depthFirstSearch(currentNode=1, parentNode=0, currentDistance=1):
 *       validPathCount = 1 % 2 === 0 ? 1 : 0 => 0
 *       Neighbors of 1 (excluding 0): [2,5]
 *         depthFirstSearch(currentNode=2, parentNode=1, currentDistance=1+5=6):
 *           validPathCount = 6 % 2 === 0 ? 1 : 0 => 1
 *           Neighbors of 2 (excluding 1): [3,2], [4,4]
 *             depthFirstSearch(currentNode=3, parentNode=2, currentDistance=6+2=8):
 *               validPathCount = 8 % 2 === 0 ? 1 : 0 => 1
 *               No neighbors of 3 (excluding 2)
 *             returns 1
 *             depthFirstSearch(currentNode=4, parentNode=2, currentDistance=6+4=10):
 *               validPathCount = 10 % 2 === 0 ? 1 : 0 => 1
 *               No neighbors of 4 (excluding 2)
 *             returns 1
 *         Returns 1 + 1 + 1 = 3
 *     individualBranchCount = 3
 *     branchPathCounts = [3]
 *   accumulatedPairs = 0
 *   runningSumOfPreviousBranches = 0
 *   For currentBranchCounter = 3:
 *     accumulatedPairs += 0 * 3 = 0
 *     runningSumOfPreviousBranches += 3 = 3
 *   returns 0
 * serverPairCounts = [0,0,0,0,0]
 *
 * serverIdx = 1: (centralServer = 1)
 *   branchPathCounts = []
 *   Direct child of 1: [0,1]
 *     depthFirstSearch(currentNode=0, parentNode=1, currentDistance=1):
 *       validPathCount = 1 % 2 === 0 ? 1 : 0 => 0
 *       No neighbors of 0 (excluding 1)
 *     individualBranchCount = 0
 *     branchPathCounts = [0]
 *   Direct child of 1: [2,5]
 *     depthFirstSearch(currentNode=2, parentNode=1, currentDistance=5):
 *       validPathCount = 5 % 2 === 0 ? 1 : 0 => 0
 *       Neighbors of 2 (excluding 1): [3,2], [4,4]
 *         depthFirstSearch(currentNode=3, parentNode=2, currentDistance=5+2=7):
 *           validPathCount = 7 % 2 === 0 ? 1 : 0 => 0
 *         returns 0
 *         depthFirstSearch(currentNode=4, parentNode=2, currentDistance=5+4=9):
 *           validPathCount = 9 % 2 === 0 ? 1 : 0 => 0
 *         returns 0
 *     Returns 0 + 0 + 0 = 0
 *     individualBranchCount = 0
 *     branchPathCounts = [0, 0]
 *   accumulatedPairs = 0
 *   runningSumOfPreviousBranches = 0
 *   For currentBranchCounter = 0:
 *     accumulatedPairs += 0 * 0 = 0
 *     runningSumOfPreviousBranches += 0 = 0
 *   For currentBranchCounter = 0:
 *     accumulatedPairs += 0 * 0 = 0
 *     runningSumOfPreviousBranches += 0 = 0
 *   returns 0
 * serverPairCounts = [0,0,0,0,0]
 *
 * serverIdx = 2: (centralServer = 2)
 *   branchPathCounts = []
 *   Direct child of 2: [1,5]
 *     depthFirstSearch(currentNode=1, parentNode=2, currentDistance=5):
 *       validPathCount = 5 % 2 === 0 ? 1 : 0 => 0
 *       Neighbors of 1 (excluding 2): [0,1]
 *         depthFirstSearch(currentNode=0, parentNode=1, currentDistance=5+1=6):
 *           validPathCount = 6 % 2 === 0 ? 1 : 0 => 1
 *         returns 1
 *     Returns 0 + 1 = 1
 *     individualBranchCount = 1
 *     branchPathCounts = [1]
 *   Direct child of 2: [3,2]
 *     depthFirstSearch(currentNode=3, parentNode=2, currentDistance=2):
 *       validPathCount = 2 % 2 === 0 ? 1 : 0 => 1
 *       No neighbors of 3 (excluding 2)
 *     Returns 1
 *     individualBranchCount = 1
 *     branchPathCounts = [1, 1]
 *   Direct child of 2: [4,4]
 *     depthFirstSearch(currentNode=4, parentNode=2, currentDistance=4):
 *       validPathCount = 4 % 2 === 0 ? 1 : 0 => 1
 *       No neighbors of 4 (excluding 2)
 *     Returns 1
 *     individualBranchCount = 1
 *     branchPathCounts = [1, 1, 1]
 *   accumulatedPairs = 0
 *   runningSumOfPreviousBranches = 0
 *   For currentBranchCounter = 1 (from branchCounts[0]):
 *     accumulatedPairs += 0 * 1 = 0
 *     runningSumOfPreviousBranches += 1 = 1
 *   For currentBranchCounter = 1 (from branchCounts[1]):
 *     accumulatedPairs += 1 * 1 = 1
 *     runningSumOfPreviousBranches += 1 = 2
 *   For currentBranchCounter = 1 (from branchCounts[2]):
 *     accumulatedPairs += 2 * 1 = 2
 *     runningSumOfPreviousBranches += 1 = 3
 *   returns 1 + 2 = 3
 * serverPairCounts = [0,0,3,0,0]
 *
 * serverIdx = 3: (centralServer = 3)
 *   branchPathCounts = []
 *   Direct child of 3: [2,2]
 *     depthFirstSearch(currentNode=2, parentNode=3, currentDistance=2):
 *       validPathCount = 2 % 2 === 0 ? 1 : 0 => 1
 *       Neighbors of 2 (excluding 3): [1,5], [4,4]
 *         depthFirstSearch(currentNode=1, parentNode=2, currentDistance=2+5=7):
 *           validPathCount = 7 % 2 === 0 ? 1 : 0 => 0
 *           Neighbors of 1 (excluding 2): [0,1]
 *             depthFirstSearch(currentNode=0, parentNode=1, currentDistance=7+1=8):
 *               validPathCount = 8 % 2 === 0 ? 1 : 0 => 1
 *           returns 1
 *         Returns 0 + 1 = 1
 *         depthFirstSearch(currentNode=4, parentNode=2, currentDistance=2+4=6):
 *           validPathCount = 6 % 2 === 0 ? 1 : 0 => 1
 *         returns 1
 *     Returns 1 + 1 + 1 = 3
 *     individualBranchCount = 3
 *     branchPathCounts = [3]
 *   accumulatedPairs = 0
 *   runningSumOfPreviousBranches = 0
 *   For currentBranchCounter = 3:
 *     accumulatedPairs += 0 * 3 = 0
 *     runningSumOfPreviousBranches += 3 = 3
 *   returns 0
 * serverPairCounts = [0,0,3,0,0]
 *
 * serverIdx = 4: (centralServer = 4)
 *   branchPathCounts = []
 *   Direct child of 4: [2,4]
 *     depthFirstSearch(currentNode=2, parentNode=4, currentDistance=4):
 *       validPathCount = 4 % 2 === 0 ? 1 : 0 => 1
 *       Neighbors of 2 (excluding 4): [1,5], [3,2]
 *         depthFirstSearch(currentNode=1, parentNode=2, currentDistance=4+5=9):
 *           validPathCount = 9 % 2 === 0 ? 1 : 0 => 0
 *           Neighbors of 1 (excluding 2): [0,1]
 *             depthFirstSearch(currentNode=0, parentNode=1, currentDistance=9+1=10):
 *               validPathCount = 10 % 2 === 0 ? 1 : 0 => 1
 *           returns 1
 *         Returns 0 + 1 = 1
 *         depthFirstSearch(currentNode=3, parentNode=2, currentDistance=4+2=6):
 *           validPathCount = 6 % 2 === 0 ? 1 : 0 => 1
 *         returns 1
 *     Returns 1 + 1 + 1 = 3
 *     individualBranchCount = 3
 *     branchPathCounts = [3]
 *   accumulatedPairs = 0
 *   runningSumOfPreviousBranches = 0
 *   For currentBranchCounter = 3:
 *     accumulatedPairs += 0 * 3 = 0
 *     runningSumOfPreviousBranches += 3 = 3
 *   returns 0
 * serverPairCounts = [0,0,3,0,0]
 *
 * Final result: [0,0,3,0,0]
 *
 * Time Complexity: O(N^2)
 * Space Complexity: O(N + E)
 */
var countPairsOfConnectableServers = function (edges, signalSpeed) {
  const totalServers = edges.length + 1;
  const adjacencyList = Array.from({ length: totalServers }, () => []);

  for (const [startNode, endNode, edgeWeight] of edges) {
    adjacencyList[startNode].push([endNode, edgeWeight]);
    adjacencyList[endNode].push([startNode, edgeWeight]);
  }

  const serverPairCounts = new Array(totalServers).fill(0);

  for (let serverIdx = 0; serverIdx < totalServers; serverIdx++) {
    function depthFirstSearch(currentNode, parentNode, currentDistance) {
      let validPathCount = currentDistance % signalSpeed === 0 ? 1 : 0;
      for (const [neighborNode, pathWeight] of adjacencyList[currentNode]) {
        if (neighborNode !== parentNode) {
          validPathCount += depthFirstSearch(
            neighborNode,
            currentNode,
            currentDistance + pathWeight
          );
        }
      }
      return validPathCount;
    }

    let accumulatedPairs = 0;
    const branchPathCounts = [];

    for (const [directChild, initialWeight] of adjacencyList[serverIdx]) {
      const individualBranchCount = depthFirstSearch(
        directChild,
        serverIdx,
        initialWeight
      );
      branchPathCounts.push(individualBranchCount);
    }

    let runningSumOfPreviousBranches = 0;
    for (const currentBranchCounter of branchPathCounts) {
      accumulatedPairs += runningSumOfPreviousBranches * currentBranchCounter;
      runningSumOfPreviousBranches += currentBranchCounter;
    }
    serverPairCounts[serverIdx] = accumulatedPairs;
  }

  return serverPairCounts;
};
