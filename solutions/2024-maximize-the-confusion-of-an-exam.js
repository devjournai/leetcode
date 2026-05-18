/**
 * Maximize The Confusion Of An Exam
 * Intuition: This problem asks for the longest subarray where, after at most k modifications, all characters are identical. This is a classic sliding window problem. We are looking for the longest window where the count of the minority character is at most k.
 * Approach:
 * 1. Initialize `longestConsecutive` to 0, `windowStart` to 0, and `charFrequencies` object to store counts of 'T' and 'F' within the current window.
 * 2. Iterate `windowEnd` from 0 to the end of the `answerKeyInput` string.
 * 3. For each `answerKeyInput[windowEnd]`, increment its count in `charFrequencies`.
 * 4. In a nested `while` loop, check if the current window is invalid. A window is invalid if `currentWindowSize - maxCharCount > maxFlipsAllowed`. Here, `currentWindowSize` is `windowEnd - windowStart + 1`, and `maxCharCount` is the count of the more frequent character ('T' or 'F') in the current window. The term `currentWindowSize - maxCharCount` represents the number of characters that are *not* the majority character, which are the ones that would need to be flipped.
 * 5. If the window is invalid, shrink it from the left: decrement the count of `answerKeyInput[windowStart]` in `charFrequencies` and increment `windowStart`. The `while` loop continues until the window becomes valid.
 * 6. After each valid window (or after making an invalid window valid by shrinking), update `longestConsecutive` with `Math.max(longestConsecutive, currentWindowSize)`.
 * 7. Return `longestConsecutive`.
 * Dry Run: answerKeyInput = "TTFTT", maxFlipsAllowed = 1
 * Initial: longestConsecutive = 0, windowStart = 0, charFrequencies = {'T': 0, 'F': 0}
 *
 * windowEnd = 0 ('T'):
 *   charFrequencies = {'T': 1, 'F': 0}
 *   currentWindowSize = 1, maxCharCount = 1. (1 - 1) <= 1 (0 <= 1). Valid.
 *   longestConsecutive = max(0, 1) = 1.
 *
 * windowEnd = 1 ('T'):
 *   charFrequencies = {'T': 2, 'F': 0}
 *   currentWindowSize = 2, maxCharCount = 2. (2 - 2) <= 1 (0 <= 1). Valid.
 *   longestConsecutive = max(1, 2) = 2.
 *
 * windowEnd = 2 ('F'):
 *   charFrequencies = {'T': 2, 'F': 1}
 *   currentWindowSize = 3, maxCharCount = 2. (3 - 2) <= 1 (1 <= 1). Valid.
 *   longestConsecutive = max(2, 3) = 3.
 *
 * windowEnd = 3 ('T'):
 *   charFrequencies = {'T': 3, 'F': 1}
 *   currentWindowSize = 4, maxCharCount = 3. (4 - 3) <= 1 (1 <= 1). Valid.
 *   longestConsecutive = max(3, 4) = 4.
 *
 * windowEnd = 4 ('T'):
 *   charFrequencies = {'T': 4, 'F': 1}
 *   currentWindowSize = 5, maxCharCount = 4. (5 - 4) <= 1 (1 <= 1). Valid.
 *   longestConsecutive = max(4, 5) = 5.
 *
 * End of loop. Return 5.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxConsecutiveAnswers = function (answerKeyInput, maxFlipsAllowed) {
  let longestConsecutive = 0;
  let windowStart = 0;
  const charFrequencies = { T: 0, F: 0 };

  for (let windowEnd = 0; windowEnd < answerKeyInput.length; windowEnd++) {
    const currentChar = answerKeyInput[windowEnd];
    charFrequencies[currentChar]++;

    let currentWindowSize = windowEnd - windowStart + 1;
    let maxCharCount = Math.max(charFrequencies["T"], charFrequencies["F"]);

    while (currentWindowSize - maxCharCount > maxFlipsAllowed) {
      const charToShrink = answerKeyInput[windowStart];
      charFrequencies[charToShrink]--;
      windowStart++;

      currentWindowSize = windowEnd - windowStart + 1;
      maxCharCount = Math.max(charFrequencies["T"], charFrequencies["F"]);
    }

    longestConsecutive = Math.max(longestConsecutive, currentWindowSize);
  }

  return longestConsecutive;
};
