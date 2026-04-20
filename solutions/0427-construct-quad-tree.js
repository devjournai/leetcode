/**
 * Construct Quad Tree
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var construct = function (gridMatrix) {
    function processSubgrid(rowStart, colStart, currentSize) {
        const initialQuadrantValue = gridMatrix[rowStart][colStart];
        let isUniform = true;

        outerLoop:
        for (let rowIterator = rowStart; rowIterator < rowStart + currentSize; rowIterator++) {
            for (let colIterator = colStart; colIterator < colStart + currentSize; colIterator++) {
                if (gridMatrix[rowIterator][colIterator] !== initialQuadrantValue) {
                    isUniform = false;
                    break outerLoop;
                }
            }
        }

        if (isUniform) {
            return new _Node(initialQuadrantValue === 1, true, null, null, null, null);
        } else {
            const halfSize = currentSize / 2;
            const topLeftNode = processSubgrid(rowStart, colStart, halfSize);
            const topRightNode = processSubgrid(rowStart, colStart + halfSize, halfSize);
            const bottomLeftNode = processSubgrid(rowStart + halfSize, colStart, halfSize);
            const bottomRightNode = processSubgrid(rowStart + halfSize, colStart + halfSize, halfSize);

            return new _Node(true, false, topLeftNode, topRightNode, bottomLeftNode, bottomRightNode);
        }
    }

    return processSubgrid(0, 0, gridMatrix.length);
};