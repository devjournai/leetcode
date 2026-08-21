/**
 * Distance Between Bus Stops
 * Intuition: The circular route has two arcs between start and destination; the answer is the shorter one.
 * Approach: 1. Order the two stops. 2. Sum distance along the clockwise arc between them. 3. Subtract from the full loop for the other arc and return the min.
 * Dry Run: distance = [1,2,3,4], start=0, destination=2. Forward 1+2=3, total=10, backward=7 → min 3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var distanceBetweenBusStops = function (distance, start, destination) {
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

  let minimumRequiredDistance = Math.min(
    forwardPathDistance,
    backwardPathDistance
  );

  return minimumRequiredDistance;
};
