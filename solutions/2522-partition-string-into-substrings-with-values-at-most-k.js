/**
 * Partition String Into Substrings With Values At Most K
 * Intuition: A greedy approach works best: try to make each substring as long as possible without exceeding K. If adding a digit makes the current substring value exceed K, a new substring must start with that digit.
 * Approach: 1. Initialize a counter for substrings and a variable to track the value of the current substring being built. 2. Iterate through each digit of the input string. 3. For each digit, attempt to append it to the current substring's value. 4. If the new value is within K, update the current substring's value. 5. If the new value exceeds K, increment the substring counter and start a new substring with the current digit. 6. Handle the edge case where a single digit itself is greater than K, which makes a valid partition impossible.
 * Dry Run: s = "165462", k = 60
 *   numberOfSubstrings = 1, runningValue = 0
 *   idx = 0, charDigit = '1', numericDigit = 1
 *     candidateValue = 0 * 10 + 1 = 1. 1 <= 60. runningValue = 1.
 *   idx = 1, charDigit = '6', numericDigit = 6
 *     candidateValue = 1 * 10 + 6 = 16. 16 <= 60. runningValue = 16.
 *   idx = 2, charDigit = '5', numericDigit = 5
 *     candidateValue = 16 * 10 + 5 = 165. 165 > 60.
 *     numericDigit = 5 <= 60. numberOfSubstrings = 2. runningValue = 5.
 *   idx = 3, charDigit = '4', numericDigit = 4
 *     candidateValue = 5 * 10 + 4 = 54. 54 <= 60. runningValue = 54.
 *   idx = 4, charDigit = '6', numericDigit = 6
 *     candidateValue = 54 * 10 + 6 = 546. 546 > 60.
 *     numericDigit = 6 <= 60. numberOfSubstrings = 3. runningValue = 6.
 *   idx = 5, charDigit = '2', numericDigit = 2
 *     candidateValue = 6 * 10 + 2 = 62. 62 > 60.
 *     numericDigit = 2 <= 60. numberOfSubstrings = 4. runningValue = 2.
 *   End loop. Return 4.
 * Time Complexity: O(N) where N is the length of string s.
 * Space Complexity: O(1)
 */
var minimumPartition = function (s, k) {
  let numberOfSubstrings = 1;
  let runningValue = 0;

  for (let indexValue = 0; indexValue < s.length; indexValue++) {
    const charDigit = s[indexValue];
    const numericDigit = Number(charDigit);

    const candidateValue = runningValue * 10 + numericDigit;

    if (candidateValue <= k) {
      runningValue = candidateValue;
    } else {
      if (numericDigit > k) {
        return -1;
      }
      runningValue = numericDigit;
      numberOfSubstrings++;
    }
  }

  return numberOfSubstrings;
};
