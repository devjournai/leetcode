/**
 * Teemo Attacking
 * Time Complexity: O(N)
 * Space Complexity: O(1)
*/
var findPoisonedDuration = function (timeSeries, duration) {
    let totalPoisonSeconds = 0;
    let seriesLength = timeSeries.length;

    if (seriesLength === 0) {
        return 0;
    }

    for (let currentAttackIndex = 0; currentAttackIndex < seriesLength; currentAttackIndex++) {
        let currentAttackMoment = timeSeries[currentAttackIndex];
        let nextAttackMoment;

        if (currentAttackIndex + 1 < seriesLength) {
            nextAttackMoment = timeSeries[currentAttackIndex + 1];
        } else {
            nextAttackMoment = currentAttackMoment + duration;
        }

        let contributionValue = Math.min(duration, nextAttackMoment - currentAttackMoment);
        totalPoisonSeconds += contributionValue;
    }

    return totalPoisonSeconds;
};