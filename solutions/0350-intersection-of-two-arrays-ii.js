/**
 * Intersection Of Two Arrays II
 * Intuition: After sorting both arrays, a two-pointer scan emits each matching value once per shared occurrence and otherwise advances the smaller side.
 * Approach: 1. Sort nums1 and nums2 ascending (in place). 2. Walk both with advancePointerOne/Two. 3. Equal values → push and advance both; else advance the pointer at the smaller value. 4. Return commonElements.
 * Dry Run: nums1 = [1, 2, 2, 1], nums2 = [2, 2].
 *   - Sorted [1, 1, 2, 2] and [2, 2]. Skip 1s, then match 2 twice → [2, 2].
 * Time Complexity: O(M log M + N log N)
 * Space Complexity: O(min(M, N))
 */
var intersect = function (nums1, nums2) {
  const sortedArrayOne = nums1.sort(
    (firstElement, secondElement) => firstElement - secondElement
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
