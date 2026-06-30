/**
 * Count Anagrams
 *
 * Intuition:
 * Each word is independent. The total number of valid anagrams equals the product
 * of the number of distinct permutations of every word.
 *
 * For a word of length n:
 *
 *      permutations = n!
 *                     -----------------------
 *                     (c1! × c2! × ... × ck!)
 *
 * where c1, c2, ... are the frequencies of repeated characters.
 *
 * Since the answer can be very large, compute everything modulo 1e9+7 using
 * factorials and modular inverses (Fermat's Little Theorem).
 *
 * Approach:
 * 1. Split the string into individual words.
 * 2. Find the maximum word length.
 * 3. Precompute:
 *      - factorial[i]
 *      - inverseFactorial[i]
 *    for every length up to the maximum word length.
 * 4. For every word:
 *      a. Count frequency of every character.
 *      b. Start with:
 *            ways = factorial[word.length]
 *      c. Divide by every frequency factorial using modular inverse:
 *            ways *= inverseFactorial[freq]
 *      d. Multiply the answer by ways.
 * 5. Return the final answer modulo 1e9+7.
 *
 * Dry Run:
 *
 * Input:
 * s = "too hot"
 *
 * Words:
 * ["too", "hot"]
 *
 * -------------------
 * Word = "too"
 * -------------------
 *
 * Length = 3
 *
 * Frequencies:
 * t -> 1
 * o -> 2
 *
 * Ways
 * = 3! / 2!
 * = 6 / 2
 * = 3
 *
 * Possible:
 * too
 * oto
 * oot
 *
 * -------------------
 * Word = "hot"
 * -------------------
 *
 * Length = 3
 *
 * Frequencies:
 * h ->1
 * o ->1
 * t ->1
 *
 * Ways
 * = 3!
 * = 6
 *
 * -------------------
 *
 * Total
 * = 3 × 6
 * = 18
 *
 * Return 18.
 *
 * Time Complexity:
 * O(N)
 * where N is the length of the string.
 *
 * Space Complexity:
 * O(L)
 * where L is the maximum word length.
 */
var countAnagrams = function (s) {
  const MOD = 1000000007n;

  const modPow = (base, exp) => {
    let result = 1n;
    base %= MOD;

    while (exp > 0n) {
      if (exp & 1n) {
        result = (result * base) % MOD;
      }
      base = (base * base) % MOD;
      exp >>= 1n;
    }

    return result;
  };

  const words = s.split(" ");

  let maxLength = 0;
  for (const word of words) {
    maxLength = Math.max(maxLength, word.length);
  }

  const factorial = Array(maxLength + 1).fill(1n);
  for (let i = 1; i <= maxLength; i++) {
    factorial[i] = (factorial[i - 1] * BigInt(i)) % MOD;
  }

  const inverseFactorial = Array(maxLength + 1).fill(1n);
  inverseFactorial[maxLength] = modPow(factorial[maxLength], MOD - 2n);

  for (let i = maxLength; i >= 1; i--) {
    inverseFactorial[i - 1] = (inverseFactorial[i] * BigInt(i)) % MOD;
  }

  let answer = 1n;

  for (const word of words) {
    const frequency = new Map();

    for (const ch of word) {
      frequency.set(ch, (frequency.get(ch) || 0) + 1);
    }

    let ways = factorial[word.length];

    for (const count of frequency.values()) {
      ways = (ways * inverseFactorial[count]) % MOD;
    }

    answer = (answer * ways) % MOD;
  }

  return Number(answer);
};
