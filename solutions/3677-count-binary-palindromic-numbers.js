/**
 * Count Binary Palindromic Numbers
 * Intuition: A binary palindrome is determined by its first half (the leading bit must be 1 except for 0). Count all palindromes with fewer bits than n, then those of the same bit-length whose value is at most n.
 * Approach: 1. Add 1 for 0. 2. For each shorter length L, there are 2^{ceil(L/2)-1} palindromes. 3. For the same length as n, count first halves strictly less than n’s first half, then include n’s mirrored first half if that palindrome is <= n.
 * Dry Run: n = 9 is 1001. Shorter: 0, 1, 11, 101, 111 (5 plus zero already counted separately → 1+1+1+2=5 before length 4). First half "10" mirrors to 1001 = 9, so +1. Total 6.
 * Time Complexity: O(log N)
 * Space Complexity: O(log N)
 */
var countBinaryPalindromes = function (n) {
  if (n === 0) {
    return 1;
  }

  const bits = n.toString(2);
  const bitLength = bits.length;
  let answer = 1;

  for (let length = 1; length < bitLength; length++) {
    const halfLength = Math.ceil(length / 2);
    answer += 1 << (halfLength - 1);
  }

  const halfLength = Math.ceil(bitLength / 2);
  const prefix = bits.slice(0, halfLength);
  const prefixValue = parseInt(prefix, 2);
  const minPrefix = 1 << (halfLength - 1);
  answer += prefixValue - minPrefix;

  const mirrored =
    prefix + [...prefix.slice(0, bitLength - halfLength)].reverse().join("");
  const palindromeValue = parseInt(mirrored, 2);
  if (palindromeValue <= n) {
    answer++;
  }

  return answer;
};
