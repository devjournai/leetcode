/**
 * Reduce Array Size To The Half
 * Time Complexity: O(N + U log U)
 * Space Complexity: O(U)
 */
var minSetSize = function (arr) {
  const elementFrequencies = new Map();
  const halfArrayLength = arr.length / 2;

  for (let indexValue = 0; indexValue < arr.length; indexValue++) {
    const currentElement = arr[indexValue];
    elementFrequencies.set(
      currentElement,
      (elementFrequencies.get(currentElement) || 0) + 1,
    );
  }

  const frequencyList = Array.from(elementFrequencies.values()).sort(
    (valueA, valueB) => valueB - valueA,
  );

  let removedItemsTotal = 0;
  let minimumSetCount = 0;

  for (let freqIndex = 0; freqIndex < frequencyList.length; freqIndex++) {
    const currentFrequencyValue = frequencyList[freqIndex];
    removedItemsTotal += currentFrequencyValue;
    minimumSetCount++;
    if (removedItemsTotal >= halfArrayLength) {
      break;
    }
  }

  return minimumSetCount;
};
