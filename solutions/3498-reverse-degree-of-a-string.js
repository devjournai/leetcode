/**
 * Reverse Degree of a String
 * Intuition: The reverse alphabet position of a letter is 26 - (c - 'a'), i.e. 'a'→26, 'z'→1. The reverse degree multiplies that by the 1-based index and sums over the string.
 * Approach: 1. For each character at index i, add (26 - (s[i]-'a')) * (i+1). 2. Return the total.
 * Dry Run: s = "abc". (26*1) + (25*2) + (24*3) = 26+50+72 = 148.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var reverseDegree = function (s) {
  let reverseDegreeSum = 0;
  for (let i = 0; i < s.length; i++) {
    const reversePos = 26 - (s.charCodeAt(i) - 97);
    reverseDegreeSum += reversePos * (i + 1);
  }
  return reverseDegreeSum;
};
