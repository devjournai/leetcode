/**
 * Generalized Abbreviation
 * Time Complexity: O(N * 2^N)
 * Space Complexity: O(N * 2^N)
*/
var generateAbbreviations = function (word) {
  const abbreviationList = [];
  const stringLength = word.length;

  function exploreCombinations(currentAbbreviation, characterPointer, consecutiveCount) {
    if (characterPointer === stringLength) {
      let finalAbbreviation = currentAbbreviation;
      if (consecutiveCount > 0) {
        finalAbbreviation += consecutiveCount;
      }
      abbreviationList.push(finalAbbreviation);
      return;
    }

    const nextCharacterPointerForAbbr = characterPointer + 1;
    const nextConsecutiveCountForAbbr = consecutiveCount + 1;
    exploreCombinations(currentAbbreviation, nextCharacterPointerForAbbr, nextConsecutiveCountForAbbr);

    let updatedAbbreviationForm = currentAbbreviation;
    if (consecutiveCount > 0) {
      updatedAbbreviationForm += consecutiveCount;
    }
    updatedAbbreviationForm += word[characterPointer];

    const nextCharacterPointerForInclusion = characterPointer + 1;
    const resetAbbrCount = 0;
    exploreCombinations(updatedAbbreviationForm, nextCharacterPointerForInclusion, resetAbbrCount);
  }

  exploreCombinations('', 0, 0);
  return abbreviationList;
};