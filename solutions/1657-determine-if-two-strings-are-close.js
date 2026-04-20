/**
 * Determine If Two Strings Are Close
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var closeStrings = function (word1, word2) {
  const stringLengthOne = word1.length;
  const stringLengthTwo = word2.length;

  if (stringLengthOne !== stringLengthTwo) {
    return false;
  }

  const firstCharCodeValue = "a".charCodeAt(0);
  const frequencyCollectionOne = new Array(26).fill(0);

  for (let charIterator = 0; charIterator < stringLengthOne; charIterator++) {
    const currentCharacterCode = word1.charCodeAt(charIterator);
    const alphabetPositionOne = currentCharacterCode - firstCharCodeValue;
    frequencyCollectionOne[alphabetPositionOne]++;
  }

  const frequencyCollectionTwo = new Array(26).fill(0);
  let advancePointer = 0;
  while (advancePointer < stringLengthTwo) {
    const characterValue = word2.charCodeAt(advancePointer);
    const alphabetPositionTwo = characterValue - firstCharCodeValue;
    frequencyCollectionTwo[alphabetPositionTwo]++;
    advancePointer++;
  }

  for (let checkIndex = 0; checkIndex < 26; checkIndex++) {
    const countValueFromOne = frequencyCollectionOne[checkIndex];
    const countValueFromTwo = frequencyCollectionTwo[checkIndex];

    const mismatchCaseOne = countValueFromOne === 0 && countValueFromTwo !== 0;
    const mismatchCaseTwo = countValueFromOne !== 0 && countValueFromTwo === 0;

    if (mismatchCaseOne || mismatchCaseTwo) {
      return false;
    }
  }

  frequencyCollectionOne.sort((a, b) => a - b);
  frequencyCollectionTwo.sort((a, b) => a - b);

  let comparisonIndex = 0;
  while (comparisonIndex < 26) {
    const sortedFrequencyOne = frequencyCollectionOne[comparisonIndex];
    const sortedFrequencyTwo = frequencyCollectionTwo[comparisonIndex];

    if (sortedFrequencyOne !== sortedFrequencyTwo) {
      return false;
    }
    comparisonIndex++;
  }

  return true;
};
