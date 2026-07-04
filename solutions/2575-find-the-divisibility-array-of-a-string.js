/**
 * Find the Divisibility Array of a String
 *
 * Intuition:
 * The number represented by a prefix can be extremely large, so it cannot be
 * stored directly.
 *
 * Instead, only keep its remainder modulo `m`.
 *
 * Suppose the current remainder is:
 *
 *      rem
 *
 * and the next digit is:
 *
 *      d
 *
 * Then the new remainder becomes:
 *
 *      (rem × 10 + d) % m
 *
 * If the remainder becomes 0, the current prefix is divisible by `m`.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Initialize:
 *
 *      remainder = 0
 *
 * 2. Traverse every digit in the string.
 *
 * 3. Update:
 *
 *      remainder =
 *          (remainder × 10 + currentDigit) % m
 *
 * 4. If:
 *
 *      remainder == 0
 *
 *      store 1.
 *
 *      Otherwise,
 *      store 0.
 *
 * 5. Return the divisibility array.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * word = "1010"
 * m = 10
 *
 * ----------------
 * digit = '1'
 *
 * remainder
 *
 * = (0×10+1)%10
 * =1
 *
 * answer:
 * [0]
 *
 * ----------------
 * digit = '0'
 *
 * remainder
 *
 * =(1×10+0)%10
 * =0
 *
 * answer:
 * [0,1]
 *
 * ----------------
 * digit = '1'
 *
 * remainder
 *
 * =(0×10+1)%10
 * =1
 *
 * answer:
 * [0,1,0]
 *
 * ----------------
 * digit = '0'
 *
 * remainder
 *
 * =(1×10+0)%10
 * =0
 *
 * answer:
 * [0,1,0,1]
 *
 * Return:
 *
 * [0,1,0,1]
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var divisibilityArray = function (word, m) {
  const answer = new Array(word.length);

  let remainder = 0n;
  const mod = BigInt(m);

  for (let i = 0; i < word.length; i++) {
    const digit = BigInt(word.charCodeAt(i) - 48);

    remainder = (remainder * 10n + digit) % mod;

    answer[i] = remainder === 0n ? 1 : 0;
  }

  return answer;
};
