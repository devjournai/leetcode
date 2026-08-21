/**
 * Poor Pigs
 * Intuition: Each pig has `tests+1` states (die in round 1..T or survive). Information needed is `states^pigs ≥ buckets`.
 * Approach: 1. One bucket → 0 pigs. 2. `totalTestingRounds = floor(minutesToTest/minutesToDie)`, `possiblePigOutcomes = rounds+1`. 3. Return `ceil(log(buckets)/log(outcomes))`.
 * Dry Run: buckets=4, die=15, test=15. Rounds=1, states=2, ceil(log4/log2)=2.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var poorPigs = function (buckets, minutesToDie, minutesToTest) {
  if (buckets === 1) {
    return 0;
  }

  const totalTestingRounds = Math.floor(minutesToTest / minutesToDie);
  const possiblePigOutcomes = totalTestingRounds + 1;
  let requiredPigs = 0;

  requiredPigs = Math.ceil(Math.log(buckets) / Math.log(possiblePigOutcomes));

  return requiredPigs;
};
