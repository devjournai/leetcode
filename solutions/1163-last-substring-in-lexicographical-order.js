/**
 * Last Substring In Lexicographical Order
 * Intuition: The last substring is the suffix starting at the leftmost occurrence of the overall lexicographically largest suffix. Two-pointer Duval-style comparison finds that start in linear time.
 * Approach: 1. i=0 is the best start, j=1 a challenger, k matching length. 2. If s[i+k]==s[j+k], k++. 3. If s[i+k]<s[j+k], move i to max(i+k+1,j) and reset j=i+1. 4. Else skip j by k+1. 5. Return s.substring(i).
 * Dry Run: s = "abab".
 *   - Compare suffix 0 "abab" vs 1 "bab": 'a'<'b' so i becomes 1. Remaining challengers lose.
 *   - Answer "bab".
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var lastSubstring = function (s) {
  let firstIndex = 0;
  let secondIndex = 1;
  let currentMatchLength = 0;
  const totalStringLength = s.length;

  while (secondIndex + currentMatchLength < totalStringLength) {
    let charFromFirst = s[firstIndex + currentMatchLength];
    let charFromSecond = s[secondIndex + currentMatchLength];

    if (charFromFirst === charFromSecond) {
      currentMatchLength++;
    } else if (charFromFirst < charFromSecond) {
      firstIndex = Math.max(firstIndex + currentMatchLength + 1, secondIndex);
      secondIndex = firstIndex + 1;
      currentMatchLength = 0;
    } else {
      secondIndex += currentMatchLength + 1;
      currentMatchLength = 0;
    }
  }

  return s.substring(firstIndex);
};
