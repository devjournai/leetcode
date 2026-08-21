/**
 * Element Appearing More Than 25 In Sorted Array
 * Intuition: In a sorted array a majority-over-25% value occupies a span longer than n/4, so arr[i] equals arr[i+floor(n/4)] for some i in that run.
 * Approach: 1. quarterLength = floor(n*0.25). 2. Walk currentPointer; if arr[p] == arr[p+quarterLength] return it. 3. Else skip to the next distinct value. 4. Return -1 if none.
 * Dry Run: arr = [1,2,2,6,6,6,6,7,10]
 *   n=9, quarterLength=2. At first 6 (index 3), arr[3]==arr[5]==6. Return 6.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var findSpecialInteger = function (arr) {
  const arraySize = arr.length;
  const quarterPercentage = 0.25;

  const quarterLength = Math.floor(arraySize * quarterPercentage);

  let currentPointer = 0;
  while (currentPointer < arraySize - quarterLength) {
    let observedValue = arr[currentPointer];
    let advancePointer = currentPointer + quarterLength;

    if (observedValue === arr[advancePointer]) {
      return observedValue;
    }

    let skipToNextDistinct = currentPointer;
    while (
      skipToNextDistinct < arraySize &&
      arr[skipToNextDistinct] === observedValue
    ) {
      skipToNextDistinct++;
    }
    currentPointer = skipToNextDistinct;
  }

  return -1;
};
