/**
 * Construct Quad Tree
 * Intuition: A block is a leaf if every cell equals the top-left value; otherwise split into four equal quadrants and attach those subtrees.
 * Approach: 1. Recurse `processSubgrid(rowStart, colStart, currentSize)`. 2. Scan the square against `initialQuadrantValue`; break on mismatch. 3. Uniform → leaf `_Node(val===1, true)`. 4. Else recurse TL/TR/BL/BR at `halfSize` and return an internal node. 5. Start at `(0,0)` with `gridMatrix.length`.
 * Dry Run: [[1,1],[1,0]]. Top-left 1, (1,1) is 0 so split. TL/TR/BL leaves 1; BR leaf 0. Root is internal with those four children.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var construct = function (gridMatrix) {
  function processSubgrid(rowStart, colStart, currentSize) {
    const initialQuadrantValue = gridMatrix[rowStart][colStart];
    let isUniform = true;

    outerLoop: for (
      let rowIterator = rowStart;
      rowIterator < rowStart + currentSize;
      rowIterator++
    ) {
      for (
        let colIterator = colStart;
        colIterator < colStart + currentSize;
        colIterator++
      ) {
        if (gridMatrix[rowIterator][colIterator] !== initialQuadrantValue) {
          isUniform = false;
          break outerLoop;
        }
      }
    }

    if (isUniform) {
      return new _Node(
        initialQuadrantValue === 1,
        true,
        null,
        null,
        null,
        null
      );
    } else {
      const halfSize = currentSize / 2;
      const topLeftNode = processSubgrid(rowStart, colStart, halfSize);
      const topRightNode = processSubgrid(
        rowStart,
        colStart + halfSize,
        halfSize
      );
      const bottomLeftNode = processSubgrid(
        rowStart + halfSize,
        colStart,
        halfSize
      );
      const bottomRightNode = processSubgrid(
        rowStart + halfSize,
        colStart + halfSize,
        halfSize
      );

      return new _Node(
        true,
        false,
        topLeftNode,
        topRightNode,
        bottomLeftNode,
        bottomRightNode
      );
    }
  }

  return processSubgrid(0, 0, gridMatrix.length);
};
