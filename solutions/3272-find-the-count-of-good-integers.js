/**
 * Find the Count of Good Integers
 * Intuition: A good integer is a permutation of some n-digit palindrome divisible by k (no leading zeros). It is enough to enumerate palindromes, keep one representative per digit multiset, and count valid permutations of that multiset.
 * Approach: 1. Generate every n-digit palindrome from its first half. 2. Skip those not divisible by k or whose sorted digits were already seen. 3. Count permutations of the digit multiset with a non-zero first digit: (n - zeros) * (n-1)! / product(freq!).
 * Dry Run:
 *   n = 3, k = 5
 *   Palindromes like 505 contribute permutations of {5,0,5} with no leading zero: 2 (505 and 550). Sum over palindromes that are 0 mod 5.
 * Time Complexity: O(n * 10^{ceil(n/2)})
 * Space Complexity: O(10^{ceil(n/2)})
 */
var countGoodIntegers = function (n, k) {
  const halfLength = Math.floor((n + 1) / 2);
  const minHalf = 10 ** (halfLength - 1);
  const maxHalf = 10 ** halfLength;
  let ans = 0;
  const seen = new Set();

  const factorial = (x) => {
    let res = 1;
    for (let i = 2; i <= x; i++) {
      res *= i;
    }
    return res;
  };

  for (let num = minHalf; num < maxHalf; num++) {
    const firstHalf = String(num);
    const secondHalf = firstHalf.split("").reverse().join("");
    const palindrome = firstHalf + secondHalf.slice(n % 2);
    if (Number(palindrome) % k !== 0) {
      continue;
    }
    const sortedDigits = palindrome.split("").sort().join("");
    if (seen.has(sortedDigits)) {
      continue;
    }
    seen.add(sortedDigits);

    const digitCount = Array(10).fill(0);
    for (const c of palindrome) {
      digitCount[c.charCodeAt(0) - 48]++;
    }

    const firstDigitChoices = n - digitCount[0];
    let permutations = firstDigitChoices * factorial(n - 1);
    for (const freq of digitCount) {
      if (freq > 1) {
        permutations /= factorial(freq);
      }
    }
    ans += permutations;
  }

  return ans;
};
