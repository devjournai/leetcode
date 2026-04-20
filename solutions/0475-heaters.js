/**
 * Heaters
 * Time Complexity: O(N log N + M log M + N log M)
 * Space Complexity: O(1)
 */
var findRadius = function (houseCoordinates, heaterPositions) {
    houseCoordinates.sort((firstElement, secondElement) => firstElement - secondElement);
    heaterPositions.sort((firstElement, secondElement) => firstElement - secondElement);

    let overallMinimumRadius = 0;

    for (const currentHouseCoordinate of houseCoordinates) {
        let leftBoundary = 0;
        let rightBoundary = heaterPositions.length - 1;
        let minimumDistanceForHouse = Number.POSITIVE_INFINITY;

        while (leftBoundary <= rightBoundary) {
            let middlePoint = Math.floor((leftBoundary + rightBoundary) / 2);
            let currentHeaterCoordinate = heaterPositions[middlePoint];

            minimumDistanceForHouse = Math.min(minimumDistanceForHouse, Math.abs(currentHouseCoordinate - currentHeaterCoordinate));

            if (currentHeaterCoordinate < currentHouseCoordinate) {
                leftBoundary = middlePoint + 1;
            } else if (currentHeaterCoordinate > currentHouseCoordinate) {
                rightBoundary = middlePoint - 1;
            } else {
                minimumDistanceForHouse = 0;
                break;
            }
        }
        overallMinimumRadius = Math.max(overallMinimumRadius, minimumDistanceForHouse);
    }

    return overallMinimumRadius;
};