/**
 * Sum of Largest Prime Substrings
 * Intuition: Every substring is a candidate integer. Collect unique primes among them and sum the three largest (or fewer if not enough).
 * Approach: 1. For each start index, grow the integer digit by digit. 2. Test primality in O(sqrt(x)). 3. Store unique primes in a Set. 4. Sort and sum the top three.
 * Dry Run: s = "12234". Primes include 2, 3, 23, 223, ... Top three such as 223 + 23 + 3 (depending on unique values) are summed.
 * Time Complexity: O(N^2 * sqrt(X)) where X is a substring value
 * Space Complexity: O(N^2)
 */
function isPrime(value) {
  if (value < 2) {
    return false;
  }
  for (let i = 2; i * i <= value; i++) {
    if (value % i === 0) {
      return false;
    }
  }
  return true;
}

var sumOfLargestPrimes = function (s) {
  const primes = new Set();
  const n = s.length;

  for (let i = 0; i < n; i++) {
    let value = 0;
    for (let j = i; j < n; j++) {
      value = value * 10 + Number(s[j]);
      if (isPrime(value)) {
        primes.add(value);
      }
    }
  }

  const sorted = Array.from(primes).sort((a, b) => a - b);
  const topThree = sorted.slice(-3);
  return topThree.reduce((sum, val) => sum + val, 0);
};
