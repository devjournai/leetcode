/**
 * Valid Palindrome Iv
 * Intuition: A string can be made into a palindrome by changing characters. Each pair of differing characters at symmetric positions (s[i] and s[n-1-i]) requires one operation to make them match. We need to count these differing pairs and check if the total count is at most two.
 * Approach: 1. Determine the string's length. 2. Initialize a counter for character deviations. 3. Iterate from the beginning of the string up to its midpoint (excluding the middle character for odd-length strings). 4. In each iteration, compare the character at the current index with its symmetric counterpart from the end of the string. 5. If the characters do not match, increment the deviation counter. 6. After checking all symmetric pairs, return true if the deviation counter is less than or equal to two, otherwise return false.
 * Dry Run: s = "abca"
 *   1. stringLength = 4.
 *   2. deviationCount = 0.
 *   3. Loop from indexPointer = 0 to Math.floor(4 / 2) - 1 = 1.
 *      - indexPointer = 0: s[0] ('a') vs s[4 - 1 - 0] (s[3], 'a'). They match. deviationCount remains 0.
 *      - indexPointer = 1: s[1] ('b') vs s[4 - 1 - 1] (s[2], 'c'). They do not match. deviationCount becomes 1.
 *   4. Loop finishes.
 *   5. Return deviationCount (1) <= 2, which is true.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var makePalindrome = function (s) {
  const totalLength = s.length;
  let deviationCount = 0;

  for (
    let indexPointer = 0;
    indexPointer < Math.floor(totalLength / 2);
    indexPointer++
  ) {
    if (s[indexPointer] !== s[totalLength - 1 - indexPointer]) {
      deviationCount++;
    }
  }

  return deviationCount <= 2;
};
