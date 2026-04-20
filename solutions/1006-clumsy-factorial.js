/**
 * Clumsy Factorial
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var clumsy = function (n) {
  if (n === 1) {
    return 1;
  }
  if (n === 2) {
    return 2;
  }
  if (n === 3) {
    return 6;
  }

  let initialValue = Math.floor((n * (n - 1)) / (n - 2)) + (n - 3);
  let numbersRemaining = n - 4;

  while (numbersRemaining >= 4) {
    let blockSum =
      Math.floor(
        (numbersRemaining * (numbersRemaining - 1)) / (numbersRemaining - 2),
      ) +
      (numbersRemaining - 3);
    initialValue -= blockSum;
    numbersRemaining -= 4;
  }

  if (numbersRemaining === 3) {
    initialValue -= 6;
  } else if (numbersRemaining === 2) {
    initialValue -= 2;
  } else if (numbersRemaining === 1) {
    initialValue -= 1;
  }

  return initialValue;
};
