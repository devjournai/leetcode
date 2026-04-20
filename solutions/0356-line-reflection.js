/**
 * Line Reflection
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var isReflected = function (points) {
    if (points.length === 0) {
        return true;
    }

    const pointStringRepresentationSet = new Set(points.map((currentPointItem) => {
        const itemXComponent = currentPointItem[0];
        const itemYComponent = currentPointItem[1];
        return `${itemXComponent},${itemYComponent}`;
    }));

    let minimumXCoordinate = Infinity;
    let maximumXCoordinate = -Infinity;

    points.forEach((currentBoundaryPoint) => {
        const xValueForBoundary = currentBoundaryPoint[0];
        minimumXCoordinate = Math.min(minimumXCoordinate, xValueForBoundary);
        maximumXCoordinate = Math.max(maximumXCoordinate, xValueForBoundary);
    });

    const combinedXRangeSum = minimumXCoordinate + maximumXCoordinate;

    const allSymmetricPairsExist = points.every((currentCheckPoint) => {
        const checkXCoordinate = currentCheckPoint[0];
        const checkYCoordinate = currentCheckPoint[1];

        const mirroredXCoordinate = combinedXRangeSum - checkXCoordinate;
        const requiredSymmetricKey = `${mirroredXCoordinate},${checkYCoordinate}`;

        return pointStringRepresentationSet.has(requiredSymmetricKey);
    });

    return allSymmetricPairsExist;
};