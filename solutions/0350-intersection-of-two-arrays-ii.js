/**
 * Intersection Of Two Arrays II
 * Time Complexity: O(M log M + N log N)
 * Space Complexity: O(min(M, N))
 */
var intersect = function (nums1, nums2) {
  const sortedArrayOne = nums1.sort(
    (firstElement, secondElement) => firstElement - secondElement,
  );
  const sortedArrayTwo = nums2.sort((itemA, itemB) => itemA - itemB);

  let advancePointerOne = 0;
  let advancePointerTwo = 0;
  const commonElements = [];

  while (
    advancePointerOne < sortedArrayOne.length &&
    advancePointerTwo < sortedArrayTwo.length
  ) {
    let valueFromOne = sortedArrayOne[advancePointerOne];
    let valueFromTwo = sortedArrayTwo[advancePointerTwo];

    if (valueFromOne === valueFromTwo) {
      commonElements.push(valueFromOne);
      advancePointerOne++;
      advancePointerTwo++;
    } else if (valueFromOne < valueFromTwo) {
      advancePointerOne++;
    } else {
      advancePointerTwo++;
    }
  }

  return commonElements;
};
