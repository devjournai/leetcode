/**
 * Minimum Score Triangulation Of Polygon
 * Intuition: Interval DP: for vertices i..j, try each split k and add triangle (i,k,j) plus the two sub-polygons.
 * Approach: 1. Zero an n x n table. 2. For span 2..n-1, for each start, end=start+span. 3. Minimize over k in (start,end): dp[start][k]+dp[k][end]+values[start]*values[k]*values[end]. 4. Return dp[0][n-1].
 * Dry Run: values = [1,2,3].
 *   - Only one triangle, score 1*2*3=6.
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
          currentTriangulationScore
        );
      }
    }
  }

  return memoTable[0][polygonSize - 1];
};
