/**
 * Non Overlapping Intervals
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var eraseOverlapIntervals = function (intervalBounds) {
    if (intervalBounds.length === 0) {
        return 0;
    }

    intervalBounds.sort((firstPair, secondPair) => firstPair[1] - secondPair[1]);

    let removedIntervalsCounter = 0;
    let previousEndingPoint = intervalBounds[0][1];

    for (let indexValue = 1; indexValue < intervalBounds.length; indexValue++) {
        const currentRange = intervalBounds[indexValue];
        const currentStartingPoint = currentRange[0];
        const currentEndingPoint = currentRange[1];

        if (currentStartingPoint < previousEndingPoint) {
            removedIntervalsCounter++;
        } else {
            previousEndingPoint = currentEndingPoint;
        }
    }

    return removedIntervalsCounter;
};