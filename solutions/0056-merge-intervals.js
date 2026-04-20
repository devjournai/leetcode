/**
 * Merge Intervals
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
*/
var merge = function (inputIntervals) {
    if (inputIntervals.length === 0) {
        return [];
    }

    inputIntervals.sort((firstValue, secondValue) => firstValue[0] - secondValue[0]);

    const mergedCollection = [];
    mergedCollection.push(inputIntervals[0]);

    for (let currentIndex = 1; currentIndex < inputIntervals.length; currentIndex++) {
        const currentCheckInterval = inputIntervals[currentIndex];
        const previousMergedInterval = mergedCollection[mergedCollection.length - 1];

        const currentStartPoint = currentCheckInterval[0];
        const currentEndPoint = currentCheckInterval[1];
        const previousEndPoint = previousMergedInterval[1];

        if (currentStartPoint <= previousEndPoint) {
            const updatedEndPoint = Math.max(previousEndPoint, currentEndPoint);
            previousMergedInterval[1] = updatedEndPoint;
        } else {
            mergedCollection.push(currentCheckInterval);
        }
    }

    return mergedCollection;
};