/**
 * Perfect Rectangle
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

    for (let rectangleIndex = 0; rectangleIndex < rectanglesArray.length; rectangleIndex++) {
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

        cornerTrackingSet.has(pointKeyA) ? cornerTrackingSet.delete(pointKeyA) : cornerTrackingSet.add(pointKeyA);
        cornerTrackingSet.has(pointKeyB) ? cornerTrackingSet.delete(pointKeyB) : cornerTrackingSet.add(pointKeyB);
        cornerTrackingSet.has(pointKeyC) ? cornerTrackingSet.delete(pointKeyC) : cornerTrackingSet.add(pointKeyC);
        cornerTrackingSet.has(pointKeyD) ? cornerTrackingSet.delete(pointKeyD) : cornerTrackingSet.add(pointKeyD);
    }

    const overallExpectedArea = (maxBoundaryX - minBoundaryX) * (maxBoundaryY - minBoundaryY);

    const finalBottomLeftKey = `${minBoundaryX},${minBoundaryY}`;
    const finalBottomRightKey = `${maxBoundaryX},${minBoundaryY}`;
    const finalTopLeftKey = `${minBoundaryX},${maxBoundaryY}`;
    const finalTopRightKey = `${maxBoundaryX},${maxBoundaryY}`;

    return accumulatedArea === overallExpectedArea &&
        cornerTrackingSet.size === 4 &&
        cornerTrackingSet.has(finalBottomLeftKey) &&
        cornerTrackingSet.has(finalBottomRightKey) &&
        cornerTrackingSet.has(finalTopLeftKey) &&
        cornerTrackingSet.has(finalTopRightKey);
};