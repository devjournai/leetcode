/**
 * Kth Largest Element In An Array
 * Time Complexity: O(N)
 * Space Complexity: O(log N)
 */
var findKthLargest = function (nums, k) {
  const arrayLength = nums.length;
  const targetRank = arrayLength - k;

  const swapElements = (arr, indexA, indexB) => {
    const tempValue = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = tempValue;
  };

  const partitionArray = (currentArray, leftBound, rightBound) => {
    const pivotElement = currentArray[rightBound];
    let partitionPointer = leftBound;

    for (
      let currentElementIndex = leftBound;
      currentElementIndex < rightBound;
      currentElementIndex++
    ) {
      if (currentArray[currentElementIndex] < pivotElement) {
        swapElements(currentArray, partitionPointer, currentElementIndex);
        partitionPointer++;
      }
    }
    swapElements(currentArray, partitionPointer, rightBound);
    return partitionPointer;
  };

  const performQuickSelect = (
    dataset,
    lowPointer,
    highPointer,
    requiredIndex,
  ) => {
    if (lowPointer === highPointer) {
      return dataset[lowPointer];
    }

    let actualPivotPosition = partitionArray(dataset, lowPointer, highPointer);

    if (actualPivotPosition === requiredIndex) {
      return dataset[actualPivotPosition];
    } else if (requiredIndex < actualPivotPosition) {
      return performQuickSelect(
        dataset,
        lowPointer,
        actualPivotPosition - 1,
        requiredIndex,
      );
    } else {
      return performQuickSelect(
        dataset,
        actualPivotPosition + 1,
        highPointer,
        requiredIndex,
      );
    }
  };

  return performQuickSelect(nums, 0, arrayLength - 1, targetRank);
};
