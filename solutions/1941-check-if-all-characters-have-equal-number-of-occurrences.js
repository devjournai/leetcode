/**
 * Check If All Characters Have Equal Number Of Occurrences
 * Intuition: A string is "good" when every distinct character appears the same number of times. Count frequencies and compare them all to the first character's count.
 * Approach: 1. Fill a Map of character counts. 2. Empty map → false. 3. Take the first key's frequency as `targetFrequencyValue`. 4. If any occurrence differs, set the flag false. Return the flag.
 * Dry Run: s = "abacbc".
 *   - a:2, b:2, c:2 → all equal → true.
 * Dry Run: s = "aaabb" → a:3 b:2 → false.
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
