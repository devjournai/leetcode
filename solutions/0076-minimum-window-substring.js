/**
 * Minimum Window Substring
 * Intuition: Grow a window until it covers every character of t (tracked by a need count), then shrink from the left to the shortest covering window, repeating as the right pointer advances.
 * Approach: 1. Count t into a 128-slot frequency array; `charactersNeeded` starts as t.length. 2. Expand `windowEnd`; decrement the freq of s[end] and, if that char was still needed, decrement `charactersNeeded`. 3. While need is 0, record the min window, then increment the leaving char’s freq and bump need if it goes positive. 4. Return the recorded substring or "".
 * Dry Run: s="ADOBECODEBANC", t="ABC" → first cover at "ADOBEC", shrink/expand through "CODEBA", best "BANC"
 * Time Complexity: O(S + T)
 * Space Complexity: O(1)
 */
var minWindow = function (s, t) {
  const characterFrequencies = new Array(128).fill(0);
  let charactersNeeded = t.length;

  for (let charIterator = 0; charIterator < t.length; charIterator++) {
    characterFrequencies[t.charCodeAt(charIterator)]++;
  }

  let minSubstringStart = 0;
  let minSubstringLength = Infinity;
  let windowBegin = 0;

  for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
    const currentCharCode = s.charCodeAt(windowEnd);
    if (characterFrequencies[currentCharCode] > 0) {
      charactersNeeded--;
    }
    characterFrequencies[currentCharCode]--;

    while (charactersNeeded === 0) {
      const currentWindowSize = windowEnd - windowBegin + 1;
      if (currentWindowSize < minSubstringLength) {
        minSubstringLength = currentWindowSize;
        minSubstringStart = windowBegin;
      }

      const charToExitCode = s.charCodeAt(windowBegin);
      characterFrequencies[charToExitCode]++;
      if (characterFrequencies[charToExitCode] > 0) {
        charactersNeeded++;
      }
      windowBegin++;
    }
  }

  if (minSubstringLength === Infinity) {
    return "";
  } else {
    return s.substring(
      minSubstringStart,
      minSubstringStart + minSubstringLength
    );
  }
};
