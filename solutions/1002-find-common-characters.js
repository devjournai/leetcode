/**
 * Find Common Characters
 * Intuition: A common character can appear only as often as it appears in every word, so keep a running min frequency of each letter.
 * Approach: 1. Count letters in the first word into a 26-slot min array. 2. For each later word, count its letters. 3. Pointwise min those counts into the running array. 4. Emit each letter that many times.
 * Dry Run: words = ["bella","label","roller"].
 *   - First: b1 e1 l2 a1. After "label": a1 b1 e1 l2. After "roller": e1 l2.
 *   - Result: ["e","l","l"].
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
        currentWordCharacterCounts[comparisonIterator]
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
      asciiOffsetForA + charIteratorForResult
    );
    let appendLoopCounter = 0;
    while (appendLoopCounter < charCountForElement) {
      finalResultList.push(charToAdd);
      appendLoopCounter++;
    }
  }

  return finalResultList;
};
