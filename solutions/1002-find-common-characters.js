/**
 * Find Common Characters
 * Time Complexity: O(N * L)
 * Space Complexity: O(L)
 */
var commonChars = function (words) {
  const alphabetSizeConstant = 26;
  const asciiOffsetForA = "a".charCodeAt(0);

  const minCharacterCounts = new Array(alphabetSizeConstant).fill(0);
  const initialWord = words[0];

  for (const charOfInitialWord of initialWord) {
    const indexInAlphabet = charOfInitialWord.charCodeAt(0) - asciiOffsetForA;
    minCharacterCounts[indexInAlphabet]++;
  }

  for (let wordIndex = 1; wordIndex < words.length; wordIndex++) {
    const currentWordString = words[wordIndex];
    const currentWordCharacterCounts = new Array(alphabetSizeConstant).fill(0);

    for (const charOfCurrentWordString of currentWordString) {
      const currentAlphabetIndex =
        charOfCurrentWordString.charCodeAt(0) - asciiOffsetForA;
      currentWordCharacterCounts[currentAlphabetIndex]++;
    }

    for (
      let comparisonIterator = 0;
      comparisonIterator < alphabetSizeConstant;
      comparisonIterator++
    ) {
      minCharacterCounts[comparisonIterator] = Math.min(
        minCharacterCounts[comparisonIterator],
        currentWordCharacterCounts[comparisonIterator],
      );
    }
  }

  const finalResultList = [];
  for (
    let charIteratorForResult = 0;
    charIteratorForResult < alphabetSizeConstant;
    charIteratorForResult++
  ) {
    const charCountForElement = minCharacterCounts[charIteratorForResult];
    const charToAdd = String.fromCharCode(
      asciiOffsetForA + charIteratorForResult,
    );
    let appendLoopCounter = 0;
    while (appendLoopCounter < charCountForElement) {
      finalResultList.push(charToAdd);
      appendLoopCounter++;
    }
  }

  return finalResultList;
};
