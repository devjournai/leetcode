/**
 * Sliding Window Median
 * Time Complexity: O(N log K)
 * Space Complexity: O(K)
 */
var medianSlidingWindow = function (inputNumbers, windowSize) {
    const maxPriorityQueueForSmallerHalf = new MaxPriorityQueue();
    const minPriorityQueueForLargerHalf = new MinPriorityQueue();
    const medianValuesArray = [];
    const removalFrequencyMap = {};

    for (let initialElementIndex = 0; initialElementIndex < windowSize; initialElementIndex++) {
        maxPriorityQueueForSmallerHalf.enqueue(inputNumbers[initialElementIndex]);
    }

    const targetMinHeapCount = Math.floor(windowSize / 2);
    for (let balanceIterator = 0; balanceIterator < targetMinHeapCount; balanceIterator++) {
        minPriorityQueueForLargerHalf.enqueue(maxPriorityQueueForSmallerHalf.dequeue().element);
    }

    for (let currentWindowRight = windowSize; currentWindowRight <= inputNumbers.length; currentWindowRight++) {
        if (windowSize % 2 === 1) {
            medianValuesArray.push(maxPriorityQueueForSmallerHalf.front().element);
        } else {
            const currentMedianSum = maxPriorityQueueForSmallerHalf.front().element + minPriorityQueueForLargerHalf.front().element;
            medianValuesArray.push(currentMedianSum / 2);
        }

        if (currentWindowRight === inputNumbers.length) {
            break;
        }

        const elementLeaving = inputNumbers[currentWindowRight - windowSize];
        const elementEntering = inputNumbers[currentWindowRight];

        removalFrequencyMap[elementLeaving] = (removalFrequencyMap[elementLeaving] || 0) + 1;

        const currentWindowMedianPivot = maxPriorityQueueForSmallerHalf.front().element;

        const relativeBalanceShift = (elementLeaving <= currentWindowMedianPivot ? -1 : 1) + (elementEntering <= currentWindowMedianPivot ? 1 : -1);

        if (elementEntering <= currentWindowMedianPivot) {
            maxPriorityQueueForSmallerHalf.enqueue(elementEntering);
        } else {
            minPriorityQueueForLargerHalf.enqueue(elementEntering);
        }

        if (relativeBalanceShift < 0 && minPriorityQueueForLargerHalf.size() > 0) {
            maxPriorityQueueForSmallerHalf.enqueue(minPriorityQueueForLargerHalf.dequeue().element);
        } else if (relativeBalanceShift > 0 && maxPriorityQueueForSmallerHalf.size() > 0) {
            minPriorityQueueForLargerHalf.enqueue(maxPriorityQueueForSmallerHalf.dequeue().element);
        }

        while (maxPriorityQueueForSmallerHalf.size() > 0 && removalFrequencyMap[maxPriorityQueueForSmallerHalf.front().element] > 0) {
            removalFrequencyMap[maxPriorityQueueForSmallerHalf.front().element]--;
            maxPriorityQueueForSmallerHalf.dequeue();
        }
        while (minPriorityQueueForLargerHalf.size() > 0 && removalFrequencyMap[minPriorityQueueForLargerHalf.front().element] > 0) {
            removalFrequencyMap[minPriorityQueueForLargerHalf.front().element]--;
            minPriorityQueueForLargerHalf.dequeue();
        }
    }

    return medianValuesArray;
};