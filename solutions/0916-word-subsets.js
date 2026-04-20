/**
 * Word Subsets
 * Time Complexity: O(M * maxLen2 + N * maxLen1)
 * Space Complexity: O(1)
 */
var wordSubsets = function (words1, words2) {
  const alphabetSize = 26;
  const charCodeA = "a".charCodeAt(0);

  const maxCharCodes = new Array(alphabetSize).fill(0);

  for (const secondWord of words2) {
    const currentWordCharCount = new Array(alphabetSize).fill(0);

    for (const charOfCurrentWord of secondWord) {
      currentWordCharCount[charOfCurrentWord.charCodeAt(0) - charCodeA]++;
    }

    for (let alphabetPos = 0; alphabetPos < alphabetSize; alphabetPos++) {
      maxCharCodes[alphabetPos] = Math.max(
        maxCharCodes[alphabetPos],
        currentWordCharCount[alphabetPos],
      );
    }
  }

  const resultantUniversalWords = [];

  for (const wordFromWords1 of words1) {
    const countsForWord1 = new Array(alphabetSize).fill(0);

    for (const characterFromWord1 of wordFromWords1) {
      countsForWord1[characterFromWord1.charCodeAt(0) - charCodeA]++;
    }

    let isSatisfyingAllRequirements = true;

    for (
      let indexForAlphabet = 0;
      indexForAlphabet < alphabetSize;
      indexForAlphabet++
    ) {
      if (countsForWord1[indexForAlphabet] < maxCharCodes[indexForAlphabet]) {
        isSatisfyingAllRequirements = false;
        break;
      }
    }

    if (isSatisfyingAllRequirements) {
      resultantUniversalWords.push(wordFromWords1);
    }
  }

  return resultantUniversalWords;
};
