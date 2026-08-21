/**
 * Generalized Abbreviation
 * Intuition: At each index either keep counting a run of abbreviated letters or flush that count (if any) and emit the letter. Every path is one abbreviation.
 * Approach: 1. Recurse with (built string, index, consecutiveCount). 2. At index === length, append the pending count if > 0 and store the string. 3. Branch: skip the letter (count + 1) or write count then word[index] and reset count to 0. 4. Start from ("", 0, 0) and return the list.
 * Dry Run: word = "ab".
 *   - Skip, skip → "2". Skip then emit b → "1b". Emit a then skip → "a1". Emit both → "ab".
 * Time Complexity: O(N * 2^N)
 * Space Complexity: O(N * 2^N)
 */
var generateAbbreviations = function (word) {
  const abbreviationList = [];
  const stringLength = word.length;

  function exploreCombinations(
    currentAbbreviation,
    characterPointer,
    consecutiveCount
  ) {
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
    exploreCombinations(
      currentAbbreviation,
      nextCharacterPointerForAbbr,
      nextConsecutiveCountForAbbr
    );

    let updatedAbbreviationForm = currentAbbreviation;
    if (consecutiveCount > 0) {
      updatedAbbreviationForm += consecutiveCount;
    }
    updatedAbbreviationForm += word[characterPointer];

    const nextCharacterPointerForInclusion = characterPointer + 1;
    const resetAbbrCount = 0;
    exploreCombinations(
      updatedAbbreviationForm,
      nextCharacterPointerForInclusion,
      resetAbbrCount
    );
  }

  exploreCombinations("", 0, 0);
  return abbreviationList;
};
