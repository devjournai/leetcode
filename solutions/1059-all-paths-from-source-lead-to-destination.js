/**
 * All Paths From Source Lead To Destination
 * Intuition: Every path from source must end at destination with no cycles. 3-color DFS: visiting (1) detects cycles; done (2) is memoized success; a node with no outgoing edges must be destination.
 * Approach: 1. Build adjacency lists. 2. DFS: if state is 1 return false; if 2 return true. 3. Mark visiting; if no neighbors, success iff node==destination. 4. All neighbors must succeed; then mark done.
 * Dry Run: n=3, edges=[[0,1],[0,2]], source=0, destination=2.
 *   - From 0, neighbor 1 is a dead end that is not dest -> false.
 * Time Complexity: O(N + E)
 * Space Complexity: O(N + E)
 */
var leadsToDestination = function (n, edges, source, destination) {
  const adjacencyList = new Map();
  const visitStates = new Array(n).fill(0);

  for (const [originNode, targetNode] of edges) {
    if (!adjacencyList.has(originNode)) {
      adjacencyList.set(originNode, []);
    }
    adjacencyList.get(originNode).push(targetNode);
  }

  return explorePath(source);

  function explorePath(currentNodeIdentifier) {
    if (visitStates[currentNodeIdentifier] === 1) {
      return false;
    }
    if (visitStates[currentNodeIdentifier] === 2) {
      return true;
    }

    visitStates[currentNodeIdentifier] = 1;

    const outgoingNeighbors = adjacencyList.get(currentNodeIdentifier);

    if (!outgoingNeighbors || outgoingNeighbors.length === 0) {
      const reachedTerminalDestination = currentNodeIdentifier === destination;
      visitStates[currentNodeIdentifier] = 2;
      return reachedTerminalDestination;
    }

    for (const neighborNodeIdentifier of outgoingNeighbors) {
      if (!explorePath(neighborNodeIdentifier)) {
        return false;
      }
    }

    visitStates[currentNodeIdentifier] = 2;
    return true;
  }
};
