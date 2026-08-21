/**
 * Pairs Of Songs With Total Durations Divisible By 60
 * Intuition: Two times sum to a multiple of 60 iff their remainders add to 0 or 60. Count seen remainders as we go.
 * Approach: 1. Keep a length-60 frequency array. 2. For each time, add the count of (60 - r) % 60. 3. Then increment r's bucket.
 * Dry Run: time = [30,20,150,100,40].
 *   - 30: complement 30, pairs=0. 20: complement 40, 0. 150 remainder 30 pairs with first 30. 100 remainder 40. 40 pairs with 20. Total 3.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var numPairsDivisibleBy60 = function (time) {
  const remainderFrequencies = new Array(60).fill(0);
  let totalValidPairs = 0;

  for (const currentSongTime of time) {
    const currentDurationRemainder = currentSongTime % 60;
    const requiredComplementRemainder = (60 - currentDurationRemainder) % 60;

    totalValidPairs += remainderFrequencies[requiredComplementRemainder];
    remainderFrequencies[currentDurationRemainder]++;
  }

  return totalValidPairs;
};
