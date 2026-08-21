/**
 * Find Longest Awesome Substring
 * Intuition: A substring is palindrome-able iff at most one digit has odd count. XOR bitmasks of digit parities; same mask or mask differing by one bit is awesome.
 * Approach: 1. Map first index of each mask (0 at -1). 2. Toggle the bit of the current digit. 3. Update max length vs the same mask and each of 10 one-bit flips. 4. Record first occurrence.
 * Dry Run: s = "3242415".
 *   - Longest even/one-odd window is "24241" length 5.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var longestAwesome = function (s) {
  let maxLength = 0;
  let currentMaskState = 0;
  const firstOccurrenceMap = new Map();
  firstOccurrenceMap.set(0, -1);

  for (let charIndex = 0; charIndex < s.length; charIndex++) {
    const digitValue = parseInt(s[charIndex]);
    currentMaskState ^= 1 << digitValue;

    if (firstOccurrenceMap.has(currentMaskState)) {
      maxLength = Math.max(
        maxLength,
        charIndex - firstOccurrenceMap.get(currentMaskState)
      );
    }

    for (let bitPos = 0; bitPos < 10; bitPos++) {
      const oddBitToggle = 1 << bitPos;
      const checkedMask = currentMaskState ^ oddBitToggle;
      if (firstOccurrenceMap.has(checkedMask)) {
        maxLength = Math.max(
          maxLength,
          charIndex - firstOccurrenceMap.get(checkedMask)
        );
      }
    }

    if (!firstOccurrenceMap.has(currentMaskState)) {
      firstOccurrenceMap.set(currentMaskState, charIndex);
    }
  }

  return maxLength;
};
