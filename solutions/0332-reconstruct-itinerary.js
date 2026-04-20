/**
 * Reconstruct Itinerary
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
        while (flightAdjacency.has(currentNode) && flightAdjacency.get(currentNode).length > 0) {
            const nextDestination = flightAdjacency.get(currentNode).pop();
            depthFirstSearch(nextDestination);
        }
        tourPath.push(currentNode);
    };

    depthFirstSearch('JFK');

    return tourPath.reverse();
};