/**
 * Sum Of Beauty Of All Substrings
 * Intuition: Beauty of a substring is max letter frequency minus min (among letters that appear). Expanding every start index with a frequency map lets each new end update those extremes in O(alphabet).
 * Approach: 1. For each `startIdx`, reset `currentFrequencies`. 2. Extend `endIdx`, increment the new char. 3. Scan map values for max and min counts and add their difference to `totalBeautySum`. 4. Return the sum.
 * Dry Run: s = "aabcb".
 *   - Substring "aabc" beauty 2-1=1, "abcb" beauty 2-1=1, plus zeros from uniform pieces. Total 5.
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
        (currentFrequencies.get(charValue) || 0) + 1
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
