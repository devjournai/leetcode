/**
 * Maximum Number Of Occurrences Of A Substring
 * Intuition: Any valid longer substring contains a valid minSize prefix, so the max frequency is achieved by some minSize window with at most maxLetters distinct chars.
 * Approach: 1. Slide every substring of length minSize. 2. If its Set size <= maxLetters, increment that string’s count in a map. 3. Return the maximum map value (or 0).
 * Dry Run: s="aababcaab", maxLetters=2, minSize=3, maxSize=4
 *   windows of 3 with <=2 distinct: "aab" appears twice, among others. Max is 2.
 * Time Complexity: O(N * minSize)
 * Space Complexity: O(N * minSize)
 */
var maxFreq = function (s, maxLetters, minSize, maxSize) {
  const substringFrequencies = new Map();
  const inputStringLength = s.length;

  for (
    let windowStart = 0;
    windowStart <= inputStringLength - minSize;
    windowStart++
  ) {
    const currentWindowString = s.substring(windowStart, windowStart + minSize);

    const characterSetInWindow = new Set();
    for (
      let charIndex = 0;
      charIndex < currentWindowString.length;
      charIndex++
    ) {
      characterSetInWindow.add(currentWindowString[charIndex]);
    }

    if (characterSetInWindow.size <= maxLetters) {
      const existingCount = substringFrequencies.get(currentWindowString) || 0;
      substringFrequencies.set(currentWindowString, existingCount + 1);
    }
  }

  let maximumFrequencyFound = 0;
  for (const currentCount of substringFrequencies.values()) {
    if (currentCount > maximumFrequencyFound) {
      maximumFrequencyFound = currentCount;
    }
  }

  return maximumFrequencyFound;
};
