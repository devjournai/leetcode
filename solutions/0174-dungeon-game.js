/**
 * Dungeon Game
 * Time Complexity: O(m*n)
 * Space Complexity: O(m*n)
 */
var calculateMinimumHP = function (dungeonMatrix) {
    const totalRows = dungeonMatrix.length;
    const totalColumns = dungeonMatrix[0].length;

    const minimumHealthTable = Array(totalRows).fill(0).map(() => Array(totalColumns).fill(0));

    for (let currentRowIdentifier = totalRows - 1; currentRowIdentifier >= 0; currentRowIdentifier--) {
        for (let currentColumnIdentifier = totalColumns - 1; currentColumnIdentifier >= 0; currentColumnIdentifier--) {
            if (currentRowIdentifier === totalRows - 1 && currentColumnIdentifier === totalColumns - 1) {
                minimumHealthTable[currentRowIdentifier][currentColumnIdentifier] = Math.max(1, 1 - dungeonMatrix[currentRowIdentifier][currentColumnIdentifier]);
            } else {
                let healthNeededMovingRight = Infinity;
                if (currentColumnIdentifier + 1 < totalColumns) {
                    healthNeededMovingRight = minimumHealthTable[currentRowIdentifier][currentColumnIdentifier + 1];
                }

                let healthNeededMovingDown = Infinity;
                if (currentRowIdentifier + 1 < totalRows) {
                    healthNeededMovingDown = minimumHealthTable[currentRowIdentifier + 1][currentColumnIdentifier];
                }

                let nextPathMinimumHealth = Math.min(healthNeededMovingRight, healthNeededMovingDown);
                minimumHealthTable[currentRowIdentifier][currentColumnIdentifier] = Math.max(1, nextPathMinimumHealth - dungeonMatrix[currentRowIdentifier][currentColumnIdentifier]);
            }
        }
    }

    return minimumHealthTable[0][0];
};