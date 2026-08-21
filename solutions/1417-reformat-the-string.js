/**
 * Reformat The String
 * Intuition: Alternate letters and digits. This is possible iff their counts differ by at most one; start with the more frequent type.
 * Approach: 1. Split characters into letters vs digits. 2. If |counts| > 1, return "". 3. Let the longer list be even indices. 4. Interleave and join.
 * Dry Run: s = "a0b1c2".
 *   - 3 letters, 3 digits. Start with letters: a0b1c2.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var reformat = function (s) {
  const allLetters = [];
  const allDigits = [];

  for (const inputChar of s) {
    if (isNaN(inputChar)) {
      allLetters.push(inputChar);
    } else {
      allDigits.push(inputChar);
    }
  }

  const letterCount = allLetters.length;
  const digitCount = allDigits.length;

  if (Math.abs(letterCount - digitCount) > 1) {
    return "";
  }

  const reformattedParts = [];
  let firstSource;
  let secondSource;

  if (letterCount >= digitCount) {
    firstSource = allLetters;
    secondSource = allDigits;
  } else {
    firstSource = allDigits;
    secondSource = allLetters;
  }

  let firstSourceIndex = 0;
  let secondSourceIndex = 0;

  for (
    let currentIteration = 0;
    currentIteration < s.length;
    currentIteration++
  ) {
    if (currentIteration % 2 === 0) {
      reformattedParts.push(firstSource[firstSourceIndex]);
      firstSourceIndex++;
    } else {
      reformattedParts.push(secondSource[secondSourceIndex]);
      secondSourceIndex++;
    }
  }

  return reformattedParts.join("");
};
