/**
 * Longest Consecutive Sequence
 * Intuition: A consecutive run should be counted only from its smallest value (x where x-1 is absent), so each number is scanned a constant number of times overall.
 * Approach: 1. Empty array → 0. 2. Put nums in a set. 3. For each value, if value-1 is missing, walk value, value+1, … while present and track the streak. 4. Keep the maximum streak.
 * Dry Run: [100,4,200,1,3,2]. Starts at 1 (0 missing) and walks 1-2-3-4 length 4. 100 and 200 are length 1. Answer 4.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var longestConsecutive = function (nums) {
  if (nums.length === 0) {
    return 0;
  }

  let numberCollection = new Set(nums);
  let longestSequenceLength = 0;

  numberCollection.forEach(function (currentNumericalItem) {
    let previousNumericalItem = currentNumericalItem - 1;

    if (!numberCollection.has(previousNumericalItem)) {
      let currentSequenceExtent = 0;
      let sequenceProgressIdentifier = currentNumericalItem;

      do {
        currentSequenceExtent++;
        sequenceProgressIdentifier++;
      } while (numberCollection.has(sequenceProgressIdentifier));

      longestSequenceLength = Math.max(
        longestSequenceLength,
        currentSequenceExtent
      );
    }
  });

  return longestSequenceLength;
};
