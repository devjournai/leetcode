/**
 * Advantage Shuffle
 * Intuition: Sort nums1. Walk nums2 from largest: if the biggest remaining nums1 beats it, use that (place at original index); else throw the smallest nums1 (cannot win).
 * Approach: 1. Sort a copy of nums1. 2. Pair nums2 with indices, sort by value. 3. Two pointers on nums1; from largest nums2, if right > target assign right--, else assign left++. 4. Return permutation array.
 * Dry Run: nums1=[2,7,11,15], nums2=[1,10,4,11]. Sorted A 2,7,11,15. Beat 11 with 15, 10 with 11, 4 with 7, leftover 2 vs 1 → [2,11,7,15].
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var advantageCount = function (nums1, nums2) {
  const arrayLength = nums1.length;
  const sortedFirstArray = [...nums1].sort(
    (firstVal, secondVal) => firstVal - secondVal
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
