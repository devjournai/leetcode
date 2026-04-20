/**
 * Ways To Split Array Into Three Subarrays
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var waysToSplit = function (inputNumbers) {
  const moduloValue = 1e9 + 7;
  const arrayLength = inputNumbers.length;

  const cumulativeSums = new Array(arrayLength).fill(0);
  cumulativeSums[0] = inputNumbers[0];
  for (
    let currentNumberIndex = 1;
    currentNumberIndex < arrayLength;
    currentNumberIndex++
  ) {
    cumulativeSums[currentNumberIndex] =
      cumulativeSums[currentNumberIndex - 1] + inputNumbers[currentNumberIndex];
  }

  let totalValidSplits = 0;
  let minSecondSplitEndIndex = 1;
  let maxSecondSplitEndIndex = 1;

  for (
    let firstSplitEndIndex = 0;
    firstSplitEndIndex < arrayLength - 2;
    firstSplitEndIndex++
  ) {
    const currentLeftSum = cumulativeSums[firstSplitEndIndex];

    minSecondSplitEndIndex = Math.max(
      minSecondSplitEndIndex,
      firstSplitEndIndex + 1,
    );

    while (
      minSecondSplitEndIndex < arrayLength - 1 &&
      cumulativeSums[minSecondSplitEndIndex] < 2 * currentLeftSum
    ) {
      minSecondSplitEndIndex++;
    }

    if (minSecondSplitEndIndex >= arrayLength - 1) {
      continue;
    }

    maxSecondSplitEndIndex = Math.max(
      maxSecondSplitEndIndex,
      minSecondSplitEndIndex,
    );

    while (
      maxSecondSplitEndIndex < arrayLength - 1 &&
      cumulativeSums[maxSecondSplitEndIndex] - currentLeftSum <=
        cumulativeSums[arrayLength - 1] - cumulativeSums[maxSecondSplitEndIndex]
    ) {
      maxSecondSplitEndIndex++;
    }

    if (minSecondSplitEndIndex <= maxSecondSplitEndIndex - 1) {
      totalValidSplits =
        (totalValidSplits + (maxSecondSplitEndIndex - minSecondSplitEndIndex)) %
        moduloValue;
    }
  }

  return totalValidSplits;
};
