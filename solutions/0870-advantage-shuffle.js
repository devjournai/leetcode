/**
 * Advantage Shuffle
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var advantageCount = function (nums1, nums2) {
  const arrayLength = nums1.length;
  const sortedFirstArray = [...nums1].sort(
    (firstVal, secondVal) => firstVal - secondVal,
  );

  const indexedAndSortedSecondArray = nums2
    .map((elementVal, elementIdx) => ({
      value: elementVal,
      originalIndex: elementIdx,
    }))
    .sort((itemOne, itemTwo) => itemOne.value - itemTwo.value);

  const outputArrangement = new Array(arrayLength);
  let leftPointer = 0;
  let rightPointer = arrayLength - 1;

  let currentComparisonIndex = arrayLength - 1;
  while (currentComparisonIndex >= 0) {
    const targetItem = indexedAndSortedSecondArray[currentComparisonIndex];
    if (sortedFirstArray[rightPointer] > targetItem.value) {
      outputArrangement[targetItem.originalIndex] =
        sortedFirstArray[rightPointer];
      rightPointer--;
    } else {
      outputArrangement[targetItem.originalIndex] =
        sortedFirstArray[leftPointer];
      leftPointer++;
    }
    currentComparisonIndex--;
  }

  return outputArrangement;
};
