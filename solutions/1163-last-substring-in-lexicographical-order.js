/**
 * Last Substring In Lexicographical Order
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
