/**
 * Largest Prime from Consecutive Prime Sum
 * Intuition: We can preprocess a list of all prime numbers less than or equal to 5 \times 10^5, then calculate the consecutive prime sums starting from 2, and store those sums that are prime numbers in an array s.
 * Approach: For each query, we simply need to use binary search in array s to find the maximum value less than or equal to n. In terms of time complexity, preprocessing the primes takes O(M \log \log M) time, and each query takes O(\log k) time, where M is the upper limit of preprocessing, and k is the length of array s. In this problem, k \leq 40.
 * Dry Run: Input n = 20. Output 17.
 * Time Complexity: O(M \log \log M)
 * Space Complexity: O(N)
 */
const MX = 500000;

const isPrime = Array(MX + 1).fill(true);
isPrime[0] = false;
isPrime[1] = false;

const primes = [];
const s = [];

(function init() {
  for (let i = 2; i <= MX; i++) {
    if (isPrime[i]) {
      primes.push(i);
      if (i * i <= MX) {
        for (let j = i * i; j <= MX; j += i) {
          isPrime[j] = false;
        }
      }
    }
  }

  s.push(0);
  let t = 0;
  for (const x of primes) {
    t += x;
    if (t > MX) break;
    if (isPrime[t]) {
      s.push(t);
    }
  }
})();

var largestPrime = function (n) {
  const i = _.sortedIndex(s, n + 1) - 1;
  return s[i];
};
