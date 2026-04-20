/**
 * Largest Triangle Area
 * Time Complexity: O(N^3)
 * Space Complexity: O(1)
 */
var largestTriangleArea = function (points) {
  let greatestAreaValue = 0;

  const totalPointsCount = points.length;

  for (
    let firstPointIteration = 0;
    firstPointIteration < totalPointsCount;
    firstPointIteration++
  ) {
    for (
      let secondPointIteration = firstPointIteration + 1;
      secondPointIteration < totalPointsCount;
      secondPointIteration++
    ) {
      for (
        let thirdPointIteration = secondPointIteration + 1;
        thirdPointIteration < totalPointsCount;
        thirdPointIteration++
      ) {
        const pointCoordinateA = points[firstPointIteration];
        const pointCoordinateB = points[secondPointIteration];
        const pointCoordinateC = points[thirdPointIteration];

        const currentTriangleArea = calculateGeometryArea(
          pointCoordinateA,
          pointCoordinateB,
          pointCoordinateC,
        );
        greatestAreaValue = Math.max(greatestAreaValue, currentTriangleArea);
      }
    }
  }

  return greatestAreaValue;
};

function calculateGeometryArea(firstVertex, secondVertex, thirdVertex) {
  const firstCoordX = firstVertex[0];
  const firstCoordY = firstVertex[1];

  const secondCoordX = secondVertex[0];
  const secondCoordY = secondVertex[1];

  const thirdCoordX = thirdVertex[0];
  const thirdCoordY = thirdVertex[1];

  const determinantResult =
    firstCoordX * (secondCoordY - thirdCoordY) +
    secondCoordX * (thirdCoordY - firstCoordY) +
    thirdCoordX * (firstCoordY - secondCoordY);

  return Math.abs(determinantResult / 2);
}
