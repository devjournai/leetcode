/**
 * Maximum Number Of Ones
 * Intuition: The tiled pattern of a sideLength×sideLength block repeats; each cell type appears a known number of times, so pick the maxOnes most frequent types.
 * Approach: 1. For every (r,c) in the block, count how many times that residue appears in the width×height grid. 2. Sort those frequencies descending. 3. Sum the top maxOnes values.
 * Dry Run: width=3, height=3, sideLength=2, maxOnes=1. Residues (0,0),(0,1),(1,0),(1,1) contribute 4,2,2,1. Top 1 → 4.
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
      (height - derivedRowOffset) / sideLength
    );
    const colsContribution = Math.ceil((width - derivedColOffset) / sideLength);

    const totalContribution = rowsContribution * colsContribution;
    occurrenceCounts.push(totalContribution);
  }

  const sortedOccurrenceCounts = occurrenceCounts.sort(
    (firstVal, secondVal) => secondVal - firstVal
  );

  let finalOnesCount = 0;
  let counterIdx = 0;
  while (counterIdx < maxOnes && counterIdx < sortedOccurrenceCounts.length) {
    finalOnesCount += sortedOccurrenceCounts[counterIdx];
    counterIdx++;
  }

  return finalOnesCount;
};
