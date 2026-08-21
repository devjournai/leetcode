/**
 * Bus Routes
 * Intuition: BFS on stops; taking a bus once visits all its stops at cost +1. Never ride the same route twice.
 * Approach: 1. Same start/end → 0. 2. Map stop → route ids. 3. Missing start or end → -1. 4. Queue `[stop, buses]`; for unseen routes, if a stop is target return buses+1 else enqueue unvisited stops.
 * Dry Run: routes = [[1,2,7],[3,6,7]], source 1, target 6. Ride first bus to 7 then second to 6 → 2.
 * Time Complexity: O(S_total + R)
 * Space Complexity: O(S_total + R)
 */
var numBusesToDestination = function (inputRoutes, startStop, endStop) {
  if (startStop === endStop) return 0;

  const stopToRouteConnections = new Map();

  let routeLoopIndex = 0;
  while (routeLoopIndex < inputRoutes.length) {
    const currentRouteStops = inputRoutes[routeLoopIndex];
    let stopInRouteIndex = 0;
    while (stopInRouteIndex < currentRouteStops.length) {
      const currentStationValue = currentRouteStops[stopInRouteIndex];
      if (!stopToRouteConnections.has(currentStationValue)) {
        stopToRouteConnections.set(currentStationValue, []);
      }
      stopToRouteConnections.get(currentStationValue).push(routeLoopIndex);
      stopInRouteIndex++;
    }
    routeLoopIndex++;
  }

  if (
    !stopToRouteConnections.has(startStop) ||
    !stopToRouteConnections.has(endStop)
  ) {
    return -1;
  }

  const seenRouteIdentifiers = new Set();
  const visitedBusStops = new Set([startStop]);
  const bfsQueue = [[startStop, 0]];

  while (bfsQueue.length > 0) {
    const [currentDequeuedStop, busesTakenCount] = bfsQueue.shift();

    if (currentDequeuedStop === endStop) {
      return busesTakenCount;
    }

    const busesFromThisStop = stopToRouteConnections.get(currentDequeuedStop);

    let busIterIndex = 0;
    for (
      busIterIndex = 0;
      busIterIndex < busesFromThisStop.length;
      busIterIndex++
    ) {
      const busIdConsidered = busesFromThisStop[busIterIndex];

      if (seenRouteIdentifiers.has(busIdConsidered)) {
        continue;
      }
      seenRouteIdentifiers.add(busIdConsidered);

      const stopsOnConsideredBus = inputRoutes[busIdConsidered];
      let stopIterIndex = 0;
      for (
        stopIterIndex = 0;
        stopIterIndex < stopsOnConsideredBus.length;
        stopIterIndex++
      ) {
        const nextStationCandidate = stopsOnConsideredBus[stopIterIndex];

        if (nextStationCandidate === endStop) {
          return busesTakenCount + 1;
        }

        if (visitedBusStops.has(nextStationCandidate)) {
          continue;
        }
        visitedBusStops.add(nextStationCandidate);
        bfsQueue.push([nextStationCandidate, busesTakenCount + 1]);
      }
    }
  }

  return -1;
};
