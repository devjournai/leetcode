/**
 * Split Array by Prime Indices
 * Intuition: Difference of sum at prime indices vs the rest is the absolute value of +nums[i] on primes and -nums[i] elsewhere.
 * Approach: 1. Sieve primality up to n. 2. Accumulate +nums[i] if i is prime else -nums[i]. 3. Return abs.
 * Dry Run: nums = [2,3,4] indices 0,1,2 → only index 2 is not counted as prime? 2 is prime so +4, 0 not prime -2, 1 not prime -3, abs(4-2-3)=1. Index 2 is prime.
 * Time Complexity: O(n log log n)
 * Space Complexity: O(n)
 */
var splitArray = function (nums) {
  const limit = nums.length + 2;
  const isPrime = Array(limit).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;

  for (let prime = 2; prime * prime < limit; prime++) {
    if (isPrime[prime]) {
      for (let multiple = prime * prime; multiple < limit; multiple += prime) {
        isPrime[multiple] = false;
      }
    }
  }

  let signedSum = 0;
  for (let index = 0; index < nums.length; index++) {
    signedSum += isPrime[index] ? nums[index] : -nums[index];
  }
  return Math.abs(signedSum);
};
