/**
 * Unique Length 3 Palindromic Subsequences
 * Intuition: A length-3 palindrome is `x _ x`. For each letter `x`, the unique palindromes are exactly the distinct characters strictly between the first and last occurrence of `x`.
 * Approach: 1. For each of 26 letters, find `firstIdx` and `lastIdx` in `s`. 2. Skip if it does not appear twice. 3. Add the size of the set of characters in `s[firstIdx+1 .. lastIdx-1]` to the answer.
 * Dry Run: s = "aabca".
 *   - 'a': first=0 last=4, inner "abc" → 3 unique
 *   - 'b','c': first==last, skip. Return 3 (`aba`,`aaa`,`aca`).
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var countPalindromicSubsequence = function (s) {
  let palindromicCount = 0;

  const alphabetRange = Array.from({ length: 26 }, (_, indexVal) => indexVal);

  alphabetRange.forEach((charIdentifier) => {
    const currentCharacter = String.fromCharCode(charIdentifier + 97);
    const firstIdx = s.indexOf(currentCharacter);
    const lastIdx = s.lastIndexOf(currentCharacter);

    if (firstIdx === -1 || lastIdx === -1 || firstIdx >= lastIdx) {
      return;
    }

    const charactersBetween = s.substring(firstIdx + 1, lastIdx);
    const uniqueInnerChars = new Set(charactersBetween);
    palindromicCount += uniqueInnerChars.size;
  });

  return palindromicCount;
};
