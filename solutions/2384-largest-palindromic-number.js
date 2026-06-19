/**
 * Largest Palindromic Number
 * Intuition: To construct the largest palindromic number, we prioritize using larger digits and forming as many pairs as possible. Any single remaining digit should be the largest possible, forming the center of the palindrome.
 * Approach:
 * 1. Initialize a frequency counter for all digits from 0 to 9 to store their occurrences in the input string.
 * 2. Populate the frequency counter by iterating through each character of the input number string.
 * 3. Initialize an empty string for the left half of the palindrome (`stringPrefix`) and another for the potential single middle digit (`middleString`).
 * 4. Iterate downwards from digit 9 to 0. For each digit:
 *    a. Calculate the number of pairs that can be formed by this digit.
 *    b. Implement a specific condition for handling leading zeros: if the current digit is 0 and the `stringPrefix` is currently empty, these 0s should not be used in the `stringPrefix` to avoid leading zeros in the final palindrome. However, this 0 digit can still be considered for the `middleString` if it's the largest available odd-count digit.
 *    c. Append the digit repeated by its available pairs to the `stringPrefix`.
 *    d. If the current digit has an odd count and `middleString` is still empty, assign this digit as the `middleString`. This ensures the `middleString` is the largest possible odd-count digit.
 * 5. After iterating through all digits, construct the right half (`stringSuffix`) by reversing `stringPrefix`.
 * 6. Concatenate `stringPrefix`, `middleString`, and `stringSuffix` to form the full palindrome.
 * 7. Handle the edge case where the resulting palindrome is empty (e.g., input "0", "00"): if both `stringPrefix` and `middleString` are empty, return "0".
 * Dry Run: num = "444947137"
 * 1. `occurrenceCounter` initialized to [0,0,0,0,0,0,0,0,0,0].
 * 2. Populate `occurrenceCounter`:
 *    '4' -> `occurrenceCounter[4]` becomes 4
 *    '9' -> `occurrenceCounter[9]` becomes 1
 *    '7' -> `occurrenceCounter[7]` becomes 2
 *    '1' -> `occurrenceCounter[1]` becomes 1
 *    '3' -> `occurrenceCounter[3]` becomes 1
 *    Final `occurrenceCounter`: [0, 1, 0, 1, 4, 0, 0, 2, 0, 1] (indices 0-9)
 * 3. `stringPrefix = ""`, `middleString = ""`.
 * 4. Loop `digitVal` from 9 down to 0:
 *    - `digitVal = 9`: `currentAmount = 1`, `numForPrefix = 0`. `digitVal` is not 0. `stringPrefix` remains "". `currentAmount % 2 === 1` is true and `middleString` is "". `middleString` becomes "9".
 *    - `digitVal = 8`: `currentAmount = 0`. No changes.
 *    - `digitVal = 7`: `currentAmount = 2`, `numForPrefix = 1`. `digitVal` is not 0. `stringPrefix` becomes "7". `currentAmount % 2 === 1` is false.
 *    - `digitVal = 6` to `5`: `currentAmount = 0`. No changes.
 *    - `digitVal = 4`: `currentAmount = 4`, `numForPrefix = 2`. `digitVal` is not 0. `stringPrefix` becomes "744". `currentAmount % 2 === 1` is false.
 *    - `digitVal = 3`: `currentAmount = 1`, `numForPrefix = 0`. `digitVal` is not 0. `stringPrefix` remains "744". `currentAmount % 2 === 1` is true, but `middleString` is not "".
 *    - `digitVal = 2`: `currentAmount = 0`. No changes.
 *    - `digitVal = 1`: `currentAmount = 1`, `numForPrefix = 0`. `digitVal` is not 0. `stringPrefix` remains "744". `currentAmount % 2 === 1` is true, but `middleString` is not "".
 *    - `digitVal = 0`: `currentAmount = 0`. No changes.
 * 5. After loop: `stringPrefix = "744"`, `middleString = "9"`.
 * 6. `stringSuffix` = `stringPrefix.split('').reverse().join('')` = `"447"`.
 * 7. Final result: `stringPrefix + middleString + stringSuffix` = `"744" + "9" + "447"` = `"7449447"`.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var largestPalindromic = function (num) {
  let occurrenceCounter = new Array(10).fill(0);

  let inputIndex = 0;
  while (inputIndex < num.length) {
    let charDigit = num[inputIndex];
    occurrenceCounter[parseInt(charDigit, 10)]++;
    inputIndex++;
  }

  let stringPrefix = "";
  let middleString = "";
  let digitVal = 9;

  while (digitVal >= 0) {
    let currentAmount = occurrenceCounter[digitVal];
    let numForPrefix = Math.floor(currentAmount / 2);

    if (digitVal === 0 && stringPrefix === "") {
      if (currentAmount % 2 === 1 && middleString === "") {
        middleString = digitVal.toString();
      }
      digitVal--;
      continue;
    }

    stringPrefix += digitVal.toString().repeat(numForPrefix);

    if (currentAmount % 2 === 1 && middleString === "") {
      middleString = digitVal.toString();
    }
    digitVal--;
  }

  if (stringPrefix === "" && middleString === "") {
    return "0";
  }

  let stringSuffix = stringPrefix.split("").reverse().join("");
  return stringPrefix + middleString + stringSuffix;
};
