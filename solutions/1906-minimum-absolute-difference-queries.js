/**
 * Minimum Absolute Difference Queries
 * Time Complexity: O(N * M + Q * M)
 * Space Complexity: O(N * M + Q)
 */
var minDifference = function (nums, queries) {
  const maximumVal = 100;

  const prefixOccurrences = Array.from({ length: nums.length + 1 }, () =>
    new Array(maximumVal + 1).fill(0),
  );

  for (let outerIndex = 0; outerIndex < nums.length; outerIndex++) {
    for (let innerValue = 1; innerValue <= maximumVal; innerValue++) {
      prefixOccurrences[outerIndex + 1][innerValue] =
        prefixOccurrences[outerIndex][innerValue];
    }
    const currentNumber = nums[outerIndex];
    prefixOccurrences[outerIndex + 1][currentNumber]++;
  }

  const queryResults = queries.map((currentQuery) => {
    const queryStart = currentQuery[0];
    const queryEnd = currentQuery[1];

    let minimumDifference = Infinity;
    let previousSeenValue = -1;

    for (
      let valueIteration = 1;
      valueIteration <= maximumVal;
      valueIteration++
    ) {
      const countForValue =
        prefixOccurrences[queryEnd + 1][valueIteration] -
        prefixOccurrences[queryStart][valueIteration];

      if (countForValue > 0) {
        if (previousSeenValue !== -1) {
          const absoluteDifferenceCandidate =
            valueIteration - previousSeenValue;
          minimumDifference = Math.min(
            minimumDifference,
            absoluteDifferenceCandidate,
          );
        }
        previousSeenValue = valueIteration;
      }
    }

    const finalAnswer = minimumDifference === Infinity ? -1 : minimumDifference;
    return finalAnswer;
  });

  return queryResults;
};
