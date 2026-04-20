/**
 * Construct Target Array With Multiple Sums
 * Time Complexity: O(N * log N * log M)
 * Space Complexity: O(N)
 */
var isPossible = function (targetArrayElements) {
  if (targetArrayElements.length === 1) {
    return targetArrayElements[0] === 1;
  }

  let currentTotalSum = targetArrayElements.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  const valueHeap = [...targetArrayElements];

  function siftDown(currentPosition) {
    let maximalIndex = currentPosition;
    const childOneIndex = 2 * currentPosition + 1;
    const childTwoIndex = 2 * currentPosition + 2;

    if (childOneIndex < valueHeap.length) {
      if (valueHeap[childOneIndex] > valueHeap[maximalIndex]) {
        maximalIndex = childOneIndex;
      }
    }

    if (childTwoIndex < valueHeap.length) {
      if (valueHeap[childTwoIndex] > valueHeap[maximalIndex]) {
        maximalIndex = childTwoIndex;
      }
    }

    if (maximalIndex !== currentPosition) {
      [valueHeap[currentPosition], valueHeap[maximalIndex]] = [
        valueHeap[maximalIndex],
        valueHeap[currentPosition],
      ];
      siftDown(maximalIndex);
    }
  }

  function constructMaxHeap() {
    const heapSize = valueHeap.length;
    let initialHeapBuildIndex = Math.floor(heapSize / 2) - 1;

    let heapBuildIterator = initialHeapBuildIndex;
    while (heapBuildIterator >= 0) {
      siftDown(heapBuildIterator);
      heapBuildIterator--;
    }
  }

  constructMaxHeap();

  const rootElementIndex = 0;

  let processElements = true;
  while (processElements) {
    if (valueHeap[rootElementIndex] <= 1) {
      processElements = false;
      continue;
    }

    const peakElement = valueHeap[rootElementIndex];
    currentTotalSum -= peakElement;

    if (currentTotalSum < 1) {
      return false;
    }

    const reducedValue =
      peakElement -
      Math.floor((peakElement - 1) / currentTotalSum) * currentTotalSum;

    if (reducedValue < 1 || reducedValue >= peakElement) {
      return false;
    }

    currentTotalSum += reducedValue;
    valueHeap[rootElementIndex] = reducedValue;
    siftDown(rootElementIndex);
  }

  return true;
};
