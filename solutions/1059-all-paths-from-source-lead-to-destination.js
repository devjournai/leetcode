/**
 * All Paths From Source Lead To Destination
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
