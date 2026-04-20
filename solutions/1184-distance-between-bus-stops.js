/**
 * Distance Between Bus Stops
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var distanceBetweenBusStops = function(distance, start, destination) {
    let lowerBound = Math.min(start, destination);
    let upperBound = Math.max(start, destination);

    let forwardPathDistance = 0;
    let pathIndex = lowerBound;
    while (pathIndex < upperBound) {
        forwardPathDistance += distance[pathIndex];
        pathIndex++;
    }

    let totalRouteDistance = 0;
    for (let routeIndex = 0; routeIndex < distance.length; routeIndex++) {
        totalRouteDistance += distance[routeIndex];
    }

    let backwardPathDistance = totalRouteDistance - forwardPathDistance;

    let minimumRequiredDistance = Math.min(forwardPathDistance, backwardPathDistance);

    return minimumRequiredDistance;
};