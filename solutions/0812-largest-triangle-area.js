/**
 * Largest Triangle Area
 * Intuition: The largest triangle is among all triples; area is half the absolute shoelace determinant.
 * Approach: 1. Triple-loop i < j < k. 2. `calculateGeometryArea` returns `|x1(y2-y3)+x2(y3-y1)+x3(y1-y2)|/2`. 3. Track the max.
 * Dry Run: [[0,0],[0,1],[1,0],[0,2],[2,0]]. Triple (0,0),(0,2),(2,0) area 2.
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
          pointCoordinateC
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
