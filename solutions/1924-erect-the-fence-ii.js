/**
 * Erect The Fence II
 * Time Complexity: O(N)
 * Space Complexity: O(N^2)
 */
var outerTrees = function (trees) {
  const totalInputCount = trees.length;

  if (totalInputCount === 1) {
    return [trees[0][0], trees[0][1], 0];
  }

  const pointsShuffled = [...trees];
  for (
    let currentLoopIndex = pointsShaled.length - 1;
    currentLoopIndex > 0;
    currentLoopIndex--
  ) {
    const randomSwapIndex = Math.floor(Math.random() * (currentLoopIndex + 1));
    const tempPointHolder = pointsShuffled[currentLoopIndex];
    pointsShuffled[currentLoopIndex] = pointsShuffled[randomSwapIndex];
    pointsShuffled[randomSwapIndex] = tempPointHolder;
  }

  const computeDistance = (coordinatePair1, coordinatePair2) => {
    const deltaCoordinateX = coordinatePair1[0] - coordinatePair2[0];
    const deltaCoordinateY = coordinatePair1[1] - coordinatePair2[1];
    const squaredMagnitude =
      deltaCoordinateX * deltaCoordinateX + deltaCoordinateY * deltaCoordinateY;
    return Math.sqrt(squaredMagnitude);
  };

  const formCircleFromTwoPoints = (pointPairOne, pointPairTwo) => {
    const midpointX = (pointPairOne[0] + pointPairTwo[0]) / 2;
    const midpointY = (pointPairOne[1] + pointPairTwo[1]) / 2;
    const computedRadius = computeDistance(pointPairOne, pointPairTwo) / 2;
    return [midpointX, midpointY, computedRadius];
  };

  const attemptCircleFromThreePoints = (
    pointTripleOne,
    pointTripleTwo,
    pointTripleThree,
  ) => {
    const [xVal1, yVal1] = pointTripleOne;
    const [xVal2, yVal2] = pointTripleTwo;
    const [xVal3, yVal3] = pointTripleThree;

    const determinantDivisor =
      2 *
      (xVal1 * (yVal2 - yVal3) +
        xVal2 * (yVal3 - yVal1) +
        xVal3 * (yVal1 - yVal2));

    if (Math.abs(determinantDivisor) < 1e-10) {
      return null;
    }

    const centerXValue =
      ((xVal1 * xVal1 + yVal1 * yVal1) * (yVal2 - yVal3) +
        (xVal2 * xVal2 + yVal2 * yVal2) * (yVal3 - yVal1) +
        (xVal3 * xVal3 + yVal3 * yVal3) * (yVal1 - yVal2)) /
      determinantDivisor;
    const centerYValue =
      ((xVal1 * xVal1 + yVal1 * yVal1) * (xVal3 - xVal2) +
        (xVal2 * xVal2 + yVal2 * yVal2) * (xVal1 - xVal3) +
        (xVal3 * xVal3 + yVal3 * yVal3) * (xVal2 - xVal1)) /
      determinantDivisor;
    const finalRadiusValue = computeDistance(
      [centerXValue, centerYValue],
      pointTripleOne,
    );

    return [centerXValue, centerYValue, finalRadiusValue];
  };

  const checkPointInsideCircle = (individualPoint, circleDefinition) => {
    const [circleCenterX, circleCenterY, circleBoundaryRadius] =
      circleDefinition;
    const distanceToCenter = computeDistance(individualPoint, [
      circleCenterX,
      circleCenterY,
    ]);
    return distanceToCenter <= circleBoundaryRadius + 1e-7;
  };

  const solveMinimumEnclosingCircle = (
    remainingPointSet,
    currentBoundarySet,
  ) => {
    const boundarySetSize = currentBoundarySet.length;
    const pointSetSize = remainingPointSet.length;

    if (boundarySetSize === 3 || pointSetSize === 0) {
      if (boundarySetSize === 0) {
        const defaultCircleX = 0;
        const defaultCircleY = 0;
        const defaultRadius = 0;
        return [defaultCircleX, defaultCircleY, defaultRadius];
      }
      if (boundarySetSize === 1) {
        const onePointX = currentBoundarySet[0][0];
        const onePointY = currentBoundarySet[0][1];
        const zeroRadius = 0;
        return [onePointX, onePointY, zeroRadius];
      }
      if (boundarySetSize === 2) {
        return formCircleFromTwoPoints(
          currentBoundarySet[0],
          currentBoundarySet[1],
        );
      }

      const firstBoundaryElement = currentBoundarySet[0];
      const secondBoundaryElement = currentBoundarySet[1];
      const thirdBoundaryElement = currentBoundarySet[2];

      const candidateCircleFromThree = attemptCircleFromThreePoints(
        firstBoundaryElement,
        secondBoundaryElement,
        thirdBoundaryElement,
      );
      if (candidateCircleFromThree) {
        return candidateCircleFromThree;
      }

      const twoPointCircleA = formCircleFromTwoPoints(
        firstBoundaryElement,
        secondBoundaryElement,
      );
      const twoPointCircleB = formCircleFromTwoPoints(
        firstBoundaryElement,
        thirdBoundaryElement,
      );
      const twoPointCircleC = formCircleFromTwoPoints(
        secondBoundaryElement,
        thirdBoundaryElement,
      );

      const isThirdEnclosedByOneTwo = checkPointInsideCircle(
        thirdBoundaryElement,
        twoPointCircleA,
      );
      if (isThirdEnclosedByOneTwo) {
        return twoPointCircleA;
      }

      const isSecondEnclosedByOneThree = checkPointInsideCircle(
        secondBoundaryElement,
        twoPointCircleB,
      );
      if (isSecondEnclosedByOneThree) {
        return twoPointCircleB;
      }

      return twoPointCircleC;
    }

    const processedPoint = remainingPointSet[0];
    const slicedPointsArray = remainingPointSet.slice(1);

    const recursedCircleA = solveMinimumEnclosingCircle(
      slicedPointsArray,
      currentBoundarySet,
    );
    const isPointEnclosed = checkPointInsideCircle(
      processedPoint,
      recursedCircleA,
    );
    if (isPointEnclosed) {
      return recursedCircleA;
    }

    const extendedBoundarySet = currentBoundarySet.concat([processedPoint]);
    const recursedCircleB = solveMinimumEnclosingCircle(
      slicedPointsArray,
      extendedBoundarySet,
    );
    return recursedCircleB;
  };

  const finalResultCircle = solveMinimumEnclosingCircle(pointsShuffled, []);
  return finalResultCircle;
};
