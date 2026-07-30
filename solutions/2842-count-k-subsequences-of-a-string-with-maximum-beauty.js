/**
 * Count K-Subsequences of a String With Maximum Beauty
 *
 * Intuition:
 * Let:
 *
 *      f(c)
 *
 * be the frequency of character c in the string.
 *
 * The beauty of a k-subsequence is simply the sum of the frequencies of
 * its chosen characters.
 *
 * Therefore, to obtain the maximum beauty, we must always choose the
 * k characters having the largest frequencies.
 *
 * The only difficulty arises when several characters have the same
 * frequency as the k-th largest frequency.
 *
 * -----------------------------------------------------------------------
 *
 * Observation:
 *
 * Suppose the frequencies in descending order are:
 *
 *      8, 7, 6, 5, 5, 5, 4
 *
 * and:
 *
 *      k = 5
 *
 * We must definitely take:
 *
 *      8, 7, 6
 *
 * The remaining two characters must come from the three characters whose
 * frequency is 5.
 *
 * If:
 *
 *      total = number of characters having frequency = threshold
 *
 *      need  = number of them we still need to choose
 *
 * Then the number of possible character selections is:
 *
 *      C(total, need)
 *
 * Every chosen character with frequency x contributes x possible index
 * choices in the original string.
 *
 * Hence every valid selection contributes:
 *
 *      x^need
 *
 * Therefore:
 *
 *      answer =
 *          product(all mandatory frequencies)
 *          × C(total, need)
 *          × threshold^need
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Count the frequency of every character.
 *
 * 2. If there are fewer than k distinct characters,
 *    return 0.
 *
 * 3. Sort frequencies in descending order.
 *
 * 4. Let:
 *
 *      threshold = kth largest frequency
 *
 * 5. Multiply all frequencies strictly larger than threshold.
 *
 * 6. Count:
 *
 *      total = occurrences of threshold
 *
 *      need = threshold frequencies inside top k
 *
 * 7. Multiply:
 *
 *      C(total, need)
 *      × threshold^need
 *
 * 8. Return the answer modulo 1e9+7.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * s = "bcca"
 * k = 2
 *
 * Frequencies:
 *
 *      [2,1,1]
 *
 * threshold = 1
 *
 * Mandatory:
 *
 *      2
 *
 * total = 2
 * need  = 1
 *
 * Answer:
 *
 *      2
 *      × C(2,1)
 *      × 1
 *      =
 *      4
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N + 26 log 26)
 * Space Complexity: O(26)
 */

var countKSubsequencesWithMaxBeauty = function (s, k) {
  const MOD = 1000000007n;

  const freq = new Array(26).fill(0);

  for (const ch of s) {
    freq[ch.charCodeAt(0) - 97]++;
  }

  const arr = freq.filter((x) => x > 0);

  if (arr.length < k) {
    return 0;
  }

  arr.sort((a, b) => b - a);

  const threshold = arr[k - 1];

  let answer = 1n;

  let mandatory = 0;

  for (const f of arr) {
    if (f > threshold) {
      answer = (answer * BigInt(f)) % MOD;
      mandatory++;
    }
  }

  const need = k - mandatory;

  let total = 0;
  for (const f of arr) {
    if (f === threshold) {
      total++;
    }
  }

  const modPow = (base, exp) => {
    let res = 1n;
    let b = BigInt(base);
    let e = BigInt(exp);

    while (e > 0n) {
      if (e & 1n) {
        res = (res * b) % MOD;
      }
      b = (b * b) % MOD;
      e >>= 1n;
    }

    return res;
  };

  const comb = (n, r) => {
    if (r > n) return 0n;
    r = Math.min(r, n - r);

    let num = 1n;
    let den = 1n;

    for (let i = 1; i <= r; i++) {
      num = (num * BigInt(n - r + i)) % MOD;
      den = (den * BigInt(i)) % MOD;
    }

    const modPowInv = (a, e) => {
      let res = 1n;
      let x = a;

      while (e > 0n) {
        if (e & 1n) {
          res = (res * x) % MOD;
        }
        x = (x * x) % MOD;
        e >>= 1n;
      }

      return res;
    };

    return (num * modPowInv(den, MOD - 2n)) % MOD;
  };

  answer = (answer * comb(total, need)) % MOD;
  answer = (answer * modPow(threshold, need)) % MOD;

  return Number(answer);
};
