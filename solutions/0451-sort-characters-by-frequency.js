/**
 * Sort Characters By Frequency
 * Intuition: Count each character, sort unique symbols by frequency descending, then repeat each symbol that many times.
 * Approach: 1. Fill `characterCounts`. 2. Push `{symbol, frequency}` into an array. 3. Sort by `itemTwo.frequency - itemOne.frequency`. 4. Reduce with `symbol.repeat(frequency)`. 5. Return the string.
 * Dry Run: "tree". Counts t:1,r:1,e:2. Sort e first then t,r. Result "eetr" or "eert".
 * Time Complexity: O(N + U log U)
 * Space Complexity: O(N + U)
 */
var frequencySort = function (s) {
  const characterCounts = {};

  for (const currentCharacter of s) {
    characterCounts[currentCharacter] =
      (characterCounts[currentCharacter] || 0) + 1;
  }

  const frequencyDataArray = [];
  for (const keyChar in characterCounts) {
    frequencyDataArray.push({
      symbol: keyChar,
      frequency: characterCounts[keyChar],
    });
  }

  const sortedCharacterData = frequencyDataArray.sort(
    (itemOne, itemTwo) => itemTwo.frequency - itemOne.frequency
  );

  const finalString = sortedCharacterData.reduce(
    (resultBuilder, charFrequencyEntry) => {
      return (
        resultBuilder +
        charFrequencyEntry.symbol.repeat(charFrequencyEntry.frequency)
      );
    },
    ""
  );

  return finalString;
};
