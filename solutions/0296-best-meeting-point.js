/**
 * Best Meeting Point
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
