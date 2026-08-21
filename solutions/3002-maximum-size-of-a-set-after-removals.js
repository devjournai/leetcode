/**
 * Maximum Size Of A Set After Removals
 * Intuition: To maximize the final set size, we should prioritize keeping unique elements from each array first. After determining how many distinct elements unique to nums1 and nums2 we can keep (up to n/2 from each), we then use the remaining 'keep' slots from both arrays to include as many distinct common elements as possible. The total elements kept from each original array must be exactly n/2.
 * Approach:
 * 1. Initialize `arrayLength` as the length of `nums1`. This also represents `n`.
 * 2. Create `firstDistinctElements` set from `nums1` to efficiently get unique elements and check for presence.
 * 3. Create `secondDistinctElements` set from `nums2` for the same purpose.
 * 4. Store the initial number of unique elements in `firstUniqueCount` and `secondUniqueCount`.
 * 5. Initialize `intersectionElementsCount` to zero. Iterate through each `itemEntry` in `firstDistinctElements`. If `itemEntry` is also present in `secondDistinctElements`, increment `intersectionElementsCount`.
 * 6. Adjust `firstUniqueCount` by subtracting `intersectionElementsCount` to represent elements *only* present in `nums1`.
 * 7. Adjust `secondUniqueCount` by subtracting `intersectionElementsCount` to represent elements *only* present in `nums2`.
 * 8. Determine `keptFromFirstOnly`, which is the maximum number of elements unique to `nums1` that can be kept, limited by `firstUniqueCount` itself and the `arrayLength / 2` quota for `nums1`.
 * 9. Determine `keptFromSecondOnly`, similarly for elements unique to `nums2`.
 * 10. Calculate `neededCommonElementsCapacity`: this is the sum of slots remaining in `nums1` and `nums2` that *must* be filled by common elements to reach their respective `arrayLength / 2` quotas. It's `(arrayLength / 2 - keptFromFirstOnly) + (arrayLength / 2 - keptFromSecondOnly)`.
 * 11. Calculate `keptFromIntersection`: this is the maximum number of *distinct* common elements we can add to the final set. It's limited by `intersectionElementsCount` (the total number of available common elements) and `neededCommonElementsCapacity` (the total capacity to absorb common elements from both arrays).
 * 12. The final maximum set size is the sum of `keptFromFirstOnly`, `keptFromSecondOnly`, and `keptFromIntersection`.
 * Dry Run:
 *   nums1 = [1, 2, 3, 4], nums2 = [3, 4, 5, 6]
 *   arrayLength = 4
 *   firstDistinctElements = {1, 2, 3, 4}
 *   secondDistinctElements = {3, 4, 5, 6}
 *   initialFirstUniqueCount = 4
 *   initialSecondUniqueCount = 4
 *   intersectionElementsCount = 0
 *   for (itemEntry of firstDistinctElements):
 *     itemEntry = 1: secondDistinctElements.has(1) is false
 *     itemEntry = 2: secondDistinctElements.has(2) is false
 *     itemEntry = 3: secondDistinctElements.has(3) is true -> intersectionElementsCount = 1
 *     itemEntry = 4: secondDistinctElements.has(4) is true -> intersectionElementsCount = 2
 *   firstUniqueCount = initialFirstUniqueCount - intersectionElementsCount = 4 - 2 = 2
 *   secondUniqueCount = initialSecondUniqueCount - intersectionElementsCount = 4 - 2 = 2
 *   keptFromFirstOnly = Math.min(2, 4 / 2) = Math.min(2, 2) = 2
 *   keptFromSecondOnly = Math.min(2, 4 / 2) = Math.min(2, 2) = 2
 *   neededCommonElementsCapacity = (4 / 2 - keptFromFirstOnly) + (4 / 2 - keptFromSecondOnly)
 *     = (2 - 2) + (2 - 2) = 0 + 0 = 0
 *   keptFromIntersection = Math.min(intersectionElementsCount, neededCommonElementsCapacity)
 *     = Math.min(2, 0) = 0
 *   Result = keptFromFirstOnly + keptFromSecondOnly + keptFromIntersection = 2 + 2 + 0 = 4
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maximumSetSize = function (nums1, nums2) {
  const arrayLength = nums1.length;
  const firstDistinctElements = new Set(nums1);
  const secondDistinctElements = new Set(nums2);

  let initialFirstUniqueCount = firstDistinctElements.size;
  let initialSecondUniqueCount = secondDistinctElements.size;
  let intersectionElementsCount = 0;

  for (const itemEntry of firstDistinctElements) {
    if (secondDistinctElements.has(itemEntry)) {
      intersectionElementsCount++;
    }
  }

  let firstOnlyCount = initialFirstUniqueCount - intersectionElementsCount;
  let secondOnlyCount = initialSecondUniqueCount - intersectionElementsCount;

  const keptFromFirstOnly = Math.min(firstOnlyCount, arrayLength / 2);
  const keptFromSecondOnly = Math.min(secondOnlyCount, arrayLength / 2);

  const neededCommonElementsCapacity =
    arrayLength / 2 -
    keptFromFirstOnly +
    (arrayLength / 2 - keptFromSecondOnly);
  const keptFromIntersection = Math.min(
    intersectionElementsCount,
    neededCommonElementsCapacity
  );

  return keptFromFirstOnly + keptFromSecondOnly + keptFromIntersection;
};
