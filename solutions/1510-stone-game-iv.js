/**
 * Stone Game Iv
 * Time Complexity: O(n * sqrt(n))
 * Space Complexity: O(n)
 */
var winnerSquareGame = function (n) {
  const gamePossibilities = new Array(n + 1).fill(false);

  let stoneCountIterator = 1;
  while (stoneCountIterator <= n) {
    let squareCheckIterator = 1;
    while (squareCheckIterator * squareCheckIterator <= stoneCountIterator) {
      const squareNumberRemoved = squareCheckIterator * squareCheckIterator;
      if (!gamePossibilities[stoneCountIterator - squareNumberRemoved]) {
        gamePossibilities[stoneCountIterator] = true;
        break;
      }
      squareCheckIterator++;
    }
    stoneCountIterator++;
  }

  return gamePossibilities[n];
};
