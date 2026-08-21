/**
 * Count the Number of Arrays with K Matching Adjacent Elements
 * Intuition: An array of length n over [1..m] with exactly k positions i where arr[i]==arr[i+1] is a run-length picture: n-k groups of equal values, adjacent groups different. Choose the k "equal-neighbor" slots among n-1 boundaries, first group m ways, each later group m-1 ways.
 * Approach: 1. Answer = m * (m-1)^(n-k-1) * C(n-1, k) mod 1e9+7. 2. Precompute fact, inv, invFact and modular exponentiation.
 * Dry Run: n=3, m=2, k=1. C(2,1)=2, 2 * 1^1 * 2 = 4 arrays of length 3 with exactly one equal adjacent pair.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var countGoodArrays = function (n, m, k) {
  const MOD = 1000000007n;
  const length = BigInt(n);
  const alphabetSize = BigInt(m);
  const equalCount = BigInt(k);

  const factorial = new Array(n + 1);
  const inverse = new Array(n + 1);
  const inverseFactorial = new Array(n + 1);
  factorial[0] = 1n;
  inverseFactorial[0] = 1n;
  inverse[0] = 1n;
  inverse[1] = 1n;

  for (let index = 1; index <= n; index++) {
    if (index >= 2) {
      inverse[index] =
        (MOD -
          (((MOD / BigInt(index)) * inverse[Number(MOD % BigInt(index))]) %
            MOD)) %
        MOD;
    }
    factorial[index] = (factorial[index - 1] * BigInt(index)) % MOD;
    inverseFactorial[index] =
      (inverseFactorial[index - 1] * inverse[index]) % MOD;
  }

  const modPow = (base, exponent) => {
    let result = 1n;
    let currentBase = ((base % MOD) + MOD) % MOD;
    let remaining = exponent;
    while (remaining > 0n) {
      if (remaining % 2n === 1n) {
        result = (result * currentBase) % MOD;
      }
      currentBase = (currentBase * currentBase) % MOD;
      remaining /= 2n;
    }
    return result;
  };

  const nCk = (total, choose) => {
    if (choose < 0n || choose > total) {
      return 0n;
    }
    return (
      (((factorial[Number(total)] * inverseFactorial[Number(choose)]) % MOD) *
        inverseFactorial[Number(total - choose)]) %
      MOD
    );
  };

  const ways =
    (((alphabetSize * modPow(alphabetSize - 1n, length - equalCount - 1n)) %
      MOD) *
      nCk(length - 1n, equalCount)) %
    MOD;

  return Number(ways);
};
