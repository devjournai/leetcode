/**
 * Maximum Number Of Vowels In A Substring Of Given Length
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxVowels = function (sourceString, subsequenceLength) {
  const englishVowels = new Set(["a", "e", "i", "o", "u"]);
  let currentWindowVowelCount = 0;
  let overallMaxVowels = 0;

  for (
    let initialWindowPointer = 0;
    initialWindowPointer < subsequenceLength;
    initialWindowPointer++
  ) {
    if (englishVowels.has(sourceString[initialWindowPointer])) {
      currentWindowVowelCount++;
    }
  }

  overallMaxVowels = currentWindowVowelCount;

  for (
    let slideAdvancePointer = subsequenceLength;
    slideAdvancePointer < sourceString.length;
    slideAdvancePointer++
  ) {
    const incomingCharacter = sourceString[slideAdvancePointer];
    const outgoingCharacter =
      sourceString[slideAdvancePointer - subsequenceLength];

    if (englishVowels.has(incomingCharacter)) {
      currentWindowVowelCount++;
    }
    if (englishVowels.has(outgoingCharacter)) {
      currentWindowVowelCount--;
    }

    overallMaxVowels = Math.max(overallMaxVowels, currentWindowVowelCount);
  }

  return overallMaxVowels;
};
