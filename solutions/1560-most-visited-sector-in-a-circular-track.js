/**
 * Most Visited Sector In A Circular Track
 * Time Complexity: O(M * N)
 * Space Complexity: O(N)
 */
var mostVisited = function (n, rounds) {
  const sectorVisitsArray = new Array(n + 1).fill(0);
  let maxVisitsAchieved = 0;

  for (
    let segmentIterator = 0;
    segmentIterator < rounds.length - 1;
    segmentIterator++
  ) {
    let segmentStart = rounds[segmentIterator];
    const segmentEnd = rounds[segmentIterator + 1];
    let currentPathSector = segmentStart;

    for (let stepIncrement = 0; ; stepIncrement++) {
      if (currentPathSector === segmentEnd) {
        break;
      }

      sectorVisitsArray[currentPathSector]++;
      maxVisitsAchieved = Math.max(
        maxVisitsAchieved,
        sectorVisitsArray[currentPathSector],
      );

      currentPathSector = currentPathSector === n ? 1 : currentPathSector + 1;
    }
  }

  const finalDestinationSector = rounds[rounds.length - 1];
  sectorVisitsArray[finalDestinationSector]++;
  maxVisitsAchieved = Math.max(
    maxVisitsAchieved,
    sectorVisitsArray[finalDestinationSector],
  );

  const mostVisitedList = [];
  for (let sectorId = 1; sectorId <= n; sectorId++) {
    if (sectorVisitsArray[sectorId] === maxVisitsAchieved) {
      mostVisitedList.push(sectorId);
    }
  }

  return mostVisitedList;
};
