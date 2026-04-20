/**
 * The Maze
 * Time Complexity: O(rows * cols * (rows + cols))
 * Space Complexity: O(rows * cols)
 */
var hasPath = function (mazeGrid, startCoordinates, destinationTarget) {
    const gridRows = mazeGrid.length;
    const gridCols = mazeGrid[0].length;

    const visitQueue = [];
    visitQueue.push(startCoordinates);

    const visitedPoints = new Set();
    visitedPoints.add(`${startCoordinates[0]},${startCoordinates[1]}`);

    const deltaRows = [-1, 1, 0, 0];
    const deltaCols = [0, 0, -1, 1];

    while (visitQueue.length > 0) {
        const currentMazePosition = visitQueue.shift();
        const currentMazeRow = currentMazePosition[0];
        const currentMazeCol = currentMazePosition[1];

        if (currentMazeRow === destinationTarget[0] && currentMazeCol === destinationTarget[1]) {
            return true;
        }

        for (let directionIndex = 0; directionIndex < 4; ++directionIndex) {
            const currentDeltaRow = deltaRows[directionIndex];
            const currentDeltaCol = deltaCols[directionIndex];

            let potentialNewRow = currentMazeRow;
            let potentialNewCol = currentMazeCol;

            while (true) {
                const nextStepRow = potentialNewRow + currentDeltaRow;
                const nextStepCol = potentialNewCol + currentDeltaCol;

                const isWithinBounds = nextStepRow >= 0 && nextStepRow < gridRows && nextStepCol >= 0 && nextStepCol < gridCols;
                const isNotWall = isWithinBounds && mazeGrid[nextStepRow][nextStepCol] === 0;

                if (isNotWall) {
                    potentialNewRow = nextStepRow;
                    potentialNewCol = nextStepCol;
                } else {
                    break;
                }
            }

            const stopPositionKey = `${potentialNewRow},${potentialNewCol}`;
            if (!visitedPoints.has(stopPositionKey)) {
                visitedPoints.add(stopPositionKey);
                visitQueue.push([potentialNewRow, potentialNewCol]);
            }
        }
    }

    return false;
};