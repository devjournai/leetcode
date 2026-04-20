/**
 * Goat Latin
 * Time Complexity: O(N + W^2)
 * Space Complexity: O(N + W^2)
 */
var toGoatLatin = function (S) {
  const vowelLookup = new Set(["a", "e", "i", "o", "u"]);
  const wordsArray = S.split(" ");
  const transformedParts = [];

  for (
    let iterationIndex = 0;
    iterationIndex < wordsArray.length;
    iterationIndex++
  ) {
    let singleWord = wordsArray[iterationIndex];
    const leadingChar = singleWord[0];
    const lowerCaseLeadingChar = leadingChar.toLowerCase();

    let modifiedWord;
    if (vowelLookup.has(lowerCaseLeadingChar)) {
      modifiedWord = singleWord + "ma";
    } else {
      modifiedWord = singleWord.substring(1) + leadingChar + "ma";
    }

    const aSuffix = "a".repeat(iterationIndex + 1);
    const finalWordForm = modifiedWord + aSuffix;
    transformedParts.push(finalWordForm);
  }

  const composedSentence = transformedParts.join(" ");
  return composedSentence;
};
