/**
 * Minimum Cost To Reach Destination In Time
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
    (elementA, elementB) => elementA.pathCost - elementB.pathCost,
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
      minimumPathCosts[totalCities - 1][finalTimeIterator],
    );
  }

  return overallMinimumCost === Infinity ? -1 : overallMinimumCost;
};
