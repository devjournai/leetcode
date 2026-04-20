/**
* Sort Characters By Frequency
* Time Complexity: O(N + U log U)
* Space Complexity: O(N + U)
*/
var frequencySort = function (s) {
  const characterCounts = {};

  for (const currentCharacter of s) {
    characterCounts[currentCharacter] = (characterCounts[currentCharacter] || 0) + 1;
  }

  const frequencyDataArray = [];
  for (const keyChar in characterCounts) {
    frequencyDataArray.push({ symbol: keyChar, frequency: characterCounts[keyChar] });
  }

  const sortedCharacterData = frequencyDataArray.sort((itemOne, itemTwo) => itemTwo.frequency - itemOne.frequency);

  const finalString = sortedCharacterData.reduce((resultBuilder, charFrequencyEntry) => {
    return resultBuilder + charFrequencyEntry.symbol.repeat(charFrequencyEntry.frequency);
  }, '');

  return finalString;
};