/**
 * Find The Student That Will Replace The Chalk
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var chalkReplacer = function (chalk, k) {
  const totalChalkRequired = chalk.reduce(
    (accumulatorValue, currentChalkAmount) =>
      accumulatorValue + currentChalkAmount,
    0,
  );

  let initialChalkRemaining = k % totalChalkRequired;

  let processingIndex = 0;
  const arrayLength = chalk.length;

  while (processingIndex < arrayLength) {
    const studentChalkUsage = chalk[processingIndex];
    if (initialChalkRemaining < studentChalkUsage) {
      return processingIndex;
    }
    initialChalkRemaining -= studentChalkUsage;
    processingIndex++;
  }

  return 0;
};
