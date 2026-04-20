/**
 * Valid Sudoku
 * Time Complexity: O(1)
 * Space Complexity: O(1)
*/
var isValidSudoku = function (board) {
    const rowTrackers = new Array(9).fill(null).map(() => new Set());
    const columnTrackers = new Array(9).fill(null).map(() => new Set());
    const boxTrackers = new Array(9).fill(null).map(() => new Set());

    for (let currentGridRow = 0; currentGridRow < 9; currentGridRow++) {
        for (let currentGridColumn = 0; currentGridColumn < 9; currentGridColumn++) {
            const cellContent = board[currentGridRow][currentGridColumn];

            if (cellContent !== '.') {
                const boxIdentifier = Math.floor(currentGridRow / 3) * 3 + Math.floor(currentGridColumn / 3);

                if (rowTrackers[currentGridRow].has(cellContent) ||
                    columnTrackers[currentGridColumn].has(cellContent) ||
                    boxTrackers[boxIdentifier].has(cellContent)) {
                    return false;
                }

                rowTrackers[currentGridRow].add(cellContent);
                columnTrackers[currentGridColumn].add(cellContent);
                boxTrackers[boxIdentifier].add(cellContent);
            }
        }
    }

    return true;
};