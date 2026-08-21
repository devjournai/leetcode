/**
 * Best Meeting Point
 * Intuition: Manhattan distance separates into x and y. The min total 1D distance is the sum of (right - left) while pairing sorted coordinates from both ends (equivalent to meeting at the median).
 * Approach: 1. Collect row and col of every 1. 2. Sort both arrays. 3. Two-pointer: while start < end, add coords[end]-coords[start] and move inward, for x then y. 4. Return the two sums.
 * Dry Run: grid homes at (0,0), (0,4), (2,2).
 *   - x sorted [0,0,2] → 2-0=2. y sorted [0,2,4] → 4-0=4.
 *   - Return 6.
 * Time Complexity: O(R * C + k log k)
 * Space Complexity: O(k)
 */
var minTotalDistance = function (grid) {
  const gridRowsCount = grid.length;
  const gridColsCount = grid[0].length;

  const xCoordsContainer = [];
  const yCoordsContainer = [];

  for (let rowIndexIter = 0; rowIndexIter < gridRowsCount; rowIndexIter++) {
    for (let colIndexIter = 0; colIndexIter < gridColsCount; colIndexIter++) {
      if (grid[rowIndexIter][colIndexIter] === 1) {
        xCoordsContainer.push(rowIndexIter);
        yCoordsContainer.push(colIndexIter);
      }
    }
  }

  xCoordsContainer.sort((coordA, coordB) => coordA - coordB);
  yCoordsContainer.sort((coordC, coordD) => coordC - coordD);

  let totalXDistance = 0;
  let startPointerX = 0;
  let endPointerX = xCoordsContainer.length - 1;

  while (startPointerX < endPointerX) {
    totalXDistance +=
      xCoordsContainer[endPointerX] - xCoordsContainer[startPointerX];
    startPointerX++;
    endPointerX--;
  }

  let totalYDistance = 0;
  let startPointerY = 0;
  let endPointerY = yCoordsContainer.length - 1;

  while (startPointerY < endPointerY) {
    totalYDistance +=
      yCoordsContainer[endPointerY] - yCoordsContainer[startPointerY];
    startPointerY++;
    endPointerY--;
  }

  return totalXDistance + totalYDistance;
};
