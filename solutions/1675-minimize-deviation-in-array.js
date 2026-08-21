/**
 * Minimize Deviation In Array
 * Intuition: Odds can only double once (then they become even); evens can only be halved. Normalize every number to its maximum even form, put them in a max-heap, and repeatedly halve the current max while tracking max-min.
 * Approach: 1. If odd, multiply by 2; push into a max-heap; track the global min. 2. Deviation = heapMax - min. 3. While the max is even, replace it with max/2, update min, heapify, and refresh deviation. 4. Stop when the max is odd (cannot shrink further).
 * Dry Run: nums = [1,2,3,4].
 *   - Normalize to [2,2,6,4], min=2, max=6, deviation=4. Halve 6→3, min=2, max=4, deviation=2. Halve 4→2, min=2, max=3, deviation=1. Max 3 is odd → 1.
 * Time Complexity: O(N * log(MAX_VAL) * logN)
 * Space Complexity: O(N)
 */
var minimumDeviation = function (inputNumbers) {
  const mainHeapContainer = [];
  let globalMinimumVal = Infinity;

  const percolateDown = (pDownCurrentIndex, pDownArraySize) => {
    let currentPosition = pDownCurrentIndex;
    while (2 * currentPosition + 1 < pDownArraySize) {
      let leftChildPosition = 2 * currentPosition + 1;
      let rightChildPosition = 2 * currentPosition + 2;
      let largestChildPosition = leftChildPosition;

      if (
        rightChildPosition < pDownArraySize &&
        mainHeapContainer[rightChildPosition] >
          mainHeapContainer[leftChildPosition]
      ) {
        largestChildPosition = rightChildPosition;
      }

      if (
        mainHeapContainer[currentPosition] <
        mainHeapContainer[largestChildPosition]
      ) {
        const tempSwapValue = mainHeapContainer[currentPosition];
        mainHeapContainer[currentPosition] =
          mainHeapContainer[largestChildPosition];
        mainHeapContainer[largestChildPosition] = tempSwapValue;
        currentPosition = largestChildPosition;
      } else {
        break;
      }
    }
  };

  for (
    let firstLoopCounter = 0;
    firstLoopCounter < inputNumbers.length;
    ++firstLoopCounter
  ) {
    const currentValueFromInput = inputNumbers[firstLoopCounter];
    const processedItem =
      currentValueFromInput % 2 !== 0
        ? currentValueFromInput * 2
        : currentValueFromInput;
    mainHeapContainer.push(processedItem);
    globalMinimumVal = Math.min(globalMinimumVal, processedItem);
  }

  const heapInitialBuildStart = Math.floor(mainHeapContainer.length / 2) - 1;
  for (
    let heapConstructionIndex = heapInitialBuildStart;
    heapConstructionIndex >= 0;
    --heapConstructionIndex
  ) {
    percolateDown(heapConstructionIndex, mainHeapContainer.length);
  }

  let finalDeviationEstimate = mainHeapContainer[0] - globalMinimumVal;

  while (mainHeapContainer[0] % 2 === 0) {
    const processingLoopMaxElement = mainHeapContainer[0];
    const reducedMaxElement = processingLoopMaxElement / 2;

    mainHeapContainer[0] = reducedMaxElement;
    globalMinimumVal = Math.min(globalMinimumVal, reducedMaxElement);

    percolateDown(0, mainHeapContainer.length);

    finalDeviationEstimate = Math.min(
      finalDeviationEstimate,
      mainHeapContainer[0] - globalMinimumVal
    );
  }

  return finalDeviationEstimate;
};
