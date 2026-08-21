/**
 * Binary String With Substrings Representing 1 To N
 * Intuition: The string is valid iff every integer from 1 to n appears as a binary substring.
 * Approach: 1. For each i from 1 to n, convert i to binary. 2. If that bit-string is missing from s, return false. 3. Otherwise return true.
 * Dry Run: s = "0110", n = 3.
 *   - 1 -> "1" found. 2 -> "10" found. 3 -> "11" found. true.
 * Time Complexity: O(n * s.length * log n)
 * Space Complexity: O(log n)
 */
var queryString = function (inputString, targetNumber) {
  for (
    let currentIntegerToCheck = 1;
    currentIntegerToCheck <= targetNumber;
    currentIntegerToCheck++
  ) {
    const binaryRepresentation = currentIntegerToCheck.toString(2);
    if (!inputString.includes(binaryRepresentation)) {
      return false;
    }
  }
  return true;
};
