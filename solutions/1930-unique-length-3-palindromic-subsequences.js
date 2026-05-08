/**
 * Unique Length 3 Palindromic Subsequences
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
