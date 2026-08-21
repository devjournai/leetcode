/**
 * Clumsy Factorial
 * Intuition: Clumsy factorial groups * / + then subtracts the next group of four, so evaluate the first quartet as a positive block and subtract later quartets.
 * Approach: 1. Handle n < 4 by constants. 2. Set initialValue to floor(n*(n-1)/(n-2))+(n-3). 3. While at least 4 numbers remain, subtract the same pattern on the next quartet. 4. Subtract leftover 1–3 using 1, 2, or 6.
 * Dry Run: n = 4.
 *   - initialValue = floor(4*3/2)+1 = 7. Remaining 0. Return 7.
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
        (numbersRemaining * (numbersRemaining - 1)) / (numbersRemaining - 2)
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
