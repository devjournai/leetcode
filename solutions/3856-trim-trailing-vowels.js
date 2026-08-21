/**
 * Trim Trailing Vowels
 * Intuition: We traverse the string from the end in reverse order until we encounter the first non-vowel character. Then we return the substring from the beginning of the string up to that position. The time complexity is $O(n)$, where $n$ is the length of the string. The space complexity is $O(1)$.
 * Approach: We traverse the string from the end in reverse order until we encounter the first non-vowel character. Then we return the substring from the beginning of the string up to that position. The time complexity is $O(n)$, where $n$ is the length of the string. The space complexity is $O(1)$.
 * Dry Run: Input: s = &quot;idea&quot; => Output: &quot;id&quot;
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(1))
 */
var trimTrailingVowels = function (s) {
  let i = s.length - 1;
  while (i >= 0 && "aeiou".indexOf(s[i]) !== -1) {
    i--;
  }
  return s.slice(0, i + 1);
};
