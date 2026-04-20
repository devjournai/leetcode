/**
 * Consecutive Numbers Sum
 * Time Complexity: O(sqrt(n))
 * Space Complexity: O(1)
 */
var consecutiveNumbersSum = function (n) {
  let validDecompositions = 0;
  const twiceInput = 2 * n;
  const limitDivisor = Math.floor(Math.sqrt(twiceInput));

  for (let divisorOne = 1; divisorOne <= limitDivisor; divisorOne++) {
    if (twiceInput % divisorOne === 0) {
      const divisorTwo = twiceInput / divisorOne;

      if (divisorOne === divisorTwo) {
        continue;
      }

      const isDivisorOneEven = divisorOne % 2 === 0;
      const isDivisorTwoEven = divisorTwo % 2 === 0;

      if (isDivisorOneEven !== isDivisorTwoEven) {
        validDecompositions++;
      }
    }
  }

  return validDecompositions;
};
