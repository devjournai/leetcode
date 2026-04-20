/**
 * Maximum Number Of Darts Inside Of A Circular Dartboard
 * Time Complexity: O(N^3)
 * Space Complexity: O(1)
 */
var numPoints = function (darts, r) {
  const numberOfDarts = darts.length;
  if (numberOfDarts === 0) {
    return 0;
  }

  let maximumDarts = 1;
  const radiusSquare = r * r;

  const checkDartsInCircle = (
    allDarts,
    centerXCoordinate,
    centerYCoordinate,
    circleRadius,
  ) => {
    let dartsWithinCount = 0;
    const circleRadiusSquared = circleRadius * circleRadius;

    for (const currentDart of allDarts) {
      const distanceXOffset = currentDart[0] - centerXCoordinate;
      const distanceYOffset = currentDart[1] - centerYCoordinate;
      if (
        distanceXOffset * distanceXOffset + distanceYOffset * distanceYOffset <=
        circleRadiusSquared + 1e-8
      ) {
        dartsWithinCount++;
      }
    }
    return dartsWithinCount;
  };

  for (
    let firstDartIndex = 0;
    firstDartIndex < numberOfDarts;
    firstDartIndex++
  ) {
    for (
      let secondDartIndex = firstDartIndex + 1;
      secondDartIndex < numberOfDarts;
      secondDartIndex++
    ) {
      const dartOnePosition = darts[firstDartIndex];
      const dartTwoPosition = darts[secondDartIndex];

      const deltaXCoord = dartTwoPosition[0] - dartOnePosition[0];
      const deltaYCoord = dartTwoPosition[1] - dartOnePosition[1];
      const distanceBetweenSquared =
        deltaXCoord * deltaXCoord + deltaYCoord * deltaYCoord;

      if (distanceBetweenSquared > 4 * radiusSquare + 1e-8) {
        continue;
      }

      const middleXCoord = (dartOnePosition[0] + dartTwoPosition[0]) / 2;
      const middleYCoord = (dartOnePosition[1] + dartTwoPosition[1]) / 2;

      if (distanceBetweenSquared < 1e-8) {
        continue;
      }

      const halfChordDistance = Math.sqrt(distanceBetweenSquared) / 2;
      const centerOffsetHeight = Math.sqrt(
        radiusSquare - halfChordDistance * halfChordDistance,
      );

      let perpendicularVectorX = -deltaYCoord;
      let perpendicularVectorY = deltaXCoord;
      const normalizingFactor = Math.sqrt(
        perpendicularVectorX * perpendicularVectorX +
          perpendicularVectorY * perpendicularVectorY,
      );

      perpendicularVectorX /= normalizingFactor;
      perpendicularVectorY /= normalizingFactor;

      const centerOneX =
        middleXCoord + centerOffsetHeight * perpendicularVectorX;
      const centerOneY =
        middleYCoord + centerOffsetHeight * perpendicularVectorY;
      const centerTwoX =
        middleXCoord - centerOffsetHeight * perpendicularVectorX;
      const centerTwoY =
        middleYCoord - centerOffsetHeight * perpendicularVectorY;

      const dartCountOne = checkDartsInCircle(darts, centerOneX, centerOneY, r);
      const dartCountTwo = checkDartsInCircle(darts, centerTwoX, centerTwoY, r);

      maximumDarts = Math.max(maximumDarts, dartCountOne, dartCountTwo);
    }
  }

  return maximumDarts;
};
