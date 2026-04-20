/**
 * Element Appearing More Than 25 In Sorted Array
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
