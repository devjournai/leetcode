/**
 * Battleships In A Board
 * Time Complexity: O(m * n)
 * Space Complexity: O(1)
 */
var countBattleships = function (inputBoard) {
    let battleshipCount = 0;

    const boardRows = inputBoard.length;
    if (boardRows === 0) {
        return 0;
    }
    const boardColumns = inputBoard[0].length;
    if (boardColumns === 0) {
        return 0;
    }

    for (let currentColumn = 0; currentColumn < boardRows; currentColumn++) {
        for (let currentRow = 0; currentRow < boardColumns; currentRow++) {
            if (inputBoard[currentColumn][currentRow] === 'X') {
                const checkLeftBoundary = (currentRow === 0 || inputBoard[currentColumn][currentRow - 1] !== 'X');
                const checkTopBoundary = (currentColumn === 0 || inputBoard[currentColumn - 1][currentRow] !== 'X');

                if (checkLeftBoundary && checkTopBoundary) {
                    battleshipCount++;
                }
            }
        }
    }

    return battleshipCount;
};