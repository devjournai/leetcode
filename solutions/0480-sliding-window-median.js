/**
 * Sliding Window Median
 * Intuition: A max-heap holds the lower half of the window and a min-heap the upper half. The median is the max-heap top (odd k) or the average of both tops (even k). Lazy deletion plus a balance delta keeps heaps the right size as the window slides.
 * Approach: 1. Enqueue the first k numbers into the max-heap, then move `floor(k/2)` of them into the min-heap. 2. For each window, push the median, then mark the leaving value in `removalFrequencyMap` and insert the entering value on the correct side of the current pivot. 3. `relativeBalanceShift` of ±2/0 decides a rebalance move between heaps. 4. Pop heap tops while they are stale (frequency > 0).
 * Dry Run: nums = [1,3,-1,-3,5,3,6,7], k = 3.
 *   - First window [1,3,-1] (odd k) → median is the max-heap top 1.
 *   - Slide: out 1 in -3 → median -1; out 3 in 5 → -1; out -1 in 3 → 3; out -3 in 6 → 5; out 5 in 7 → 6.
 *   - Return [1,-1,-1,3,5,6].
 * Time Complexity: O(N log K)
 * Space Complexity: O(K)
 */
var medianSlidingWindow = function (inputNumbers, windowSize) {
  const maxPriorityQueueForSmallerHalf = new MaxPriorityQueue();
  const minPriorityQueueForLargerHalf = new MinPriorityQueue();
  const medianValuesArray = [];
  const removalFrequencyMap = {};

  for (
    let initialElementIndex = 0;
    initialElementIndex < windowSize;
    initialElementIndex++
  ) {
    maxPriorityQueueForSmallerHalf.enqueue(inputNumbers[initialElementIndex]);
  }

  const targetMinHeapCount = Math.floor(windowSize / 2);
  for (
    let balanceIterator = 0;
    balanceIterator < targetMinHeapCount;
    balanceIterator++
  ) {
    minPriorityQueueForLargerHalf.enqueue(
      maxPriorityQueueForSmallerHalf.dequeue().element
    );
  }

  for (
    let currentWindowRight = windowSize;
    currentWindowRight <= inputNumbers.length;
    currentWindowRight++
  ) {
    if (windowSize % 2 === 1) {
      medianValuesArray.push(maxPriorityQueueForSmallerHalf.front().element);
    } else {
      const currentMedianSum =
        maxPriorityQueueForSmallerHalf.front().element +
        minPriorityQueueForLargerHalf.front().element;
      medianValuesArray.push(currentMedianSum / 2);
    }

    if (currentWindowRight === inputNumbers.length) {
      break;
    }

    const elementLeaving = inputNumbers[currentWindowRight - windowSize];
    const elementEntering = inputNumbers[currentWindowRight];

    removalFrequencyMap[elementLeaving] =
      (removalFrequencyMap[elementLeaving] || 0) + 1;

    const currentWindowMedianPivot =
      maxPriorityQueueForSmallerHalf.front().element;

    const relativeBalanceShift =
      (elementLeaving <= currentWindowMedianPivot ? -1 : 1) +
      (elementEntering <= currentWindowMedianPivot ? 1 : -1);

    if (elementEntering <= currentWindowMedianPivot) {
      maxPriorityQueueForSmallerHalf.enqueue(elementEntering);
    } else {
      minPriorityQueueForLargerHalf.enqueue(elementEntering);
    }

    if (relativeBalanceShift < 0 && minPriorityQueueForLargerHalf.size() > 0) {
      maxPriorityQueueForSmallerHalf.enqueue(
        minPriorityQueueForLargerHalf.dequeue().element
      );
    } else if (
      relativeBalanceShift > 0 &&
      maxPriorityQueueForSmallerHalf.size() > 0
    ) {
      minPriorityQueueForLargerHalf.enqueue(
        maxPriorityQueueForSmallerHalf.dequeue().element
      );
    }

    while (
      maxPriorityQueueForSmallerHalf.size() > 0 &&
      removalFrequencyMap[maxPriorityQueueForSmallerHalf.front().element] > 0
    ) {
      removalFrequencyMap[maxPriorityQueueForSmallerHalf.front().element]--;
      maxPriorityQueueForSmallerHalf.dequeue();
    }
    while (
      minPriorityQueueForLargerHalf.size() > 0 &&
      removalFrequencyMap[minPriorityQueueForLargerHalf.front().element] > 0
    ) {
      removalFrequencyMap[minPriorityQueueForLargerHalf.front().element]--;
      minPriorityQueueForLargerHalf.dequeue();
    }
  }

  return medianValuesArray;
};
