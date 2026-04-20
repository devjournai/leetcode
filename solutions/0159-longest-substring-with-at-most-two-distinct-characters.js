/**
 * Longest Substring With At Most Two Distinct Characters
 * Time Complexity: O(N)
 * Space Complexity: O(1)
*/ 
var lengthOfLongestSubstringTwoDistinct = function(s) {
  const charFrequencies = new Map();
  let longestSubstringValue = 0;
  let startOfWindow = 0;
  let endOfWindow = 0;

  while (endOfWindow < s.length) {
    const currentCharAtEnd = s[endOfWindow];
    charFrequencies.set(currentCharAtEnd, (charFrequencies.get(currentCharAtEnd) || 0) + 1);

    while (charFrequencies.size > 2) {
      const currentCharAtStart = s[startOfWindow];
      charFrequencies.set(currentCharAtStart, charFrequencies.get(currentCharAtStart) - 1);
      if (charFrequencies.get(currentCharAtStart) === 0) {
        charFrequencies.delete(currentCharAtStart);
      }
      startOfWindow++;
    }

    longestSubstringValue = Math.max(longestSubstringValue, endOfWindow - startOfWindow + 1);
    endOfWindow++;
  }

  return longestSubstringValue;
};