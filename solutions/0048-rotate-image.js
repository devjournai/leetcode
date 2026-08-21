/**
 * Rotate Image
 * Intuition: A 90° clockwise rotation cycles four cells: top → right → bottom → left → top. Doing this for every offset in every concentric layer rotates the matrix in place.
 * Approach: 1. For each layer from 0 to floor(n/2)-1, set first and last indices of that ring. 2. For each offset along the side, save the top cell. 3. Move left→top, bottom→left, right→bottom, then write the saved value into right.
 * Dry Run: matrix = [[1,2,3],[4,5,6],[7,8,9]], layer 0.
 *   - offset 0: 1 saved; 7→1, 9→7, 3→9, 1→3.
 *   - offset 1: 2 saved; 4→2, 8→4, 6→8, 2→6. Center 5 stays. Result [[7,4,1],[8,5,2],[9,6,3]].
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */
var rotate = function (matrix) {
  const matrixLength = matrix.length;

  for (
    let layerIndex = 0;
    layerIndex < Math.floor(matrixLength / 2);
    layerIndex++
  ) {
    const firstBound = layerIndex;
    const lastBound = matrixLength - 1 - layerIndex;

    for (
      let positionIndex = 0;
      positionIndex < lastBound - firstBound;
      positionIndex++
    ) {
      const holdingValue = matrix[firstBound][firstBound + positionIndex];

      matrix[firstBound][firstBound + positionIndex] =
        matrix[lastBound - positionIndex][firstBound];

      matrix[lastBound - positionIndex][firstBound] =
        matrix[lastBound][lastBound - positionIndex];

      matrix[lastBound][lastBound - positionIndex] =
        matrix[firstBound + positionIndex][lastBound];

      matrix[firstBound + positionIndex][lastBound] = holdingValue;
    }
  }
};
