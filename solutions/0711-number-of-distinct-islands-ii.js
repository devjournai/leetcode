/**
 * Number Of Distinct Islands II
 * Intuition: Islands that match after rotation or reflection are the same shape. Canonicalize each island by trying all 8 dihedral maps, translating so the smallest point is (0,0), and keeping the lexicographically smallest serialization.
 * Approach: 1. DFS (`exploreIslandDfs`) collects 4-connected land cells into `currentIslandPath`. 2. `computeCanonicalShape` applies each function in `transformations`, sorts points, subtracts the first coordinate, and joins `"r,c"` pairs with `"|"`. 3. Sort those 8 strings and take the first. 4. Insert into `uniqueIslandRepresentations` and return its size.
 * Dry Run: Two L-shaped islands that are rotations of each other both produce the same canonical string, so the set size is 1.
 * Time Complexity: O(R * C * log(R * C))
 * Space Complexity: O(R * C)
 */
var numDistinctIslands2 = function (grid) {
  const gridDimensionR = grid.length;
  const gridDimensionC = grid[0].length;
  const visitedState = Array.from({ length: gridDimensionR }, () =>
    new Array(gridDimensionC).fill(false)
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
        singleOp(origR, origC)
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
