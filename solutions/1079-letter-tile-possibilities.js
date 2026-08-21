/**
 * Letter Tile Possibilities
 * Intuition: Every non-empty sequence is a permutation of a multiset subset of the tiles. Backtracking that decrements letter counts generates each distinct sequence once and counts nodes in the search tree.
 * Approach: 1. Tally character frequencies. 2. Recurse: for each letter with remaining count, use one, add 1, recurse, then restore. 3. Sum those choices. 4. Return the total.
 * Dry Run: tiles=AAB. Sequences: A, AA, AAB, AB, ABA, B, BA, BAA → 8.
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
