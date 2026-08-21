/**
 * Perfect Rectangle
 * Intuition: A perfect cover has area equal to the bounding box and no overlaps/holes. Interior corners appear an even number of times and cancel; only the four extreme corners of the big rectangle should remain in `cornerTrackingSet`.
 * Approach: 1. For each rectangle, add its area, expand min/max bounds, and toggle its four corner keys in a Set. 2. Compare `accumulatedArea` to the bounding-box area. 3. Accept only if the set has size 4 and contains exactly the four bounding corners.
 * Dry Run: [1,1,3,3], [3,1,4,2], [3,2,4,4], [1,3,2,4], [2,3,3,4].
 *   - Areas sum to 8; bounds [1,1]–[4,4] also area 8.
 *   - Interior corners cancel; set keeps (1,1),(4,1),(1,4),(4,4). Return true.
 * Time Complexity: O(N * L)
 * Space Complexity: O(N * L)
 */
var isRectangleCover = function (rectanglesArray) {
  let accumulatedArea = 0;
  let minBoundaryX = Infinity;
  let minBoundaryY = Infinity;
  let maxBoundaryX = -Infinity;
  let maxBoundaryY = -Infinity;

  const cornerTrackingSet = new Set();

  for (
    let rectangleIndex = 0;
    rectangleIndex < rectanglesArray.length;
    rectangleIndex++
  ) {
    const currentRectangle = rectanglesArray[rectangleIndex];
    const currentX1 = currentRectangle[0];
    const currentY1 = currentRectangle[1];
    const currentX2 = currentRectangle[2];
    const currentY2 = currentRectangle[3];

    accumulatedArea += (currentX2 - currentX1) * (currentY2 - currentY1);

    minBoundaryX = Math.min(minBoundaryX, currentX1);
    minBoundaryY = Math.min(minBoundaryY, currentY1);
    maxBoundaryX = Math.max(maxBoundaryX, currentX2);
    maxBoundaryY = Math.max(maxBoundaryY, currentY2);

    const pointKeyA = `${currentX1},${currentY1}`;
    const pointKeyB = `${currentX2},${currentY1}`;
    const pointKeyC = `${currentX1},${currentY2}`;
    const pointKeyD = `${currentX2},${currentY2}`;

    cornerTrackingSet.has(pointKeyA)
      ? cornerTrackingSet.delete(pointKeyA)
      : cornerTrackingSet.add(pointKeyA);
    cornerTrackingSet.has(pointKeyB)
      ? cornerTrackingSet.delete(pointKeyB)
      : cornerTrackingSet.add(pointKeyB);
    cornerTrackingSet.has(pointKeyC)
      ? cornerTrackingSet.delete(pointKeyC)
      : cornerTrackingSet.add(pointKeyC);
    cornerTrackingSet.has(pointKeyD)
      ? cornerTrackingSet.delete(pointKeyD)
      : cornerTrackingSet.add(pointKeyD);
  }

  const overallExpectedArea =
    (maxBoundaryX - minBoundaryX) * (maxBoundaryY - minBoundaryY);

  const finalBottomLeftKey = `${minBoundaryX},${minBoundaryY}`;
  const finalBottomRightKey = `${maxBoundaryX},${minBoundaryY}`;
  const finalTopLeftKey = `${minBoundaryX},${maxBoundaryY}`;
  const finalTopRightKey = `${maxBoundaryX},${maxBoundaryY}`;

  return (
    accumulatedArea === overallExpectedArea &&
    cornerTrackingSet.size === 4 &&
    cornerTrackingSet.has(finalBottomLeftKey) &&
    cornerTrackingSet.has(finalBottomRightKey) &&
    cornerTrackingSet.has(finalTopLeftKey) &&
    cornerTrackingSet.has(finalTopRightKey)
  );
};
