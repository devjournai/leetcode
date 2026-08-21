/**
 * Check If It Is A Straight Line
 * Intuition: All points are collinear iff each shares the same slope with the first two, compared via cross product to avoid division.
 * Approach: 1. Base vector from points[0] to points[1]. 2. For each later point, if dy0*dx_i ≠ dy_i*dx0 return false. 3. Else true.
 * Dry Run: [[1,2],[2,3],[3,4]] → all cross products 0 → true.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var checkStraightLine = function (coordinates) {
  const firstPointCoordinates = coordinates[0];
  const initialX = firstPointCoordinates[0];
  const initialY = firstPointCoordinates[1];

  const secondPointCoordinates = coordinates[1];
  const subsequentX = secondPointCoordinates[0];
  const subsequentY = secondPointCoordinates[1];

  const yDifferenceBasis = subsequentY - initialY;
  const xDifferenceBasis = subsequentX - initialX;

  for (
    let currentPointIndex = 2;
    currentPointIndex < coordinates.length;
    currentPointIndex++
  ) {
    const pointCandidate = coordinates[currentPointIndex];
    const candidateX = pointCandidate[0];
    const candidateY = pointCandidate[1];

    const yDifferenceCandidate = candidateY - initialY;
    const xDifferenceCandidate = candidateX - initialX;

    const crossProductValueOne = yDifferenceBasis * xDifferenceCandidate;
    const crossProductValueTwo = yDifferenceCandidate * xDifferenceBasis;

    if (crossProductValueOne !== crossProductValueTwo) {
      return false;
    }
  }

  return true;
};
