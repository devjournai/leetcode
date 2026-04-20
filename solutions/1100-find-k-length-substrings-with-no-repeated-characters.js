/**
 * Find K Length Substrings With No Repeated Characters
 * Time Complexity: O(N)
 * Space Complexity: O(min(K, A))
 */
var numKLenSubstrNoRepeats = function (s, k) {
  if (k > s.length || k === 0) {
    return 0;
  }

  let validSubstringsFound = 0;
  const characterOccurrences = new Map();

  let currentWindowStart = 0;
  let currentWindowEnd = 0;

  while (currentWindowEnd < s.length) {
    const characterAtEnd = s[currentWindowEnd];
    characterOccurrences.set(
      characterAtEnd,
      (characterOccurrences.get(characterAtEnd) || 0) + 1,
    );

    if (currentWindowEnd - currentWindowStart + 1 === k) {
      if (characterOccurrences.size === k) {
        validSubstringsFound++;
      }

      const characterAtStart = s[currentWindowStart];
      let freqOfStartChar = characterOccurrences.get(characterAtStart);
      freqOfStartChar--;

      if (freqOfStartChar === 0) {
        characterOccurrences.delete(characterAtStart);
      } else {
        characterOccurrences.set(characterAtStart, freqOfStartChar);
      }

      currentWindowStart++;
    }

    currentWindowEnd++;
  }

  return validSubstringsFound;
};
