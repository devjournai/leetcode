/**
 * Minimum Score Triangulation Of Polygon
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^2)
 */
var minScoreTriangulation = function (values) {
  const polygonSize = values.length;
  const memoTable = [];

  for (let rowIdx = 0; rowIdx < polygonSize; rowIdx++) {
    const rowData = new Array(polygonSize);
    for (let colIdx = 0; colIdx < polygonSize; colIdx++) {
      rowData[colIdx] = 0;
    }
    memoTable.push(rowData);
  }

  for (let currentSpan = 2; currentSpan < polygonSize; currentSpan++) {
    for (
      let startVertex = 0;
      startVertex + currentSpan < polygonSize;
      startVertex++
    ) {
      const endVertex = startVertex + currentSpan;
      memoTable[startVertex][endVertex] = Number.MAX_SAFE_INTEGER;

      for (
        let splitVertex = startVertex + 1;
        splitVertex < endVertex;
        splitVertex++
      ) {
        const currentTriangulationScore =
          memoTable[startVertex][splitVertex] +
          memoTable[splitVertex][endVertex] +
          values[startVertex] * values[splitVertex] * values[endVertex];
        memoTable[startVertex][endVertex] = Math.min(
          memoTable[startVertex][endVertex],
          currentTriangulationScore,
        );
      }
    }
  }

  return memoTable[0][polygonSize - 1];
};
