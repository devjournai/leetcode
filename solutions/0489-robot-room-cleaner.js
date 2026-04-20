/**
 * Robot Room Cleaner
 * Time Complexity: O(R * C)
 * Space Complexity: O(R * C)
 */
var cleanRoom = function (robot) {
    const visitedLocations = new Set();
    const directionVectors = [[-1, 0], [0, 1], [1, 0], [0, -1]];

    exploreAndClean(0, 0, 0);

    function exploreAndClean(currentRowPosition, currentColumnPosition, currentDirectionState) {
        const cellIdentifier = `${currentRowPosition},${currentColumnPosition}`;
        if (visitedLocations.has(cellIdentifier)) {
            return;
        }

        visitedLocations.add(cellIdentifier);
        robot.clean();

        for (let iterationCounter = 0; iterationCounter < 4; iterationCounter++) {
            const nextAbsoluteDirection = (currentDirectionState + iterationCounter) % 4;
            const [deltaRowMovement, deltaColumnMovement] = directionVectors[nextAbsoluteDirection];
            const nextRowCoordinate = currentRowPosition + deltaRowMovement;
            const nextColumnCoordinate = currentColumnPosition + deltaColumnMovement;

            if (robot.move()) {
                exploreAndClean(nextRowCoordinate, nextColumnCoordinate, nextAbsoluteDirection);

                robot.turnRight();
                robot.turnRight();
                robot.move();
                robot.turnLeft();
                robot.turnLeft();
            }
            robot.turnRight();
        }
    }
};