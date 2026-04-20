/**
 * Mean Of Array After Removing Some Elements
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var trimMean = function (inputArray) {
  const arrayLength = inputArray.length;
  const elementsToTrimCount = arrayLength * 0.05;

  const sortedElements = [...inputArray].sort(
    (firstElement, secondElement) => firstElement - secondElement,
  );

  const startTrimIndex = elementsToTrimCount;
  const endTrimIndex = arrayLength - elementsToTrimCount;

  const processedElements = sortedElements.slice(startTrimIndex, endTrimIndex);

  let totalSum = 0;
  for (let currentNumber of processedElements) {
    totalSum += currentNumber;
  }

  const finalCount = processedElements.length;
  const meanValue = totalSum / finalCount;

  return meanValue;
};
