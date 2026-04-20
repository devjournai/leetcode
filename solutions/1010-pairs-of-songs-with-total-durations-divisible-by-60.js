/**
 * Pairs Of Songs With Total Durations Divisible By 60
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
