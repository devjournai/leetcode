/**
 * Minimum Absolute Difference Queries
 * Intuition: Values are 1..100. Prefix counts tell which values appear in a range; the min gap between consecutive present values is the answer.
 * Approach: 1. Build `prefixOccurrences[i][v]`. 2. For each query, walk v=1..100, detect present values, track min consecutive difference. 3. If fewer than two distinct, -1.
 * Dry Run: nums=[1,3,4,8], queries=[[0,1]]. Present 1 and 3 → 2.
 * Time Complexity: O(N * M + Q * M)
 * Space Complexity: O(N * M + Q)
 */
var minDifference = function (nums, queries) {
  const maximumVal = 100;

  const prefixOccurrences = Array.from({ length: nums.length + 1 }, () =>
    new Array(maximumVal + 1).fill(0)
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
            absoluteDifferenceCandidate
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
