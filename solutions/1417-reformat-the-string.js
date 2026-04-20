/**
 * Reformat The String
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
