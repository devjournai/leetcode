/**
 * Kth Largest Element In An Array
 * Intuition: The kth largest is the element at index n-k in 0-based sorted order. Quickselect partitions around a pivot and recurses only into the side that contains that index.
 * Approach: 1. targetRank = n - k. 2. partitionArray uses the rightmost value as pivot, swapping smaller items left. 3. If the pivot index equals targetRank, return it; else recurse left or right. 4. Return performQuickSelect on the full array.
 * Dry Run: nums = [3,2,1,5], k = 2 → targetRank = 2.
 *   - Pivot 5 partitions to index 3; 2 < 3 → recurse left on [3,2,1].
 *   - Later partition places 3 at index 2 === targetRank → return 3 (2nd largest).
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
    requiredIndex
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
        requiredIndex
      );
    } else {
      return performQuickSelect(
        dataset,
        actualPivotPosition + 1,
        highPointer,
        requiredIndex
      );
    }
  };

  return performQuickSelect(nums, 0, arrayLength - 1, targetRank);
};
