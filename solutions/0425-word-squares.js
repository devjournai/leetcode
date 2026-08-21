/**
 * Word Squares
 * Intuition: Row `r` of a square must start with the prefix formed by column `r` of the words already chosen. A `prefixDictionary` maps every prefix to words that have it so backtracking can list candidates.
 * Approach: 1. For each word, store it under every prefix `slice(0, i)` including `""`. 2. `findWordSquaresRecursive`: if path length is K, copy to results; else build next prefix from `existingWord[pathLength]` and try each candidate. 3. Start a square from every first-row word.
 * Dry Run: words = ["area","lead","wall","lady","ball"].
 *   - "wall" → prefix "l" → "lead" → "lea"/"lad" → "lady" → "lead". Square wall/area/lead/lady.
 * Time Complexity: O(N * K^2 + S * K^2)
 * Space Complexity: O(N * K^2 + S * K^2)
 */
var wordSquares = function (words) {
  const finalSquaresList = [];
  const prefixDictionary = new Map();
  const squareDimension = words[0].length;

  for (const inputWord of words) {
    for (let charPointer = 0; charPointer < inputWord.length; charPointer++) {
      const currentSlicedPrefix = inputWord.slice(0, charPointer);
      if (!prefixDictionary.has(currentSlicedPrefix)) {
        prefixDictionary.set(currentSlicedPrefix, []);
      }
      prefixDictionary.get(currentSlicedPrefix).push(inputWord);
    }
  }

  function findWordSquaresRecursive(currentPath) {
    if (currentPath.length === squareDimension) {
      finalSquaresList.push([...currentPath]);
      return;
    }

    const nextPrefixBuilder = [];
    const currentLengthOfPath = currentPath.length;
    for (const existingWord of currentPath) {
      nextPrefixBuilder.push(existingWord[currentLengthOfPath]);
    }
    const targetPrefixString = nextPrefixBuilder.join("");

    const candidateWordsList = prefixDictionary.get(targetPrefixString) || [];
    for (const choiceWord of candidateWordsList) {
      currentPath.push(choiceWord);
      findWordSquaresRecursive(currentPath);
      currentPath.pop();
    }
  }

  for (const firstRowWord of words) {
    findWordSquaresRecursive([firstRowWord]);
  }

  return finalSquaresList;
};
