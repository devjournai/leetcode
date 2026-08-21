/**
 * Word Subsets
 * Intuition: A word in words1 is universal iff it covers every words2 word. That is the same as covering the pointwise max letter-count over all of words2.
 * Approach: 1. For each words2 string, count letters; fold into `maxCharCodes`. 2. For each words1 word, count letters; if any index is below `maxCharCodes`, reject. 3. Collect survivors.
 * Dry Run: words1=["amazon","apple","facebook","google","leetcode"], words2=["e","o"]. max needs e:1 o:1. amazon has both → keep; apple has e not o → drop. Result includes amazon, facebook, google, leetcode.
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
        currentWordCharCount[alphabetPos]
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
