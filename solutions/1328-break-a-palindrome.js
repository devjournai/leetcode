/**
 * Break A Palindrome
 * Intuition: The lexicographically smallest non-palindrome comes from changing the leftmost non-'a' in the first half to 'a'. If the first half is all 'a's, bump the last char to 'b'.
 * Approach: 1. Length 1 cannot be broken → "". 2. Scan indices < n/2 for a non-a and set it to 'a'. 3. Else set the last character to 'b'. 4. Join and return.
 * Dry Run: "abccba" → change first 'b' → "aaccba". "a" → "".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var breakPalindrome = function (originalPalindromicString) {
  const stringTotalLength = originalPalindromicString.length;

  if (stringTotalLength === 1) {
    return "";
  }

  const mutableCharArray = originalPalindromicString.split("");

  let traversalIndex = 0;
  const midpointExclusive = Math.floor(stringTotalLength / 2);

  let firstNonAIndex = -1;

  while (traversalIndex < midpointExclusive) {
    if (mutableCharArray[traversalIndex] !== "a") {
      firstNonAIndex = traversalIndex;
      break;
    }
    traversalIndex++;
  }

  if (firstNonAIndex !== -1) {
    mutableCharArray[firstNonAIndex] = "a";
  } else {
    const finalCharacterPosition = stringTotalLength - 1;
    mutableCharArray[finalCharacterPosition] = "b";
  }

  return mutableCharArray.join("");
};
