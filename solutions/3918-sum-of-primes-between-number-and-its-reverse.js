/**
 * Sum of Primes Between Number and Its Reverse
 * Intuition: We note that the reversed number r of n will not exceed 1000, so we can precompute all prime numbers up to 1000.
 * Approach: We note that the reversed number r of n will not exceed 1000, so we can precompute all prime numbers up to 1000. Next, we compute low = min(n, r) and high = max(n, r), then iterate through all integers in the range [low, high]. If an integer is prime, we add it to the answer.
 * Dry Run: Input: n = 13. Output: 132.
 * Time Complexity: O(n)
 * Space Complexity: O(M)
 */
const LIMIT = 1000;
const isPrime = new Array(LIMIT + 1).fill(true);
isPrime[0] = isPrime[1] = false;
for (let i = 2; i * i <= LIMIT; i++) {
  if (isPrime[i]) {
    for (let j = i * i; j <= LIMIT; j += i) {
      isPrime[j] = false;
    }
  }
}

var sumOfPrimesInRange = function (n) {
  const r = parseInt(n.toString().split("").reverse().join(""));
  const low = Math.min(n, r);
  const high = Math.max(n, r);
  let sum = 0;
  for (let x = low; x <= high; x++) {
    if (isPrime[x]) sum += x;
  }
  return sum;
};
