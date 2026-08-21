/**
 * Shortest Completing Word
 * Intuition: Ignore non-letters on the plate. A completing word’s letter counts cover the plate’s counts. Among completing words, take the shortest (first such in case of ties, because length is only replaced when strictly smaller).
 * Approach: 1. Count plate letters a–z in `plateLetterCounts`. 2. For each word, count letters and set `isCompletingWord` false if any plate count exceeds the word’s. 3. If completing and shorter than `minimalLengthFound`, record it.
 * Dry Run: plate "1s3 PSt", words include "step","steps". Both cover s,p,t; "step" is shorter → "step".
 * Time Complexity: O(L + W * K)
 * Space Complexity: O(K)
 */
var shortestCompletingWord = function (licensePlate, words) {
  let plateLetterCounts = new Array(26).fill(0);
  let plateTextLength = licensePlate.length;

  for (
    let charScanIndex = 0;
    charScanIndex < plateTextLength;
    charScanIndex++
  ) {
    let currentCharacter = licensePlate[charScanIndex];
    let lowercasedChar = currentCharacter.toLowerCase();
    let charAsciiCode = lowercasedChar.charCodeAt(0);

    if (charAsciiCode >= 97 && charAsciiCode <= 122) {
      plateLetterCounts[charAsciiCode - 97]++;
    }
  }

  let resultShortestWord = "";
  let minimalLengthFound = Infinity;
  let wordsArrayLength = words.length;

  for (
    let wordProcessIndex = 0;
    wordProcessIndex < wordsArrayLength;
    wordProcessIndex++
  ) {
    let currentCandidateWord = words[wordProcessIndex];
    let candidateWordLength = currentCandidateWord.length;
    let candidateLetterFrequencies = new Array(26).fill(0);

    for (
      let letterIndex = 0;
      letterIndex < candidateWordLength;
      letterIndex++
    ) {
      let wordChar = currentCandidateWord[letterIndex];
      let wordCharAsciiCode = wordChar.toLowerCase().charCodeAt(0);
      candidateLetterFrequencies[wordCharAsciiCode - 97]++;
    }

    let isCompletingWord = true;
    for (let alphabetPosition = 0; alphabetPosition < 26; alphabetPosition++) {
      if (
        plateLetterCounts[alphabetPosition] >
        candidateLetterFrequencies[alphabetPosition]
      ) {
        isCompletingWord = false;
        break;
      }
    }

    if (isCompletingWord) {
      if (candidateWordLength < minimalLengthFound) {
        minimalLengthFound = candidateWordLength;
        resultShortestWord = currentCandidateWord;
      }
    }
  }

  return resultShortestWord;
};
