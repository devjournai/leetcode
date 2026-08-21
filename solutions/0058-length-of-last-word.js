/**
 * Length Of Last Word
 * Intuition: The last word is the run of non-space characters at the end after skipping trailing spaces. Walking from the right avoids splitting the string.
 * Approach: 1. Start at the last index. 2. Skip spaces. 3. Count consecutive non-space characters until a space or the start. 4. Return that count.
 * Dry Run: s = "Hello World  ".
 *   - Skip the two trailing spaces. Count 'd','l','r','o','W' → 5. Return 5.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var lengthOfLastWord = function (s) {
  let stringTotalLength = s.length;
  let lastWordCount = 0;
  let currentIndex = stringTotalLength - 1;

  while (currentIndex >= 0 && s[currentIndex] === " ") {
    currentIndex--;
  }

  while (currentIndex >= 0 && s[currentIndex] !== " ") {
    lastWordCount++;
    currentIndex--;
  }

  return lastWordCount;
};
