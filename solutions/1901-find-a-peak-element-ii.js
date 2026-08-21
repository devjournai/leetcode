/**
 * Find A Peak Element II
 * Intuition: Binary-search rows. In the mid row take the max column; if it is greater than vertical neighbors it is a 2D peak (also checked vs left/right). Else search toward the larger vertical neighbor.
 * Approach: 1. `getMaxColumnIndexInRow` on midRowCandidate. 2. If peak vs four neighbors, return [row,col]. 3. If top is larger, recurse upper half; else lower half.
 * Dry Run: mat=[[1,4],[3,2]]. Mid row 0 max is 4; bottom neighbor 2 is smaller, left 1 smaller → peak [0,1].
 * Time Complexity: O(N log M)
 * Space Complexity: O(log M)
 */
var findPeakGrid = function (mat) {
  const matrixRows = mat.length;
  const matrixCols = mat[0].length;

  function getMaxColumnIndexInRow(targetRow, columnIndexStart, columnIndexEnd) {
    let currentMaxColIndex = columnIndexStart;
    for (
      let columnIndexTraveler = columnIndexStart + 1;
      columnIndexTraveler <= columnIndexEnd;
      columnIndexTraveler++
    ) {
      if (
        mat[targetRow][columnIndexTraveler] > mat[targetRow][currentMaxColIndex]
      ) {
        currentMaxColIndex = columnIndexTraveler;
      }
    }
    return currentMaxColIndex;
  }

  function performBinarySearchOnRows(currentRowStart, currentRowEnd) {
    if (currentRowStart > currentRowEnd) {
      return null;
    }

    const midRowCandidate = Math.floor((currentRowStart + currentRowEnd) / 2);
    const peakCandidateColIndex = getMaxColumnIndexInRow(
      midRowCandidate,
      0,
      matrixCols - 1
    );
    const peakCandidateValue = mat[midRowCandidate][peakCandidateColIndex];

    const topNeighborValue =
      midRowCandidate > 0
        ? mat[midRowCandidate - 1][peakCandidateColIndex]
        : -1;
    const bottomNeighborValue =
      midRowCandidate < matrixRows - 1
        ? mat[midRowCandidate + 1][peakCandidateColIndex]
        : -1;
    const leftNeighborValue =
      peakCandidateColIndex > 0
        ? mat[midRowCandidate][peakCandidateColIndex - 1]
        : -1;
    const rightNeighborValue =
      peakCandidateColIndex < matrixCols - 1
        ? mat[midRowCandidate][peakCandidateColIndex + 1]
        : -1;

    if (
      peakCandidateValue > topNeighborValue &&
      peakCandidateValue > bottomNeighborValue &&
      peakCandidateValue > leftNeighborValue &&
      peakCandidateValue > rightNeighborValue
    ) {
      return [midRowCandidate, peakCandidateColIndex];
    }

    if (topNeighborValue > peakCandidateValue) {
      return performBinarySearchOnRows(currentRowStart, midRowCandidate - 1);
    }

    return performBinarySearchOnRows(midRowCandidate + 1, currentRowEnd);
  }

  return performBinarySearchOnRows(0, matrixRows - 1);
};
