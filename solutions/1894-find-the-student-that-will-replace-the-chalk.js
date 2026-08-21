/**
 * Find The Student That Will Replace The Chalk
 * Intuition: Full cycles use sum(chalk) pieces. Remainder k % sum is walked until a student cannot pay.
 * Approach: 1. `totalChalkRequired` = reduce. 2. `initialChalkRemaining = k % total`. 3. Subtract each student’s usage until remaining < usage; return that index.
 * Dry Run: chalk=[5,1,5], k=22. 22%11=0, student 0 needs 5 > 0. Return 0.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var chalkReplacer = function (chalk, k) {
  const totalChalkRequired = chalk.reduce(
    (accumulatorValue, currentChalkAmount) =>
      accumulatorValue + currentChalkAmount,
    0
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
