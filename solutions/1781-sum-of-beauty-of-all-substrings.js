/**
 * Sum Of Beauty Of All Substrings
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 */
var beautySum = function (s) {
  let totalBeautySum = 0;
  let stringLength = s.length;

  for (let startIdx = 0; startIdx < stringLength; startIdx++) {
    let currentFrequencies = new Map();
    for (let endIdx = startIdx; endIdx < stringLength; endIdx++) {
      let charValue = s[endIdx];
      currentFrequencies.set(
        charValue,
        (currentFrequencies.get(charValue) || 0) + 1,
      );

      let maxFrequencyInSubstring = 0;
      let minFrequencyInSubstring = Infinity;

      for (const charCountVal of currentFrequencies.values()) {
        if (charCountVal > maxFrequencyInSubstring) {
          maxFrequencyInSubstring = charCountVal;
        }
        if (charCountVal < minFrequencyInSubstring) {
          minFrequencyInSubstring = charCountVal;
        }
      }
      totalBeautySum += maxFrequencyInSubstring - minFrequencyInSubstring;
    }
  }

  return totalBeautySum;
};
