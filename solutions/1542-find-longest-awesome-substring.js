/**
 * Find Longest Awesome Substring
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
        charIndex - firstOccurrenceMap.get(currentMaskState),
      );
    }

    for (let bitPos = 0; bitPos < 10; bitPos++) {
      const oddBitToggle = 1 << bitPos;
      const checkedMask = currentMaskState ^ oddBitToggle;
      if (firstOccurrenceMap.has(checkedMask)) {
        maxLength = Math.max(
          maxLength,
          charIndex - firstOccurrenceMap.get(checkedMask),
        );
      }
    }

    if (!firstOccurrenceMap.has(currentMaskState)) {
      firstOccurrenceMap.set(currentMaskState, charIndex);
    }
  }

  return maxLength;
};
