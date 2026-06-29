/**
 * Maximum Value Of A String In An Array
 * Intuition: Each string has a value determined by whether it contains only digits or not. We need to iterate through all strings, calculate their individual values, and keep track of the largest one found.
 * Approach: 1. Initialize a variable `maximumOverallValue` to zero. 2. Iterate through each `inputString` in the provided `strs` array. 3. For each `inputString`, check if it consists entirely of digits by iterating through its characters. 4. If all characters are digits, parse the string to an integer to get its `computedValue`. 5. Otherwise, use the `inputString.length` as its `computedValue`. 6. Update `maximumOverallValue` by taking the maximum between its current value and the `computedValue`. 7. After processing all strings, return `maximumOverallValue`.
 * Dry Run: strs = ["alic3", "bob", "3", "4", "007"]
 *   maximumOverallValue = 0
 *
 *   1. inputString = "alic3"
 *      - currentStringIsNumeric = true
 *      - charChecker = 0, digitChar = 'a'. Not a digit.
 *      - currentStringIsNumeric = false, break.
 *      - computedValue = "alic3".length = 5
 *      - maximumOverallValue = Math.max(0, 5) = 5
 *
 *   2. inputString = "bob"
 *      - currentStringIsNumeric = true
 *      - charChecker = 0, digitChar = 'b'. Not a digit.
 *      - currentStringIsNumeric = false, break.
 *      - computedValue = "bob".length = 3
 *      - maximumOverallValue = Math.max(5, 3) = 5
 *
 *   3. inputString = "3"
 *      - currentStringIsNumeric = true
 *      - charChecker = 0, digitChar = '3'. Is a digit. Loop ends.
 *      - computedValue = parseInt("3") = 3
 *      - maximumOverallValue = Math.max(5, 3) = 5
 *
 *   4. inputString = "4"
 *      - currentStringIsNumeric = true
 *      - charChecker = 0, digitChar = '4'. Is a digit. Loop ends.
 *      - computedValue = parseInt("4") = 4
 *      - maximumOverallValue = Math.max(5, 4) = 5
 *
 *   5. inputString = "007"
 *      - currentStringIsNumeric = true
 *      - charChecker = 0, digitChar = '0'. Is a digit.
 *      - charChecker = 1, digitChar = '0'. Is a digit.
 *      - charChecker = 2, digitChar = '7'. Is a digit. Loop ends.
 *      - computedValue = parseInt("007") = 7
 *      - maximumOverallValue = Math.max(5, 7) = 7
 *
 *   Return maximumOverallValue (7).
 * Time Complexity: O(N * L)
 * Space Complexity: O(1)
 */
var maximumValue = function (strs) {
  let maximumOverallValue = 0;

  for (const inputString of strs) {
    let currentStringIsNumeric = true;
    for (let charChecker = 0; charChecker < inputString.length; charChecker++) {
      const digitChar = inputString[charChecker];
      if (digitChar < "0" || digitChar > "9") {
        currentStringIsNumeric = false;
        break;
      }
    }

    let computedValue;
    if (currentStringIsNumeric) {
      computedValue = parseInt(inputString);
    } else {
      computedValue = inputString.length;
    }

    maximumOverallValue = Math.max(maximumOverallValue, computedValue);
  }

  return maximumOverallValue;
};
