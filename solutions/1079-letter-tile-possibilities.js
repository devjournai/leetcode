/**
 * Letter Tile Possibilities
 * Time Complexity: O(K * N!)
 * Space Complexity: O(K + N)
 */
var numTilePossibilities = function (tiles) {
  const charCounts = {};

  const tileCharacters = tiles.split("");
  for (const charInstance of tileCharacters) {
    charCounts[charInstance] = (charCounts[charInstance] || 0) + 1;
  }

  function generateSequences() {
    let currentLevelCount = 0;

    const availableCharacters = Object.keys(charCounts);
    for (const characterSymbol of availableCharacters) {
      if (charCounts[characterSymbol] > 0) {
        currentLevelCount++;
        charCounts[characterSymbol]--;

        const subsequentSequences = generateSequences();
        currentLevelCount += subsequentSequences;

        charCounts[characterSymbol]++;
      }
    }
    return currentLevelCount;
  }

  const totalPossibleSequences = generateSequences();

  return totalPossibleSequences;
};
