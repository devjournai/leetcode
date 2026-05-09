/**
 * Describe The Painting
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
