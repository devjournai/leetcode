/**
 * Most Visited Sector In A Circular Track
 * Intuition: Count visits on each open interval of rounds (exclude the segment end until the final destination is counted once).
 * Approach: 1. For each consecutive pair, walk start→end-1 on the circle incrementing counts. 2. Increment the last sector. 3. Collect sectors with max count.
 * Dry Run: n = 4, rounds = [1,3,1,2].
 *   - Most visited sectors [1,2].
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
        sectorVisitsArray[currentPathSector]
      );

      currentPathSector = currentPathSector === n ? 1 : currentPathSector + 1;
    }
  }

  const finalDestinationSector = rounds[rounds.length - 1];
  sectorVisitsArray[finalDestinationSector]++;
  maxVisitsAchieved = Math.max(
    maxVisitsAchieved,
    sectorVisitsArray[finalDestinationSector]
  );

  const mostVisitedList = [];
  for (let sectorId = 1; sectorId <= n; sectorId++) {
    if (sectorVisitsArray[sectorId] === maxVisitsAchieved) {
      mostVisitedList.push(sectorId);
    }
  }

  return mostVisitedList;
};
