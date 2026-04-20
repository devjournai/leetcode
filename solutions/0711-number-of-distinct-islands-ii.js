/**
 * Number Of Distinct Islands II
 * Time Complexity: O(R * C * log(R * C))
 * Space Complexity: O(R * C)
 */
var numDistinctIslands2 = function (grid) {
  const gridDimensionR = grid.length;
  const gridDimensionC = grid[0].length;
  const visitedState = Array.from({ length: gridDimensionR }, () =>
    new Array(gridDimensionC).fill(false),
  );
  const uniqueIslandRepresentations = new Set();

  const transformations = [
    (rParam, cParam) => [rParam, cParam],
    (rParam, cParam) => [rParam, -cParam],
    (rParam, cParam) => [-rParam, cParam],
    (rParam, cParam) => [-rParam, -cParam],
    (rParam, cParam) => [cParam, rParam],
    (rParam, cParam) => [cParam, -rParam],
    (rParam, cParam) => [-cParam, rParam],
    (rParam, cParam) => [-cParam, -rParam],
  ];

  function exploreIslandDfs(dfsRow, dfsCol, islandPointsAccumulator) {
    if (
      dfsRow < 0 ||
      dfsRow >= gridDimensionR ||
      dfsCol < 0 ||
      dfsCol >= gridDimensionC ||
      visitedState[dfsRow][dfsCol] ||
      grid[dfsRow][dfsCol] === 0
    ) {
      return;
    }

    visitedState[dfsRow][dfsCol] = true;
    islandPointsAccumulator.push([dfsRow, dfsCol]);

    exploreIslandDfs(dfsRow + 1, dfsCol, islandPointsAccumulator);
    exploreIslandDfs(dfsRow - 1, dfsCol, islandPointsAccumulator);
    exploreIslandDfs(dfsRow, dfsCol + 1, islandPointsAccumulator);
    exploreIslandDfs(dfsRow, dfsCol - 1, islandPointsAccumulator);
  }

  function computeCanonicalShape(initialCoordinates) {
    const allShapeStrings = [];

    for (const singleOp of transformations) {
      const processedCoordinates = initialCoordinates.map(([origR, origC]) =>
        singleOp(origR, origC),
      );

      processedCoordinates.sort((coordA, coordB) => {
        if (coordA[0] === coordB[0]) {
          return coordA[1] - coordB[1];
        }
        return coordA[0] - coordB[0];
      });

      const firstCoordRow = processedCoordinates[0][0];
      const firstCoordCol = processedCoordinates[0][1];

      const shiftedCoordinates = processedCoordinates.map(([rVal, cVal]) => [
        rVal - firstCoordRow,
        cVal - firstCoordCol,
      ]);

      const coordinateString = shiftedCoordinates
        .map(([normR, normC]) => `${normR},${normC}`)
        .join("|");
      allShapeStrings.push(coordinateString);
    }

    allShapeStrings.sort();
    return allShapeStrings[0];
  }

  for (let rIter = 0; rIter < gridDimensionR; rIter++) {
    for (let cIter = 0; cIter < gridDimensionC; cIter++) {
      if (grid[rIter][cIter] === 1 && !visitedState[rIter][cIter]) {
        const currentIslandPath = [];
        exploreIslandDfs(rIter, cIter, currentIslandPath);

        const finalCanonicalString = computeCanonicalShape(currentIslandPath);
        uniqueIslandRepresentations.add(finalCanonicalString);
      }
    }
  }

  return uniqueIslandRepresentations.size;
};
