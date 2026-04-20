/**
 * Game Of Life
 * Time Complexity: O(M*N)
 * Space Complexity: O(1)
 */
var gameOfLife = function (board) {
    const rowLimit = board.length;
    const colLimit = board[0].length;

    const neighborOffsets = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    for (let currentRow = 0; currentRow < rowLimit; currentRow++) {
        for (let currentCol = 0; currentCol < colLimit; currentCol++) {
            let liveCellsAround = 0;

            for (let offsetIndex = 0; offsetIndex < neighborOffsets.length; offsetIndex++) {
                const neighborDirection = neighborOffsets[offsetIndex];
                const nextNeighborRow = currentRow + neighborDirection[0];
                const nextNeighborCol = currentCol + neighborDirection[1];

                if (nextNeighborRow >= 0 && nextNeighborRow < rowLimit &&
                    nextNeighborCol >= 0 && nextNeighborCol < colLimit) {

                    if (board[nextNeighborRow][nextNeighborCol] === 1 || board[nextNeighborRow][nextNeighborCol] === 2) {
                        liveCellsAround++;
                    }
                }
            }

            if (board[currentRow][currentCol] === 1) {
                if (liveCellsAround < 2 || liveCellsAround > 3) {
                    board[currentRow][currentCol] = 2;
                }
            } else {
                if (liveCellsAround === 3) {
                    board[currentRow][currentCol] = 3;
                }
            }
        }
    }

    for (let finalRow = 0; finalRow < rowLimit; finalRow++) {
        for (let finalCol = 0; finalCol < colLimit; finalCol++) {
            board[finalRow][finalCol] %= 2;
        }
    }
};