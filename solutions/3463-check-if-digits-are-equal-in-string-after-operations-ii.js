/**
 * Check If Digits Are Equal in String After Operations II
 * Intuition: Each original digit `s[i]` contributes `C(n-2, i)` times (mod 10) to the left final digit and `C(n-2, i-1)` to the right. Compare the two weighted sums mod 10. Use Lucas + CRT because we need `C(n,k) mod 10` and 10 = 2*5.
 * Approach: 1. For i in `[0, n-2]`, coefficient = `C(n-2, i) mod 10`. 2. Add `coeff * s[i]` into `leftDigit` and `coeff * s[i+1]` into `rightDigit`, both mod 10. 3. `C(n,k) mod 10` from Lucas on 2 and 5, then a 2×5 lookup table. 4. Equal digits iff the two sums match.
 * Dry Run: Same recurrence as Operations I, but n can be 1e5 so binomial weights replace explicit rounds. s = "3902" still maps to equal finals.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
function binomial(n, k) {
  if (k > n) {
    return 0;
  }
  let result = 1;
  for (let index = 0; index < k; index++) {
    result *= n - index;
    result = Math.floor(result / (index + 1));
  }
  return result;
}

function lucasTheorem(n, k, prime) {
  let result = 1;
  while (n > 0 || k > 0) {
    result = (result * binomial(n % prime, k % prime)) % prime;
    n = Math.floor(n / prime);
    k = Math.floor(k / prime);
  }
  return result;
}

function binomialMod10(n, k) {
  const mod2 = lucasTheorem(n, k, 2);
  const mod5 = lucasTheorem(n, k, 5);
  const lookup = [
    [0, 6, 2, 8, 4],
    [5, 1, 7, 3, 9],
  ];
  return lookup[mod2][mod5];
}

var hasSameDigits = function (s) {
  const n = s.length;
  let leftDigit = 0;
  let rightDigit = 0;

  for (let index = 0; index + 1 < n; index++) {
    const coefficient = binomialMod10(n - 2, index);
    leftDigit = (leftDigit + coefficient * (s.charCodeAt(index) - 48)) % 10;
    rightDigit =
      (rightDigit + coefficient * (s.charCodeAt(index + 1) - 48)) % 10;
  }

  return leftDigit === rightDigit;
};
