/**
 * Smallest Good Base
 * Intuition: n in base k is all-ones of length m+1 iff n = (k^(m+1)-1)/(k-1). Smaller bases correspond to longer 1-strings, so try exponents from floor(log2 n) down to 1 and test the integer k ≈ n^(1/m).
 * Approach: 1. For `currentExponent` from that max down to 1, `candidateBase = floor(n^(1/exponent))` as BigInt; skip if < 2. 2. Check `(base^(exponent+1)-1)/(base-1) === n`. 3. If some exponent works, return that base as a string; otherwise n is 1…1 in base n-1, so return `n-1`.
 * Dry Run: n = "13".
 *   - maxExponent = floor(log2 13)=3. exp 3: base floor(13^(1/3))=2. (2^4-1)/(2-1)=15 ≠ 13. exp 2: floor(13^0.5)=3. (3^3-1)/2=13. Return "3".
 * Time Complexity: O((log N)^2)
 * Space Complexity: O(1)
 */
var smallestGoodBase = function (n) {
  const numValue = BigInt(n);
  const maximumExponent = Math.floor(Math.log2(Number(n)));
  for (
    let currentExponent = maximumExponent;
    currentExponent >= 1;
    currentExponent--
  ) {
    const candidateBase = BigInt(
      Math.floor(Number(n) ** (1 / currentExponent))
    );

    if (candidateBase < 2n) {
      continue;
    }

    const denominatorValue = candidateBase - 1n;
    const numeratorValue = candidateBase ** BigInt(currentExponent + 1) - 1n;
    const computedSum = numeratorValue / denominatorValue;

    if (computedSum === numValue) {
      return candidateBase.toString();
    }
  }

  return (numValue - 1n).toString();
};
