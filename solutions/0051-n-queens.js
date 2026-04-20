/**
 * N Queens
 * Time Complexity: O(N! * N^2)
 * Space Complexity: O(N_solutions * N^2 + N)
 */
var solveNQueens = function (n) {
    const finalSolutions = [];
    const queenColumnPlacements = new Array(n);
    const usedColumns = new Set();
    const usedDiagOne = new Set();
    const usedDiagTwo = new Set();

    const solvePuzzleRecursively = (currentRowIndex, boardSize, solutionVault, placementRegister, colAvailability, diag1Availability, diag2Availability) => {
        if (currentRowIndex === boardSize) {
            const boardRepresentation = [];
            for (let rowIter = 0; rowIter < boardSize; rowIter++) {
                const currentQueenColumn = placementRegister[rowIter];
                const emptyCellsLeft = '.'.repeat(currentQueenColumn);
                const emptyCellsRight = '.'.repeat(boardSize - 1 - currentQueenColumn);
                const rowString = emptyCellsLeft + 'Q' + emptyCellsRight;
                boardRepresentation.push(rowString);
            }
            solutionVault.push(boardRepresentation);
            return;
        }

        for (let currentColumnTry = 0; currentColumnTry < boardSize; currentColumnTry++) {
            const diagonalOneKey = currentRowIndex - currentColumnTry;
            const diagonalTwoKey = currentRowIndex + currentColumnTry;

            if (colAvailability.has(currentColumnTry) || diag1Availability.has(diagonalOneKey) || diag2Availability.has(diagonalTwoKey)) {
                continue;
            } else {
                placementRegister[currentRowIndex] = currentColumnTry;
                colAvailability.add(currentColumnTry);
                diag1Availability.add(diagonalOneKey);
                diag2Availability.add(diagonalTwoKey);

                solvePuzzleRecursively(currentRowIndex + 1, boardSize, solutionVault, placementRegister, colAvailability, diag1Availability, diag2Availability);

                colAvailability.delete(currentColumnTry);
                diag1Availability.delete(diagonalOneKey);
                diag2Availability.delete(diagonalTwoKey);
                delete placementRegister[currentRowIndex];
            }
        }
    };

    solvePuzzleRecursively(0, n, finalSolutions, queenColumnPlacements, usedColumns, usedDiagOne, usedDiagTwo);
    return finalSolutions;
};