/**
 * Two Best Non-Overlapping Events
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
*/
var maxTwoEvents = function (eventCollection) {
    let sortedEvents = [...eventCollection];
    sortedEvents.sort((eventA, eventB) => eventA[1] - eventB[1]);

    let currentMaxIndividualValue = 0;
    const prefixMaximums = sortedEvents.map((anEvent) => {
        currentMaxIndividualValue = Math.max(currentMaxIndividualValue, anEvent[2]);
        return currentMaxIndividualValue;
    });

    let overallMaximumSum = 0;
    for (let eventIterator = 0; eventIterator < sortedEvents.length; ++eventIterator) {
        const currentSelectedEvent = sortedEvents[eventIterator];
        overallMaximumSum = Math.max(overallMaximumSum, currentSelectedEvent[2]);

        let leftBoundary = 0;
        let rightBoundary = eventIterator - 1;
        let foundOptimalPriorIndex = -1;

        while (leftBoundary <= rightBoundary) {
            const midPoint = Math.floor((leftBoundary + rightBoundary) / 2);
            if (sortedEvents[midPoint][1] < currentSelectedEvent[0]) {
                foundOptimalPriorIndex = midPoint;
                leftBoundary = midPoint + 1;
            } else {
                rightBoundary = midPoint - 1;
            }
        }

        if (foundOptimalPriorIndex !== -1) {
            overallMaximumSum = Math.max(overallMaximumSum, currentSelectedEvent[2] + prefixMaximums[foundOptimalPriorIndex]);
        }
    }

    return overallMaximumSum;
};