/**
 * Take K Of Each Character From Left And Right
 * Intuition: This problem asks for the minimum number of characters to take from the ends of a string to satisfy a count of 'k' for each character type ('a', 'b', 'c'). This is equivalent to finding the *longest contiguous subarray* in the middle of the string that we *don't* take. If we keep this middle subarray, the characters *outside* it (which are taken) must collectively contain at least 'k' of each 'a', 'b', and 'c'.
 * Approach: 1. First, count the total occurrences of each character ('a', 'b', 'c') in the entire string. If any character's total count is less than 'k', it's impossible to satisfy the condition, so return -1. 2. Define target counts for each character type. These target counts represent the *maximum* number of each character that can be present *within* our middle (non-taken) subarray. For instance, if total 'a's are `totalA` and we need `k` 'a's to be taken, then at most `totalA - k` 'a's can remain in the middle subarray. 3. Use a sliding window approach to find the longest subarray `s[windowLeftBoundary...windowRightBoundary]` such that the counts of 'a', 'b', and 'c' within this window do not exceed their respective target counts (`totalA - k`, `totalB - k`, `totalC - k`). 4. Expand the `windowRightBoundary` one character at a time, adding the character to `currentSlidingWindowCounts`. If any character count in `currentSlidingWindowCounts` exceeds its target, shrink the window from the `windowLeftBoundary` until the condition is met again. 5. Keep track of the `maximumSlidingWindow` size encountered. 6. The minimum minutes needed will be the total length of the string minus the `maximumSlidingWindow` size.
 * Dry Run: s = "aababcabc", k = 2
 *   1. stringLength = 9. totalCharacterCounts = {a: 3, b: 3, c: 3}.
 *   2. k=2. All counts (3) are >= k (2). Possible.
 *   3. Set target counts: requiredA = 3-2=1, requiredB = 3-2=1, requiredC = 3-2=1.
 *   4. Initialize maximumSlidingWindow = 0, windowLeftBoundary = 0, currentSlidingWindowCounts = {a:0, b:0, c:0}.
 *   5. Iterate windowRightBoundary from 0 to 8:
 *      - windowRightBoundary = 0, char='a': currentSlidingWindowCounts={a:1, b:0, c:0}. (1 <= 1, 0 <= 1, 0 <= 1). Valid. maximumSlidingWindow = max(0, 0-0+1) = 1.
 *      - windowRightBoundary = 1, char='a': currentSlidingWindowCounts={a:2, b:0, c:0}. (2 > 1). Invalid for 'a'.
 *        - Shrink: currentSlidingWindowCounts[s[windowLeftBoundary]]-- (s[0]='a'). currentSlidingWindowCounts={a:1, b:0, c:0}. windowLeftBoundary = 1. (1 <= 1). Valid.
 *        maximumSlidingWindow = max(1, 1-1+1) = 1.
 *      - windowRightBoundary = 2, char='b': currentSlidingWindowCounts={a:1, b:1, c:0}. (1 <= 1, 1 <= 1, 0 <= 1). Valid. maximumSlidingWindow = max(1, 2-1+1) = 2.
 *      - windowRightBoundary = 3, char='a': currentSlidingWindowCounts={a:2, b:1, c:0}. (2 > 1). Invalid for 'a'.
 *        - Shrink: currentSlidingWindowCounts[s[windowLeftBoundary]]-- (s[1]='a'). currentSlidingWindowCounts={a:1, b:1, c:0}. windowLeftBoundary = 2. (1 <= 1). Valid.
 *        maximumSlidingWindow = max(2, 3-2+1) = 2.
 *      - windowRightBoundary = 4, char='b': currentSlidingWindowCounts={a:1, b:2, c:0}. (2 > 1). Invalid for 'b'.
 *        - Shrink: currentSlidingWindowCounts[s[windowLeftBoundary]]-- (s[2]='b'). currentSlidingWindowCounts={a:1, b:1, c:0}. windowLeftBoundary = 3. (1 <= 1). Valid.
 *        maximumSlidingWindow = max(2, 4-3+1) = 2.
 *      - windowRightBoundary = 5, char='c': currentSlidingWindowCounts={a:1, b:1, c:1}. (1 <= 1, 1 <= 1, 1 <= 1). Valid. maximumSlidingWindow = max(2, 5-3+1) = 3.
 *      - windowRightBoundary = 6, char='a': currentSlidingWindowCounts={a:2, b:1, c:1}. (2 > 1). Invalid for 'a'.
 *        - Shrink: currentSlidingWindowCounts[s[windowLeftBoundary]]-- (s[3]='a'). currentSlidingWindowCounts={a:1, b:1, c:1}. windowLeftBoundary = 4. (1 <= 1). Valid.
 *        maximumSlidingWindow = max(3, 6-4+1) = 3.
 *      - windowRightBoundary = 7, char='b': currentSlidingWindowCounts={a:1, b:2, c:1}. (2 > 1). Invalid for 'b'.
 *        - Shrink: currentSlidingWindowCounts[s[windowLeftBoundary]]-- (s[4]='b'). currentSlidingWindowCounts={a:1, b:1, c:1}. windowLeftBoundary = 5. (1 <= 1). Valid.
 *        maximumSlidingWindow = max(3, 7-5+1) = 3.
 *      - windowRightBoundary = 8, char='c': currentSlidingWindowCounts={a:1, b:1, c:2}. (2 > 1). Invalid for 'c'.
 *        - Shrink: currentSlidingWindowCounts[s[windowLeftBoundary]]-- (s[5]='c'). currentSlidingWindowCounts={a:1, b:1, c:1}. windowLeftBoundary = 6. (1 <= 1). Valid.
 *        maximumSlidingWindow = max(3, 8-6+1) = 3.
 *   6. Final result: stringLength - maximumSlidingWindow = 9 - 3 = 6.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var takeCharacters = function (s, k) {
  const stringLength = s.length;
  const totalCharacterCounts = { a: 0, b: 0, c: 0 };

  for (
    let characterIndex = 0;
    characterIndex < stringLength;
    characterIndex++
  ) {
    const currentCharValue = s[characterIndex];
    totalCharacterCounts[currentCharValue]++;
  }

  if (
    totalCharacterCounts.a < k ||
    totalCharacterCounts.b < k ||
    totalCharacterCounts.c < k
  ) {
    return -1;
  }

  let maximumSlidingWindow = 0;
  let windowLeftBoundary = 0;
  const currentSlidingWindowCounts = { a: 0, b: 0, c: 0 };

  const requiredA = totalCharacterCounts.a - k;
  const requiredB = totalCharacterCounts.b - k;
  const requiredC = totalCharacterCounts.c - k;

  for (
    let windowRightBoundary = 0;
    windowRightBoundary < stringLength;
    windowRightBoundary++
  ) {
    const charInWindow = s[windowRightBoundary];
    currentSlidingWindowCounts[charInWindow]++;

    while (
      currentSlidingWindowCounts.a > requiredA ||
      currentSlidingWindowCounts.b > requiredB ||
      currentSlidingWindowCounts.c > requiredC
    ) {
      const charToRemove = s[windowLeftBoundary];
      currentSlidingWindowCounts[charToRemove]--;
      windowLeftBoundary++;
    }

    maximumSlidingWindow = Math.max(
      maximumSlidingWindow,
      windowRightBoundary - windowLeftBoundary + 1
    );
  }

  return stringLength - maximumSlidingWindow;
};
