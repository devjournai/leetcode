/**
 * Smallest Good Base
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
      Math.floor(Number(n) ** (1 / currentExponent)),
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
