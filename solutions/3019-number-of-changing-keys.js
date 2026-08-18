/**
 * Number Of Changing Keys
 * Intuition: The problem requires counting how many times a user switches to a different key while typing, treating 'a' and 'A' as the same key. This implies a need to compare adjacent characters in the string, ignoring their case, and increment a counter whenever they differ.
 * Approach: 1. Initialize an integer variable, `totalKeyChanges`, to zero. This variable will store our final count. 2. Determine the length of the input string `s` and store it in `stringLength` for efficient loop boundary checking. 3. Iterate through the string using a `for` loop starting from the first character (index 0) up to, but not including, the last character (i.e., `loopIndex` goes from 0 to `stringLength - 2`). 4. Inside the loop, for each `loopIndex`, retrieve the character at `s[loopIndex]` (let's call it `firstChar`) and the character at `s[loopIndex + 1]` (let's call it `secondChar`). 5. Convert both `firstChar` and `secondChar` to their lowercase equivalents (e.g., using `toLowerCase()`) to ensure case-insensitive comparison. Store these in `normalizedFirstChar` and `normalizedSecondChar`. 6. Compare `normalizedFirstChar` and `normalizedSecondChar`. If they are not equal, it signifies a key change, so increment `totalKeyChanges`. 7. After the loop completes, return the final value of `totalKeyChanges`. For an input string of length 1, the loop condition `loopIndex < stringLength - 1` will immediately be false, and `totalKeyChanges` (0) will be correctly returned.
 * Dry Run: s = "abAB"
 * totalKeyChanges = 0
 * stringLength = 4
 *
 * loopIndex = 0:
 *   firstChar = s[0] = 'a'
 *   secondChar = s[1] = 'b'
 *   normalizedFirstChar = 'a'.toLowerCase() = 'a'
 *   normalizedSecondChar = 'b'.toLowerCase() = 'b'
 *   'a' !== 'b' is true.
 *   totalKeyChanges becomes 1.
 *
 * loopIndex = 1:
 *   firstChar = s[1] = 'b'
 *   secondChar = s[2] = 'A'
 *   normalizedFirstChar = 'b'.toLowerCase() = 'b'
 *   normalizedSecondChar = 'A'.toLowerCase() = 'a'
 *   'b' !== 'a' is true.
 *   totalKeyChanges becomes 2.
 *
 * loopIndex = 2:
 *   firstChar = s[2] = 'A'
 *   secondChar = s[3] = 'B'
 *   normalizedFirstChar = 'A'.toLowerCase() = 'a'
 *   normalizedSecondChar = 'B'.toLowerCase() = 'b'
 *   'a' !== 'b' is true.
 *   totalKeyChanges becomes 3.
 *
 * The loop terminates because loopIndex (3) is no longer less than stringLength - 1 (3).
 * The function returns totalKeyChanges, which is 3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countKeyChanges = function (s) {
  let totalKeyChanges = 0;
  let stringLength = s.length;

  for (let loopIndex = 0; loopIndex < stringLength - 1; loopIndex++) {
    let firstChar = s[loopIndex];
    let secondChar = s[loopIndex + 1];

    let normalizedFirstChar = firstChar.toLowerCase();
    let normalizedSecondChar = secondChar.toLowerCase();

    if (normalizedFirstChar !== normalizedSecondChar) {
      totalKeyChanges++;
    }
  }

  return totalKeyChanges;
};
