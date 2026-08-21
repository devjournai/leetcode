/**
 * Consecutive Numbers Sum
 * Intuition: n = k(2a+k-1)/2 for integer a≥1, k≥1. Equivalently 2n = d1*d2 with d1 < d2 and opposite parity so a is a positive integer.
 * Approach: 1. `twiceInput = 2n`, loop `divisorOne` to sqrt(2n). 2. If it divides, `divisorTwo = 2n/d1`; skip squares. 3. Count when exactly one of d1,d2 is even.
 * Dry Run: n = 9. Factor pairs of 18: (1,18), (2,9), (3,6) all opposite parity → 3 (9, 4+5, 2+3+4).
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
