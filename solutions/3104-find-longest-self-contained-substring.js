/**
 * Find Longest Self Contained Substring
 * Intuition: A self-contained substring `t = s[start...end]` must contain all its characters entirely within its bounds. This means for any character `c` in `t`, its first occurrence in `s` must be at or after `start`, and its last occurrence in `s` must be at or before `end`.
 * Approach: 1. Pre-process the entire string to record the first and last occurrence index for every character. This information is crucial for quickly checking the self-contained property. 2. Iterate through all possible starting positions of a self-contained substring. For each `start` index, expand a window to the right (`currentScanIndex`). Maintain a `currentWindowReach` which is the maximum `lastOccurrence` index encountered for any character within the current window `[start...currentScanIndex]`. 3. While expanding, if any character `c` within the window has its `firstOccurrence` before `start`, the current `start` is invalid, and we must restart the search from `currentScanIndex + 1`. 4. If the `currentScanIndex` reaches `currentWindowReach` without any invalidation, it means the segment `s[start...currentWindowReach]` is a self-contained substring. If its length is not equal to the full string length, update the `longestSubstringCandidate`. Then, advance `start` to `currentWindowReach + 1` to find the next potential segment.
 * Dry Run: s = "abac"
 * 1. Precomputation:
 *    firstPosition: {'a':0, 'b':1, 'c':3}
 *    lastPosition: {'a':2, 'b':1, 'c':3}
 * 2. Main Logic:
 *    longestSubstringCandidate = -1
 *    windowStartIndex = 0
 *
 *    Outer loop (windowStartIndex = 0): s[0] = 'a'
 *      currentWindowReach = lastPosition.get('a') = 2
 *      innerScanWindowIndex = 0
 *      isBlockBroken = false
 *      Inner loop (innerScanWindowIndex from 0 to 2):
 *        - innerScanWindowIndex = 0 (char 'a'): firstPosition.get('a') (0) < windowStartIndex (0) is false. currentWindowReach = max(2, lastPosition.get('a') (2)) = 2. innerScanWindowIndex becomes 1.
 *        - innerScanWindowIndex = 1 (char 'b'): firstPosition.get('b') (1) < windowStartIndex (0) is false. currentWindowReach = max(2, lastPosition.get('b') (1)) = 2. innerScanWindowIndex becomes 2.
 *        - innerScanWindowIndex = 2 (char 'a'): firstPosition.get('a') (0) < windowStartIndex (0) is false. currentWindowReach = max(2, lastPosition.get('a') (2)) = 2. innerScanWindowIndex becomes 3.
 *      Inner loop ends (innerScanWindowIndex = 3 > currentWindowReach = 2).
 *      isBlockBroken is false.
 *      Length = currentWindowReach - windowStartIndex + 1 = 2 - 0 + 1 = 3.
 *      3 !== s.length (4) is true.
 *      longestSubstringCandidate = max(-1, 3) = 3.
 *      windowStartIndex = currentWindowReach + 1 = 2 + 1 = 3.
 *
 *    Outer loop (windowStartIndex = 3): s[3] = 'c'
 *      currentWindowReach = lastPosition.get('c') = 3
 *      innerScanWindowIndex = 3
 *      isBlockBroken = false
 *      Inner loop (innerScanWindowIndex from 3 to 3):
 *        - innerScanWindowIndex = 3 (char 'c'): firstPosition.get('c') (3) < windowStartIndex (3) is false. currentWindowReach = max(3, lastPosition.get('c') (3)) = 3. innerScanWindowIndex becomes 4.
 *      Inner loop ends (innerScanWindowIndex = 4 > currentWindowReach = 3).
 *      isBlockBroken is false.
 *      Length = currentWindowReach - windowStartIndex + 1 = 3 - 3 + 1 = 1.
 *      1 !== s.length (4) is true.
 *      longestSubstringCandidate = max(3, 1) = 3.
 *      windowStartIndex = currentWindowReach + 1 = 3 + 1 = 4.
 *
 *    Outer loop ends (windowStartIndex = 4, which is not < s.length = 4).
 *
 * 3. Return longestSubstringCandidate = 3.
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */
var maxSubstringLength = function (s) {
  const firstPosition = new Map();
  const lastPosition = new Map();

  for (
    let initialCharacterIndex = 0;
    initialCharacterIndex < s.length;
    initialCharacterIndex++
  ) {
    const currentCharForMapping = s[initialCharacterIndex];
    if (!firstPosition.has(currentCharForMapping)) {
      firstPosition.set(currentCharForMapping, initialCharacterIndex);
    }
    lastPosition.set(currentCharForMapping, initialCharacterIndex);
  }

  let longestSubstringCandidate = -1;
  let windowStartIndex = 0;

  while (windowStartIndex < s.length) {
    let currentWindowReach = lastPosition.get(s[windowStartIndex]);
    let innerScanWindowIndex = windowStartIndex;
    let isBlockBroken = false;

    while (
      innerScanWindowIndex <= currentWindowReach &&
      innerScanWindowIndex < s.length
    ) {
      const innerCharacter = s[innerScanWindowIndex];

      if (firstPosition.get(innerCharacter) < windowStartIndex) {
        windowStartIndex = innerScanWindowIndex + 1;
        isBlockBroken = true;
        break;
      }

      currentWindowReach = Math.max(
        currentWindowReach,
        lastPosition.get(innerCharacter),
      );
      innerScanWindowIndex++;
    }

    if (isBlockBroken) {
      continue;
    } else {
      const currentBlockLength = currentWindowReach - windowStartIndex + 1;
      if (currentBlockLength !== s.length) {
        longestSubstringCandidate = Math.max(
          longestSubstringCandidate,
          currentBlockLength,
        );
      }
      windowStartIndex = currentWindowReach + 1;
    }
  }

  return longestSubstringCandidate;
};
