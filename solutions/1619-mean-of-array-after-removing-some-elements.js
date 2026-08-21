/**
 * Mean Of Array After Removing Some Elements
 * Intuition: Drop the smallest and largest 5% after sorting, then average the remaining middle 90%.
 * Approach: 1. Copy and sort the array. 2. Let t = 0.05 * n. 3. Slice [t, n-t), sum those values, divide by the slice length.
 * Dry Run: n=20 so t=1; after sort drop first and last, mean of the other 18.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var trimMean = function (inputArray) {
  const arrayLength = inputArray.length;
  const elementsToTrimCount = arrayLength * 0.05;

  const sortedElements = [...inputArray].sort(
    (firstElement, secondElement) => firstElement - secondElement
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
