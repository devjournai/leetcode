/**
 * Longest Substring With At Least K Repeating Characters
 * Intuition: Any character whose global count is below `k` cannot appear in a valid answer, so it is a hard split point. Recurse on the pieces and take the max.
 * Approach: 1. Empty/`k` too large → 0. 2. Count frequencies. 3. If some `charKey` has count `< k`, split `s` on that character and recurse on each part. 4. If every character meets `k`, the whole string is valid — return `s.length`.
 * Dry Run: s = "aaabb", k = 3.
 *   - a:3, b:2. Split on 'b' → ["aaa",""].
 *   - "aaa" all counts ≥ 3 → length 3. Return 3.
 * Time Complexity: O(N * alpha)
 * Space Complexity: O(N + alpha)
 */
var longestSubstring = function (s, k) {
  if (s.length === 0 || k > s.length) {
    return 0;
  }

  let characterOccurrenceMap = new Map();
  for (let charValue of s) {
    characterOccurrenceMap.set(
      charValue,
      (characterOccurrenceMap.get(charValue) || 0) + 1
    );
  }

  let needsSplitting = false;
  let splittingValue = "";
  characterOccurrenceMap.forEach((currentFrequency, charKey) => {
    if (!needsSplitting && currentFrequency < k) {
      needsSplitting = true;
      splittingValue = charKey;
    }
  });

  if (needsSplitting) {
    let currentMaxLength = 0;
    let substringParts = s.split(splittingValue);
    for (let partIndex = 0; partIndex < substringParts.length; partIndex++) {
      let segmentToProcess = substringParts[partIndex];
      let resultFromSubCall = longestSubstring(segmentToProcess, k);
      if (resultFromSubCall > currentMaxLength) {
        currentMaxLength = resultFromSubCall;
      }
    }
    return currentMaxLength;
  }

  return s.length;
};
