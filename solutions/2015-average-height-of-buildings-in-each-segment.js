/**
 * Average Height Of Buildings In Each Segment
 * Intuition: The average height of buildings changes only at the start or end points of buildings. We can use a line sweep approach to track the total height and number of active buildings as we move along the street.
 * Approach: 1. Generate events for each building's start and end points, including height changes and active building count changes. 2. Sort these events by coordinate, with a tie-breaking rule to process end events before start events at the same coordinate. 3. Iterate through the sorted events, maintaining a running sum of active building heights and their count. Between distinct event coordinates, if there are active buildings, a segment of constant average height exists. 4. Calculate the average height for this segment and add it to the result list, merging with the previous segment if their average heights are identical and they are contiguous.
 * Dry Run: buildings = [[1,5,2],[3,10,4]]
 * 1. Event Generation:
 *    From [1,5,2]: push [1, 2, 1] (start), [5, -2, -1] (end)
 *    From [3,10,4]: push [3, 4, 1] (start), [10, -4, -1] (end)
 *    eventPoints = [[1, 2, 1], [5, -2, -1], [3, 4, 1], [10, -4, -1]]
 * 2. Event Sorting:
 *    Sorted by coordinate, then by delta (negative before positive for tie-breaking):
 *    eventPoints = [[1, 2, 1], [3, 4, 1], [5, -2, -1], [10, -4, -1]]
 * 3. Line Sweep Processing:
 *    finalSegments = [], currentHeightSum = 0, currentBuildingCount = 0, lastProcessedCoordinate = -1
 *
 *    - Process event [1, 2, 1]:
 *      - currentBuildingCount (0) is not > 0. No segment formed.
 *      - currentHeightSum = 0 + 2 = 2
 *      - currentBuildingCount = 0 + 1 = 1
 *      - lastProcessedCoordinate = 1
 *
 *    - Process event [3, 4, 1]:
 *      - currentBuildingCount (1) > 0 AND 3 > lastProcessedCoordinate (1). Form segment:
 *        - averageSegmentHeight = floor(2 / 1) = 2
 *        - finalSegments is empty. Add [1, 3, 2]. finalSegments = [[1, 3, 2]]
 *      - currentHeightSum = 2 + 4 = 6
 *      - currentBuildingCount = 1 + 1 = 2
 *      - lastProcessedCoordinate = 3
 *
 *    - Process event [5, -2, -1]:
 *      - currentBuildingCount (2) > 0 AND 5 > lastProcessedCoordinate (3). Form segment:
 *        - averageSegmentHeight = floor(6 / 2) = 3
 *        - Last segment in finalSegments is [1, 3, 2]. Its end (3) === lastProcessedCoordinate (3). But its average (2) !== averageSegmentHeight (3). No merge.
 *        - Add [3, 5, 3]. finalSegments = [[1, 3, 2], [3, 5, 3]]
 *      - currentHeightSum = 6 + (-2) = 4
 *      - currentBuildingCount = 2 + (-1) = 1
 *      - lastProcessedCoordinate = 5
 *
 *    - Process event [10, -4, -1]:
 *      - currentBuildingCount (1) > 0 AND 10 > lastProcessedCoordinate (5). Form segment:
 *        - averageSegmentHeight = floor(4 / 1) = 4
 *        - Last segment in finalSegments is [3, 5, 3]. Its end (5) === lastProcessedCoordinate (5). But its average (3) !== averageSegmentHeight (4). No merge.
 *        - Add [5, 10, 4]. finalSegments = [[1, 3, 2], [3, 5, 3], [5, 10, 4]]
 *      - currentHeightSum = 4 + (-4) = 0
 *      - currentBuildingCount = 1 + (-1) = 0
 *      - lastProcessedCoordinate = 10
 *
 * 4. Return: [[1, 3, 2], [3, 5, 3], [5, 10, 4]]
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var averageHeightOfBuildings = function (buildings) {
  const eventPoints = [];

  for (const [buildingStart, buildingEnd, buildingHeightValue] of buildings) {
    eventPoints.push([buildingStart, buildingHeightValue, 1]);
    eventPoints.push([buildingEnd, -buildingHeightValue, -1]);
  }

  eventPoints.sort((eventA, eventB) => {
    if (eventA[0] !== eventB[0]) {
      return eventA[0] - eventB[0];
    }
    return eventA[2] - eventB[2];
  });

  const finalSegments = [];
  let cumulativeHeight = 0;
  let activeBuildingCount = 0;
  let lastProcessedCoordinate = -1;

  for (const [currentCoord, heightChange, countChange] of eventPoints) {
    if (activeBuildingCount > 0 && currentCoord > lastProcessedCoordinate) {
      const averageSegmentHeight = Math.floor(
        cumulativeHeight / activeBuildingCount,
      );

      const lastOutputIndex = finalSegments.length - 1;
      if (lastOutputIndex >= 0) {
        const existingSegment = finalSegments[lastOutputIndex];
        if (
          existingSegment[1] === lastProcessedCoordinate &&
          existingSegment[2] === averageSegmentHeight
        ) {
          existingSegment[1] = currentCoord;
        } else {
          finalSegments.push([
            lastProcessedCoordinate,
            currentCoord,
            averageSegmentHeight,
          ]);
        }
      } else {
        finalSegments.push([
          lastProcessedCoordinate,
          currentCoord,
          averageSegmentHeight,
        ]);
      }
    }

    cumulativeHeight += heightChange;
    activeBuildingCount += countChange;
    lastProcessedCoordinate = currentCoord;
  }

  return finalSegments;
};
