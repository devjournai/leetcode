/**
 * Count Good Numbers
 * Time Complexity: O(log n)
 * Space Complexity: O(log n)
 */
var countGoodNumbers = function (n) {
  const calculationModulus = 1000000007;
  const choicesForEvenPositions = 5;
  const choicesForOddPositions = 4;

  const totalEvenIndices = Math.ceil(n / 2);
  const totalOddIndices = Math.floor(n / 2);

  function powerModular(baseNumber, exponentValue) {
    if (exponentValue === 0) {
      return 1n;
    }
    let intermediateResult = powerModular(
      baseNumber,
      Math.floor(exponentValue / 2),
    );
    let squaredHalf =
      (intermediateResult * intermediateResult) % BigInt(calculationModulus);

    if (exponentValue % 2 === 1) {
      return (squaredHalf * BigInt(baseNumber)) % BigInt(calculationModulus);
    } else {
      return squaredHalf;
    }
  }

  const resultForEvenIndices = powerModular(
    choicesForEvenPositions,
    totalEvenIndices,
  );
  const resultForOddIndices = powerModular(
    choicesForOddPositions,
    totalOddIndices,
  );

  const finalAnswer =
    (resultForEvenIndices * resultForOddIndices) % BigInt(calculationModulus);

  return Number(finalAnswer);
};
