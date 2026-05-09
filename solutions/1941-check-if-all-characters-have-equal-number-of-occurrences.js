/**
 * Check If All Characters Have Equal Number Of Occurrences
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */
var areOccurrencesEqual = function (s) {
  let charFrequencyMap = new Map();

  for (let characterIndex = 0; characterIndex < s.length; characterIndex++) {
    let individualChar = s[characterIndex];
    let currentCount = charFrequencyMap.get(individualChar) || 0;
    charFrequencyMap.set(individualChar, currentCount + 1);
  }

  if (charFrequencyMap.size === 0) {
    return false;
  }

  let mapKeysIterator = charFrequencyMap.keys();
  let firstKeyInMap = mapKeysIterator.next().value;
  let targetFrequencyValue = charFrequencyMap.get(firstKeyInMap);

  let isEqualAcrossAll = true;

  charFrequencyMap.forEach((occurrenceNumber) => {
    if (occurrenceNumber !== targetFrequencyValue) {
      isEqualAcrossAll = false;
    }
  });

  return isEqualAcrossAll;
};
