/**
 * Find The Difference Of Two Arrays
 * Intuition: Using Set data structures allows for highly efficient (average O(1)) lookups to determine if an element exists in another collection, which is crucial for identifying distinct elements between two arrays.
 * Approach: 1. Convert both input arrays, nums1 and nums2, into Set objects (firstSet and secondSet respectively) to automatically handle distinct elements and enable fast lookups. 2. Initialize an empty array, distinctElementsInFirst, to store numbers found in nums1 but not in nums2. Iterate through each number in firstSet. For each number, check if it is present in secondSet. If not, add it to distinctElementsInFirst. 3. Initialize another empty array, distinctElementsInSecond, to store numbers found in nums2 but not in nums1. Iterate through each number in secondSet. For each number, check if it is present in firstSet. If not, add it to distinctElementsInSecond. 4. Return a new array containing distinctElementsInFirst and distinctElementsInSecond as its two elements.
 * Dry Run:
 * Input: nums1 = [1,2,3], nums2 = [2,4,6]
 * 1. firstSet = new Set([1,2,3]) -> {1, 2, 3}
 *    secondSet = new Set([2,4,6]) -> {2, 4, 6}
 * 2. distinctElementsInFirst = []
 *    - Process firstSet:
 *      - currentItem = 1: !secondSet.has(1) is true. distinctElementsInFirst = [1]
 *      - currentItem = 2: !secondSet.has(2) is false.
 *      - currentItem = 3: !secondSet.has(3) is true. distinctElementsInFirst = [1, 3]
 * 3. distinctElementsInSecond = []
 *    - Process secondSet:
 *      - otherItem = 2: !firstSet.has(2) is false.
 *      - otherItem = 4: !firstSet.has(4) is true. distinctElementsInSecond = [4]
 *      - otherItem = 6: !firstSet.has(6) is true. distinctElementsInSecond = [4, 6]
 * 4. Return [[1, 3], [4, 6]]
 * Time Complexity: O(m + n)
 * Space Complexity: O(m + n)
 */
var findDifference = function (nums1, nums2) {
  const firstSet = new Set(nums1);
  const secondSet = new Set(nums2);

  const distinctElementsInFirst = [];
  firstSet.forEach((currentItem) => {
    if (!secondSet.has(currentItem)) {
      distinctElementsInFirst.push(currentItem);
    }
  });

  const distinctElementsInSecond = [];
  for (const otherItem of secondSet) {
    if (!firstSet.has(otherItem)) {
      distinctElementsInSecond.push(otherItem);
    }
  }

  return [distinctElementsInFirst, distinctElementsInSecond];
};
