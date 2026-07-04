/**
 * Split the Array to Make Coprime Products
 *
 * Intuition:
 * The products on the left and right are coprime if they do not share any
 * prime factor.
 *
 * Instead of computing huge products, track where every prime factor appears.
 *
 * For every prime factor:
 * - Record its first occurrence.
 * - Record its last occurrence.
 *
 * Any split between the first and last occurrence of the same prime is invalid,
 * because that prime would appear on both sides.
 *
 * We sweep from left to right while maintaining the farthest last occurrence
 * of any prime seen so far. Whenever the current index reaches that boundary,
 * every prime seen so far is completely contained in the left part, so the
 * split is valid.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Traverse every number and factorize it into distinct prime factors.
 *
 * 2. Store:
 *
 *      lastOccurrence[prime]
 *
 *      =
 *      last index where this prime appears.
 *
 * 3. Traverse the array again.
 *
 *      Maintain:
 *
 *          maxRight
 *
 *      =
 *      farthest last occurrence among all primes seen so far.
 *
 *      For every prime factor of nums[i]:
 *
 *          maxRight =
 *              max(maxRight, lastOccurrence[prime])
 *
 *      If:
 *
 *          i == maxRight
 *
 *      and
 *
 *          i < n - 1
 *
 *      then every prime in the left part ends here,
 *      so return i.
 *
 * 4. If no such index exists,
 *      return -1.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums =
 * [4,7,8,15,3,5]
 *
 * Prime factors:
 *
 * 4  -> {2}
 * 7  -> {7}
 * 8  -> {2}
 * 15 -> {3,5}
 * 3  -> {3}
 * 5  -> {5}
 *
 * Last occurrences:
 *
 * 2 -> 2
 * 7 -> 1
 * 3 -> 4
 * 5 -> 5
 *
 * Sweep:
 *
 * i = 0
 *
 * maxRight = 2
 *
 * ----------------
 *
 * i = 1
 *
 * maxRight = 2
 *
 * ----------------
 *
 * i = 2
 *
 * maxRight = 2
 *
 * i == maxRight
 *
 * Valid split.
 *
 * Return 2.
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N × √M)
 * Space Complexity: O(U)
 */

var findValidSplit = function (nums) {
  const n = nums.length;

  const lastOccurrence = new Map();

  const getPrimeFactors = (num) => {
    const factors = [];

    let x = num;

    for (let p = 2; p * p <= x; p++) {
      if (x % p === 0) {
        factors.push(p);

        while (x % p === 0) {
          x /= p;
        }
      }
    }

    if (x > 1) {
      factors.push(x);
    }

    return factors;
  };

  for (let i = 0; i < n; i++) {
    const factors = getPrimeFactors(nums[i]);

    for (const prime of factors) {
      lastOccurrence.set(prime, i);
    }
  }

  let maxRight = 0;
  for (let i = 0; i < n - 1; i++) {
    const factors = getPrimeFactors(nums[i]);

    for (const prime of factors) {
      maxRight = Math.max(maxRight, lastOccurrence.get(prime));
    }

    if (i === maxRight) {
      return i;
    }
  }

  return -1;
};
