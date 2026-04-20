/**
 * Stone Game
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var stoneGame = function (piles) {
  const totalPiles = piles.length;
  const memoizationTable = Array(totalPiles)
    .fill(null)
    .map(() => Array(totalPiles).fill(0));

  let indexIterator = 0;
  while (indexIterator < totalPiles) {
    memoizationTable[indexIterator][indexIterator] = piles[indexIterator];
    indexIterator++;
  }

  let currentLength = 2;
  while (currentLength <= totalPiles) {
    let startIndex = 0;
    while (startIndex <= totalPiles - currentLength) {
      const endIndex = startIndex + currentLength - 1;

      const optionLeft =
        piles[startIndex] - memoizationTable[startIndex + 1][endIndex];
      const optionRight =
        piles[endIndex] - memoizationTable[startIndex][endIndex - 1];

      memoizationTable[startIndex][endIndex] = Math.max(
        optionLeft,
        optionRight,
      );
      startIndex++;
    }
    currentLength++;
  }

  const finalScoreDifference = memoizationTable[0][totalPiles - 1];
  return finalScoreDifference > 0;
};
