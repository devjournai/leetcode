/**
 * Length Of The Longest Alphabetical Continuous Substring
 * Intuition: To find the longest alphabetical continuous substring, we can traverse the string once, keeping track of the current sequence's length and updating a global maximum length whenever a longer sequence is found or extended. If the current character is not alphabetically consecutive to the previous one, the current sequence breaks and a new one starts.
 * Approach: 1. Initialize `maximumLength` to 1 and `currentSubsequenceLength` to 1. 2. Iterate through the input string starting from the second character. 3. For each character, compare its ASCII value with the previous character's ASCII value. 4. If the difference is exactly 1, increment `currentSubsequenceLength` and update `maximumLength` with the maximum value between `maximumLength` and `currentSubsequenceLength`. 5. Otherwise (if not consecutive), reset `currentSubsequenceLength` to 1. 6. After the loop, return `maximumLength`.
 * Dry Run: s = "abacdef"
 * maximumLength = 1
 * currentSubsequenceLength = 1
 *
 * charIndex = 1 (s[1] = 'b', s[0] = 'a'):
 * 'b'.charCodeAt(0) - 'a'.charCodeAt(0) = 98 - 97 = 1. Consecutive.
 * currentSubsequenceLength becomes 2.
 * maximumLength = Math.max(1, 2) = 2.
 *
 * charIndex = 2 (s[2] = 'a', s[1] = 'b'):
 * 'a'.charCodeAt(0) - 'b'.charCodeAt(0) = 97 - 98 = -1. Not consecutive.
 * currentSubsequenceLength resets to 1.
 *
 * charIndex = 3 (s[3] = 'c', s[2] = 'a'):
 * 'c'.charCodeAt(0) - 'a'.charCodeAt(0) = 99 - 97 = 2. Not consecutive.
 * currentSubsequenceLength resets to 1.
 *
 * charIndex = 4 (s[4] = 'd', s[3] = 'c'):
 * 'd'.charCodeAt(0) - 'c'.charCodeAt(0) = 100 - 99 = 1. Consecutive.
 * currentSubsequenceLength becomes 2.
 * maximumLength = Math.max(2, 2) = 2.
 *
 * charIndex = 5 (s[5] = 'e', s[4] = 'd'):
 * 'e'.charCodeAt(0) - 'd'.charCodeAt(0) = 101 - 100 = 1. Consecutive.
 * currentSubsequenceLength becomes 3.
 * maximumLength = Math.max(2, 3) = 3.
 *
 * charIndex = 6 (s[6] = 'f', s[5] = 'e'):
 * 'f'.charCodeAt(0) - 'e'.charCodeAt(0) = 102 - 101 = 1. Consecutive.
 * currentSubsequenceLength becomes 4.
 * maximumLength = Math.max(3, 4) = 4.
 *
 * Loop finishes. Return maximumLength (4).
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var longestContinuousSubstring = function (s) {
  if (s.length === 0) {
    return 0;
  }

  let maximumLength = 1;
  let currentSubsequenceLength = 1;

  for (let charIndex = 1; charIndex < s.length; charIndex++) {
    const currentCharacterCode = s.charCodeAt(charIndex);
    const previousCharacterCode = s.charCodeAt(charIndex - 1);

    if (currentCharacterCode - previousCharacterCode === 1) {
      currentSubsequenceLength++;
      maximumLength = Math.max(maximumLength, currentSubsequenceLength);
    } else {
      currentSubsequenceLength = 1;
    }
  }

  return maximumLength;
};
