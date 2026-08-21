/**
 * Minimum Cost To Reach Destination In Time
 * Intuition: Cost is the sum of city passing fees along a path, but total travel time must stay `≤ maxTime`. State `(city, time)` is needed because a cheaper path may take longer; Dijkstra on fee, tracking the best fee for each `(city, time)`, finds the minimum fee to city `n-1`.
 * Approach: 1. Build undirected adjacency with travel times. 2. `minimumPathCosts[city][t]` starts at Infinity except city 0 at t=0 equals `fees[0]`. 3. Priority-queue Dijkstra: skip stale states; relax neighbors if `t + edge ≤ maxTime` and the new fee is better. 4. Return the min fee over all times at the last city, or -1.
 * Dry Run: maxTime=30, edges 0-1 (10), 1-2 (10), 0-2 (25); fees=[5,1,1].
 *   - Start (cost=5, city=0, t=0)
 *   - Via 1: t=10 cost=6, then city 2 t=20 cost=7
 *   - Direct 0→2 t=25 cost=6. Min at city 2 is 6.
 * Time Complexity: O(E * maxTime * log(n * maxTime))
 * Space Complexity: O(n * maxTime + E)
 */
var minCost = function (maximumAllowedTime, roadConnections, cityVisitFees) {
  const totalCities = cityVisitFees.length;
  const minimumPathCosts = new Array(totalCities)
    .fill(null)
    .map(() => new Array(maximumAllowedTime + 1).fill(Infinity));
  minimumPathCosts[0][0] = cityVisitFees[0];

  const cityAdjacency = new Array(totalCities).fill(null).map(() => []);
  for (let edgeIndex = 0; edgeIndex < roadConnections.length; ++edgeIndex) {
    const roadSegment = roadConnections[edgeIndex];
    const firstCityIdentifier = roadSegment[0];
    const secondCityIdentifier = roadSegment[1];
    const travelDuration = roadSegment[2];

    cityAdjacency[firstCityIdentifier].push([
      secondCityIdentifier,
      travelDuration,
    ]);
    cityAdjacency[secondCityIdentifier].push([
      firstCityIdentifier,
      travelDuration,
    ]);
  }

  const travelPriorityQueue = new PriorityQueue(
    (elementA, elementB) => elementA.pathCost - elementB.pathCost
  );
  travelPriorityQueue.enqueue({
    pathCost: cityVisitFees[0],
    cityIndex: 0,
    journeyTime: 0,
  });

  while (!travelPriorityQueue.isEmpty()) {
    const { pathCost, cityIndex, journeyTime } = travelPriorityQueue.dequeue();

    if (pathCost > minimumPathCosts[cityIndex][journeyTime]) {
      continue;
    }

    for (
      let neighborIndex = 0;
      neighborIndex < cityAdjacency[cityIndex].length;
      ++neighborIndex
    ) {
      const neighborInformation = cityAdjacency[cityIndex][neighborIndex];
      const nextCityIdentifier = neighborInformation[0];
      const segmentTravelTime = neighborInformation[1];

      const potentialJourneyTime = journeyTime + segmentTravelTime;
      if (potentialJourneyTime > maximumAllowedTime) {
        continue;
      }

      const calculatedJourneyCost =
        pathCost + cityVisitFees[nextCityIdentifier];
      if (
        calculatedJourneyCost <
        minimumPathCosts[nextCityIdentifier][potentialJourneyTime]
      ) {
        minimumPathCosts[nextCityIdentifier][potentialJourneyTime] =
          calculatedJourneyCost;
        travelPriorityQueue.enqueue({
          pathCost: calculatedJourneyCost,
          cityIndex: nextCityIdentifier,
          journeyTime: potentialJourneyTime,
        });
      }
    }
  }

  let overallMinimumCost = Infinity;
  for (
    let finalTimeIterator = 0;
    finalTimeIterator <= maximumAllowedTime;
    ++finalTimeIterator
  ) {
    overallMinimumCost = Math.min(
      overallMinimumCost,
      minimumPathCosts[totalCities - 1][finalTimeIterator]
    );
  }

  return overallMinimumCost === Infinity ? -1 : overallMinimumCost;
};
