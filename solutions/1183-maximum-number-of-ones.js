/**
 * Maximum Number Of Ones
 * Time Complexity: O(sideLength^2 * log(sideLength))
 * Space Complexity: O(sideLength^2)
 */
var maximumNumberOfOnes = function (width, height, sideLength, maxOnes) {
  const occurrenceCounts = [];

  const totalBlockCells = sideLength * sideLength;
  for (
    let positionIndex = 0;
    positionIndex < totalBlockCells;
    positionIndex++
  ) {
    const derivedRowOffset = Math.floor(positionIndex / sideLength);
    const derivedColOffset = positionIndex % sideLength;

    const rowsContribution = Math.ceil(
      (height - derivedRowOffset) / sideLength,
    );
    const colsContribution = Math.ceil((width - derivedColOffset) / sideLength);

    const totalContribution = rowsContribution * colsContribution;
    occurrenceCounts.push(totalContribution);
  }

  const sortedOccurrenceCounts = occurrenceCounts.sort(
    (firstVal, secondVal) => secondVal - firstVal,
  );

  let finalOnesCount = 0;
  let counterIdx = 0;
  while (counterIdx < maxOnes && counterIdx < sortedOccurrenceCounts.length) {
    finalOnesCount += sortedOccurrenceCounts[counterIdx];
    counterIdx++;
  }

  return finalOnesCount;
};
