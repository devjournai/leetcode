/**
 * Degree Of An Array
 * Intuition: The degree is the max frequency. The shortest subarray with that degree is the tightest span from first to last index among all values that achieve the max frequency.
 * Approach: 1. Map each value to `{frequencyCount, firstOccurrenceIndex, lastOccurrenceIndex}`. 2. Scan the map: if frequency > `maximumDegree`, take that span; if equal, keep the shorter span.
 * Dry Run: nums=[1,2,2,3,1]. 1: freq 2 span 0..4 len 5; 2: freq 2 span 1..2 len 2. Degree 2 → shortestSubarrayValue=2.
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
