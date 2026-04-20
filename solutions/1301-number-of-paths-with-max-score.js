/**
 * Number Of Paths With Max Score
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var pathsWithMaxScore = function (board) {
  const boardSize = board.length;
  const moduloConstant = 1000000007;

  const dynamicProgram = Array.from({ length: boardSize }, () =>
    new Array(boardSize).fill([-Infinity, 0]),
  );

  dynamicProgram[boardSize - 1][boardSize - 1] = [0, 1];

  for (let initialRow = boardSize - 1; initialRow >= 0; initialRow--) {
    for (
      let initialColumn = boardSize - 1;
      initialColumn >= 0;
      initialColumn--
    ) {
      const boardCharacter = board[initialRow][initialColumn];

      if (boardCharacter === "X") {
        dynamicProgram[initialRow][initialColumn] = [-Infinity, 0];
        continue;
      }

      if (initialRow === boardSize - 1 && initialColumn === boardSize - 1) {
        continue;
      }

      const squareValue = boardCharacter === "E" ? 0 : Number(boardCharacter);
      const moveOptions = [
        [0, 1],
        [1, 0],
        [1, 1],
      ];

      for (const [deltaRow, deltaColumn] of moveOptions) {
        const nextPositionRow = initialRow + deltaRow;
        const nextPositionColumn = initialColumn + deltaColumn;

        if (nextPositionRow >= boardSize || nextPositionColumn >= boardSize) {
          continue;
        }

        const neighborPathCount =
          dynamicProgram[nextPositionRow][nextPositionColumn][1];
        if (neighborPathCount === 0) {
          continue;
        }

        const neighborMaxScore =
          dynamicProgram[nextPositionRow][nextPositionColumn][0];
        const adjacentScore = neighborMaxScore + squareValue;

        const currentMaxScore = dynamicProgram[initialRow][initialColumn][0];
        const currentPathCount = dynamicProgram[initialRow][initialColumn][1];

        if (adjacentScore > currentMaxScore) {
          dynamicProgram[initialRow][initialColumn] = [
            adjacentScore,
            neighborPathCount,
          ];
        } else if (adjacentScore === currentMaxScore) {
          const updatedPathCount =
            (currentPathCount + neighborPathCount) % moduloConstant;
          dynamicProgram[initialRow][initialColumn][1] = updatedPathCount;
        }
      }
    }
  }

  const finalResult = dynamicProgram[0][0];
  return finalResult[1] === 0 ? [0, 0] : finalResult;
};
