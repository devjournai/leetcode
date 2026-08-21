/**
 * Describe The Painting
 * Intuition: Overlapping color segments mix by summing color ids. Sweep line: +color at starts and -color at ends; between consecutive event x-coordinates the mix is constant, so emit a segment whenever that mix is positive.
 * Approach: 1. For each `[start,end,color]` push `[start,+color]` and `[end,-color]`. 2. Sort by position, then by color delta. 3. Walk events: if mix > 0 and x advanced, push `[lastX, x, mix]`. Apply the delta and update `lastX`. 4. Return the list.
 * Dry Run: segments = [[1,4,5],[4,7,7],[1,7,9]].
 *   - Events: (1,+5),(1,+9),(4,-5),(4,+7),(7,-7),(7,-9)
 *   - [1,4] mix 14; [4,7] mix 16. Return those two mixed segments.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var splitPainting = function (paintingSegments) {
  const coordinateEvents = [];

  for (const currentSegment of paintingSegments) {
    const segmentStartPoint = currentSegment[0];
    const segmentEndPoint = currentSegment[1];
    const segmentColorValue = currentSegment[2];

    coordinateEvents.push([segmentStartPoint, segmentColorValue]);
    coordinateEvents.push([segmentEndPoint, -segmentColorValue]);
  }

  coordinateEvents.sort((eventA, eventB) => {
    const positionA = eventA[0];
    const positionB = eventB[0];
    const colorEffectA = eventA[1];
    const colorEffectB = eventB[1];

    if (positionA !== positionB) {
      return positionA - positionB;
    }
    return colorEffectA - colorEffectB;
  });

  const finalPaintingStructure = [];
  let currentTotalColor = 0;
  let lastProcessedCoordinate = coordinateEvents[0][0];

  let eventIndexIterator = 0;
  const totalEventPoints = coordinateEvents.length;

  while (eventIndexIterator < totalEventPoints) {
    const currentEventItem = coordinateEvents[eventIndexIterator];
    const eventPointLocation = currentEventItem[0];
    const eventColorModifier = currentEventItem[1];

    if (currentTotalColor > 0 && eventPointLocation > lastProcessedCoordinate) {
      finalPaintingStructure.push([
        lastProcessedCoordinate,
        eventPointLocation,
        currentTotalColor,
      ]);
    }

    currentTotalColor += eventColorModifier;
    lastProcessedCoordinate = eventPointLocation;

    eventIndexIterator++;
  }

  return finalPaintingStructure;
};
