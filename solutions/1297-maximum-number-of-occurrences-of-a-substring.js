/**
 * Maximum Number Of Occurrences Of A Substring
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
