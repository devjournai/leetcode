/**
 * Find the Count of Numbers Which Are Not Special
 * Intuition: A special number has exactly two proper divisors besides 1 and itself, so it is the square of a prime. Count integers in [l, r] that are not prime squares.
 * Approach: 1. Sieve primes up to sqrt(r). 2. Count prime squares that land in [l, r]. 3. Return (r - l + 1) minus that count.
 * Dry Run: l = 5, r = 7. sqrt(7) ~ 2.64, primes <= 2: 2. 2^2 = 4 is not in [5, 7]. Range size 3, special 0, answer 3.
 * Time Complexity: O(sqrt(r) log log sqrt(r))
 * Space Complexity: O(sqrt(r))
 */
var nonSpecialCount = function (l, r) {
  const maxRoot = Math.floor(Math.sqrt(r));
  const isPrime = Array(maxRoot + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;
  for (let i = 2; i * i <= maxRoot; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= maxRoot; j += i) {
        isPrime[j] = false;
      }
    }
  }

  let specialCount = 0;
  for (let num = 2; num <= maxRoot; num++) {
    const square = num * num;
    if (isPrime[num] && l <= square && square <= r) {
      specialCount++;
    }
  }

  return r - l + 1 - specialCount;
};
