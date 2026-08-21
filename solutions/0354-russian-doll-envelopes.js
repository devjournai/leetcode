/**
 * Russian Doll Envelopes
 * Intuition: After sorting by increasing width (and decreasing height on ties so equal widths cannot nest), nesting reduces to the longest strictly increasing sequence of heights, which we maintain as a patience-sort tails array.
 * Approach: 1. Sort envelopes: width ascending, height descending on equal width. 2. For each height, binary-search the first tails value `>=` that height and replace it (or append if it is larger than every tail). 3. Return the tails length.
 * Dry Run: [[5,4],[6,4],[6,7],[2,3]] → sort to [2,3],[5,4],[6,7],[6,4]. Tails: 3 → 3,4 → 3,4,7 → replace 7 with 4 → length 3.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maxEnvelopes = function (envelopes) {
  envelopes.sort((envelopeOne, envelopeTwo) => {
    if (envelopeOne[0] !== envelopeTwo[0]) {
      return envelopeOne[0] - envelopeTwo[0];
    }
    return envelopeTwo[1] - envelopeOne[1];
  });

  const longestIncreasingSubsequenceTails = [];

  for (const currentEnvelopeTuple of envelopes) {
    const currentHeightValue = currentEnvelopeTuple[1];

    let lowIndex = 0;
    let highIndex = longestIncreasingSubsequenceTails.length;
    let foundPosition = highIndex;

    while (lowIndex < highIndex) {
      const midIndex = Math.floor((lowIndex + highIndex) / 2);
      const midValue = longestIncreasingSubsequenceTails[midIndex];

      if (midValue >= currentHeightValue) {
        foundPosition = midIndex;
        highIndex = midIndex;
      } else {
        lowIndex = midIndex + 1;
      }
    }

    if (foundPosition === longestIncreasingSubsequenceTails.length) {
      longestIncreasingSubsequenceTails.push(currentHeightValue);
    } else {
      longestIncreasingSubsequenceTails[foundPosition] = currentHeightValue;
    }
  }

  return longestIncreasingSubsequenceTails.length;
};
