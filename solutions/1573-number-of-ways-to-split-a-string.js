/**
 * Number Of Ways To Split A String
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var numWays = function (s) {
  const moduloConst = 1e9 + 7;
  let totalOnesCount = 0;
  const oneIndicesArray = [];

  for (let indexIterator = 0; indexIterator < s.length; indexIterator++) {
    if (s[indexIterator] === "1") {
      totalOnesCount++;
      oneIndicesArray.push(indexIterator);
    }
  }

  if (totalOnesCount % 3 !== 0) {
    return 0;
  }

  if (totalOnesCount === 0) {
    const stringLength = s.length;
    const bigIntStringLength = BigInt(stringLength);
    const bigIntOptionsForFirstCut = bigIntStringLength - 1n;
    const bigIntOptionsForSecondCut = bigIntStringLength - 2n;
    const bigIntTwo = 2n;
    const bigIntModulo = BigInt(moduloConst);
    const bigIntResultZeroOnes =
      ((bigIntOptionsForFirstCut * bigIntOptionsForSecondCut) / bigIntTwo) %
      bigIntModulo;
    return Number(bigIntResultZeroOnes);
  }

  const segmentTargetOnes = totalOnesCount / 3;

  const firstSplitStartBoundary = oneIndicesArray[segmentTargetOnes - 1];
  const firstSplitEndBoundary = oneIndicesArray[segmentTargetOnes];
  const secondSplitStartBoundary = oneIndicesArray[2 * segmentTargetOnes - 1];
  const secondSplitEndBoundary = oneIndicesArray[2 * segmentTargetOnes];

  const waysForFirstCut = firstSplitEndBoundary - firstSplitStartBoundary;
  const waysForSecondCut = secondSplitEndBoundary - secondSplitStartBoundary;

  const bigIntFirstWays = BigInt(waysForFirstCut);
  const bigIntSecondWays = BigInt(waysForSecondCut);
  const bigIntModuloValue = BigInt(moduloConst);

  const bigIntFinalAnswer =
    (bigIntFirstWays * bigIntSecondWays) % bigIntModuloValue;

  return Number(bigIntFinalAnswer);
};
