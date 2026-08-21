/**
 * Reconstruct Itinerary
 * Intuition: Tickets form a directed multigraph. Hierholzer's algorithm from JFK uses every edge once; sorting destinations descending so pop() yields the lexicographically smallest next airport.
 * Approach: 1. Build adjacency lists from tickets. 2. Sort each destination list with localeCompare reversed. 3. DFS: while the airport still has unused tickets, pop the last dest and recurse; then push the airport (postorder). 4. Reverse tourPath and return it.
 * Dry Run: tickets = [["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]].
 *   - DFS JFK → MUC → LHR → SFO → SJC, pushing on the way back.
 *   - Reverse → ["JFK", "MUC", "LHR", "SFO", "SJC"].
 * Time Complexity: O(E log E)
 * Space Complexity: O(V + E)
 */
var findItinerary = function (tickets) {
  const flightAdjacency = new Map();
  const tourPath = [];

  for (const [departurePoint, arrivalPoint] of tickets) {
    if (!flightAdjacency.has(departurePoint)) {
      flightAdjacency.set(departurePoint, []);
    }
    flightAdjacency.get(departurePoint).push(arrivalPoint);
  }

  for (const airportDests of flightAdjacency.values()) {
    airportDests.sort((airportX, airportY) => airportY.localeCompare(airportX));
  }

  const depthFirstSearch = (currentNode) => {
    while (
      flightAdjacency.has(currentNode) &&
      flightAdjacency.get(currentNode).length > 0
    ) {
      const nextDestination = flightAdjacency.get(currentNode).pop();
      depthFirstSearch(nextDestination);
    }
    tourPath.push(currentNode);
  };

  depthFirstSearch("JFK");

  return tourPath.reverse();
};
