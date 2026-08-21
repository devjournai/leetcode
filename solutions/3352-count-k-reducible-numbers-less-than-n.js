/**
 * Count K-Reducible Numbers Less Than N
 * Intuition: One operation replaces a number with its popcount. After the first step the value is at most `len(n)` bits, so we can precompute how many extra operations that popcount needs to become 1. Digit DP on the binary string of `n` then counts numbers whose popcount is k-reducible in fewer than `k` remaining steps.
 * Approach: 1. `ops[x] = 0` for x<=1, else `1 + ops[popcount(x)]` for x up to `s.length`. 2. Digit DP `count(i, setBits, tight)`: at bit `i`, `setBits` 1s so far, `tight` if we still match the prefix of `s`. 3. Place bit 0 or 1 (capped by `s[i]` when tight). 4. At the end, accept if `ops[setBits] < k` and the number is strictly less than `n` (`tight === 0`). 5. Subtract 1 to drop the all-zero number. Mod `10^9+7`.
 * Dry Run: s = "111", k = 1 (n = 7). Powers of two less than 7 are 1,2,4 — three 1-reducible positives. DP counts those whose popcount is already 1.
 * Time Complexity: O(L^2) where L = length of s
 * Space Complexity: O(L^2)
 */
var countKReducibleNumbers = function (s, k) {
  const MOD = 1000000007;
  const bitLength = s.length;
  const ops = new Array(bitLength + 1).fill(0);
  for (let num = 2; num <= bitLength; num++) {
    let setBitCount = 0;
    let temp = num;
    while (temp > 0) {
      setBitCount += temp & 1;
      temp >>= 1;
    }
    ops[num] = 1 + ops[setBitCount];
  }

  const mem = Array.from({ length: bitLength }, () =>
    Array.from({ length: bitLength + 1 }, () => [-1, -1])
  );

  const count = (digitIndex, setBits, tight) => {
    if (digitIndex === bitLength) {
      return ops[setBits] < k && tight === 0 ? 1 : 0;
    }
    if (mem[digitIndex][setBits][tight] !== -1) {
      return mem[digitIndex][setBits][tight];
    }

    let result = 0;
    const maxDigit = tight === 1 ? s.charCodeAt(digitIndex) - 48 : 1;
    for (let digit = 0; digit <= maxDigit; digit++) {
      const nextTight = tight === 1 && digit === maxDigit ? 1 : 0;
      result =
        (result + count(digitIndex + 1, setBits + digit, nextTight)) % MOD;
    }

    mem[digitIndex][setBits][tight] = result;
    return result;
  };

  return (count(0, 0, 1) - 1 + MOD) % MOD;
};
