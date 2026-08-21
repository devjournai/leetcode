/**
 * Find K Length Substrings With No Repeated Characters
 * Intuition: A window of length k has no repeats iff it contains k distinct characters. A sliding frequency map counts such windows in one pass.
 * Approach: 1. If k>n or k=0, return 0. 2. Expand right, increment counts. 3. When width=k, if map.size==k increment; then decrement/remove the left char and slide. 4. Return the count.
 * Dry Run: s=havefunonleetcode, k=5. Windows like havef (5 distinct) count; later funon has repeats and does not.
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
      (characterOccurrences.get(characterAtEnd) || 0) + 1
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
