/**
 * Missing Element In Sorted Array
 * Intuition: Missing count before index i is nums[i]-nums[0]-i. Binary search the smallest i whose missing count >= k, then the answer sits in the gap before that index.
 * Approach: 1. If k exceeds missing before the last value, return last + k - missing(last). 2. Binary search the leftmost index with missing>=k. 3. Return nums[lo-1] + k - missing(lo-1).
 * Dry Run: nums = [4,7,9,10], k = 1.
 *   - Missing before 7 is 2. lo lands at index 1. 4 + 1 - 0 = 5.
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var missingElement = function (numArray, targetK) {
  const arrayLength = numArray.length;

  const calculateMissingCount = (currentIndexParam) => {
    return numArray[currentIndexParam] - numArray[0] - currentIndexParam;
  };

  const finalMissingNumbers = calculateMissingCount(arrayLength - 1);

  if (targetK > finalMissingNumbers) {
    return numArray[arrayLength - 1] + targetK - finalMissingNumbers;
  }

  let lowBoundary = 0;
  let highBoundary = arrayLength - 1;

  while (lowBoundary < highBoundary) {
    const midPoint = Math.floor((lowBoundary + highBoundary) / 2);
    const currentMissingNumbers = calculateMissingCount(midPoint);

    if (currentMissingNumbers < targetK) {
      lowBoundary = midPoint + 1;
    } else {
      highBoundary = midPoint;
    }
  }

  const missingBeforeIndex = calculateMissingCount(lowBoundary - 1);
  return numArray[lowBoundary - 1] + targetK - missingBeforeIndex;
};
