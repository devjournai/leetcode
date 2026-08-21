/**
 * Minimum Area Rectangle II
 * Intuition: A rectangle has a right angle at A: vectors AB and AC are orthogonal, and D = B + (C−A) must exist. Area is |AB| * |AC|.
 * Approach: 1. Put points in `existingPointsSet`. 2. Triple-loop first/second/third points. 3. Skip if dot product of the two vectors from first is nonzero. 4. If the fourth vertex is in the set and area > 1e-9, track `minRectangleArea`. 5. Return 0 if none.
 * Dry Run: points = [[1,2],[2,1],[1,0],[0,1]]. From (1,2) to (2,1)=(1,-1) and to (0,1)=(-1,-1), dot 0. Fourth (1,0) exists. Area √2 * √2 = 2.
 * Time Complexity: O(N^3)
 * Space Complexity: O(N)
 */
var minAreaFreeRect = function (points) {
  const allPointsArray = points;
  const totalPointsCount = allPointsArray.length;

  const existingPointsSet = new Set();
  for (
    let currentPointSetIndex = 0;
    currentPointSetIndex < totalPointsCount;
    currentPointSetIndex++
  ) {
    const currentPointSetElement = allPointsArray[currentPointSetIndex];
    existingPointsSet.add(
      `${currentPointSetElement[0]},${currentPointSetElement[1]}`
    );
  }

  let minRectangleArea = Infinity;

  let firstPointIterator = 0;
  while (firstPointIterator < totalPointsCount) {
    const firstPoint = allPointsArray[firstPointIterator];
    const firstPointXCoordinate = firstPoint[0];
    const firstPointYCoordinate = firstPoint[1];

    let secondPointIterator = firstPointIterator + 1;
    while (secondPointIterator < totalPointsCount) {
      const secondPoint = allPointsArray[secondPointIterator];
      const secondPointXCoordinate = secondPoint[0];
      const secondPointYCoordinate = secondPoint[1];

      const vecOneDx = secondPointXCoordinate - firstPointXCoordinate;
      const vecOneDy = secondPointYCoordinate - firstPointYCoordinate;

      for (
        let thirdPointIterator = 0;
        thirdPointIterator < totalPointsCount;
        thirdPointIterator++
      ) {
        if (
          thirdPointIterator === firstPointIterator ||
          thirdPointIterator === secondPointIterator
        ) {
          continue;
        }

        const thirdPoint = allPointsArray[thirdPointIterator];
        const thirdPointXCoordinate = thirdPoint[0];
        const thirdPointYCoordinate = thirdPoint[1];

        const vecTwoDx = thirdPointXCoordinate - firstPointXCoordinate;
        const vecTwoDy = thirdPointYCoordinate - firstPointYCoordinate;

        if (vecOneDx * vecTwoDx + vecOneDy * vecTwoDy !== 0) {
          continue;
        }

        const anticipatedFourthPointX = secondPointXCoordinate + vecTwoDx;
        const anticipatedFourthPointY = secondPointYCoordinate + vecTwoDy;

        if (
          existingPointsSet.has(
            `${anticipatedFourthPointX},${anticipatedFourthPointY}`
          )
        ) {
          const lengthOneSquared = vecOneDx * vecOneDx + vecOneDy * vecOneDy;
          const lengthTwoSquared = vecTwoDx * vecTwoDx + vecTwoDy * vecTwoDy;

          const computedArea =
            Math.sqrt(lengthOneSquared) * Math.sqrt(lengthTwoSquared);

          if (computedArea < 1e-9) {
            continue;
          }

          if (minRectangleArea === Infinity) {
            minRectangleArea = computedArea;
          } else {
            minRectangleArea = Math.min(minRectangleArea, computedArea);
          }
        }
      }
      secondPointIterator++;
    }
    firstPointIterator++;
  }

  return minRectangleArea === Infinity ? 0 : minRectangleArea;
};
