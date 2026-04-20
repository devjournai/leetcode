/**
 * Minimize Deviation In Array
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
      mainHeapContainer[0] - globalMinimumVal,
    );
  }

  return finalDeviationEstimate;
};
