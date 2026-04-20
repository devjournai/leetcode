/**
 * Degree Of An Array
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var findShortestSubArray = function (nums) {
  const elementPositions = new Map();

  for (
    let currentNumberIndex = 0;
    currentNumberIndex < nums.length;
    currentNumberIndex++
  ) {
    const currentElementValue = nums[currentNumberIndex];
    if (!elementPositions.has(currentElementValue)) {
      elementPositions.set(currentElementValue, {
        frequencyCount: 1,
        firstOccurrenceIndex: currentNumberIndex,
        lastOccurrenceIndex: currentNumberIndex,
      });
    } else {
      const existingElementData = elementPositions.get(currentElementValue);
      existingElementData.frequencyCount++;
      existingElementData.lastOccurrenceIndex = currentNumberIndex;
    }
  }

  let maximumDegree = 0;
  let shortestSubarrayValue = Infinity;

  for (const entryDetail of elementPositions.values()) {
    const currentElementFrequency = entryDetail.frequencyCount;
    const startPosition = entryDetail.firstOccurrenceIndex;
    const endPosition = entryDetail.lastOccurrenceIndex;
    const subarrayLength = endPosition - startPosition + 1;

    if (currentElementFrequency > maximumDegree) {
      maximumDegree = currentElementFrequency;
      shortestSubarrayValue = subarrayLength;
    } else if (currentElementFrequency === maximumDegree) {
      shortestSubarrayValue = Math.min(shortestSubarrayValue, subarrayLength);
    }
  }

  return shortestSubarrayValue;
};
