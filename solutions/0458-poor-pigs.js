/**
 * Poor Pigs
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