/**
 * Three Divisors
 * Intuition: An integer has exactly three positive divisors if and only if it is the square of a prime number.
 * Approach: 1. Handle the base case for n=1 (1 has only one divisor). 2. Calculate the square root of n. 3. Check if n is a perfect square. If not, it cannot have three divisors. 4. If n is a perfect square, then its square root is the potential prime factor. Check if this square root is a prime number.
 * Dry Run: n = 4
 *   1. n is not 1.
 *   2. squareRootValue = Math.sqrt(4) = 2.
 *   3. 2 % 1 === 0, so n is a perfect square.
 *   4. potentialPrime = 2.
 *   5. limitForPrimeCheck = Math.sqrt(2) approx 1.414.
 *   6. currentDivisorCandidate = 2.
 *   7. while loop condition (2 <= 1.414) is false. The loop does not execute.
 *   8. Return true. (Correct, 4 has divisors 1, 2, 4)
 * Time Complexity: O(n^(1/4))
 * Space Complexity: O(1)
 */
var isThree = function (n) {
  if (n === 1) {
    return false;
  }

  let squareRootValue = Math.sqrt(n);

  if (squareRootValue % 1 !== 0) {
    return false;
  }

  let potentialPrime = squareRootValue;
  let limitForPrimeCheck = Math.sqrt(potentialPrime);
  let currentDivisorCandidate = 2;

  while (currentDivisorCandidate <= limitForPrimeCheck) {
    if (potentialPrime % currentDivisorCandidate === 0) {
      return false;
    }
    currentDivisorCandidate++;
  }

  return true;
};
