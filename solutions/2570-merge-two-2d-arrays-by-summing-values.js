/**
 * Merge Two 2d Arrays By Summing Values
 * Intuition: Given that both input arrays are already sorted by ID, a two-pointer approach provides an efficient way to merge them while maintaining the sorted order and summing values for common IDs. This avoids the overhead of a hash map followed by a sort, leading to a better time complexity.
 * Approach: 1. Initialize two pointers, one for each input array, and an empty list to store the merged result. 2. Iterate through both arrays simultaneously using the pointers. In each step, compare the IDs at the current pointer positions. 3. If the ID from the first array is smaller, add its entry to the result and advance the first pointer. 4. If the ID from the second array is smaller, add its entry to the result and advance the second pointer. 5. If the IDs are equal, sum their values, add the combined entry to the result, and advance both pointers. 6. After the main loop, one of the arrays might have remaining elements. Iterate through any remaining elements in the first array and add them to the result. 7. Similarly, iterate through any remaining elements in the second array and add them to the result. 8. Return the accumulated result list.
 * Dry Run:
 *   nums1 = [[1, 2], [2, 3], [4, 5]]
 *   nums2 = [[1, 5], [3, 1], [4, 2], [5, 10]]
 *
 *   1. Initialize: `resultList = []`, `lengthOne = 3`, `lengthTwo = 4`, `pointerA = 0`, `pointerB = 0`.
 *
 *   2. Main loop (`while (pointerA < lengthOne && pointerB < lengthTwo)`):
 *      - Iteration 1:
 *        `currentEntryA = nums1[0] = [1, 2]`, `currentEntryB = nums2[0] = [1, 5]`
 *        `idA = 1`, `idB = 1`. `idA === idB`.
 *        `resultList.push([1, 2 + 5])` -> `[[1, 7]]`
 *        `pointerA = 1`, `pointerB = 1`
 *      - Iteration 2:
 *        `currentEntryA = nums1[1] = [2, 3]`, `currentEntryB = nums2[1] = [3, 1]`
 *        `idA = 2`, `idB = 3`. `idA < idB`.
 *        `resultList.push([2, 3])` -> `[[1, 7], [2, 3]]`
 *        `pointerA = 2`
 *      - Iteration 3:
 *        `currentEntryA = nums1[2] = [4, 5]`, `currentEntryB = nums2[1] = [3, 1]`
 *        `idA = 4`, `idB = 3`. `idA > idB`.
 *        `resultList.push([3, 1])` -> `[[1, 7], [2, 3], [3, 1]]`
 *        `pointerB = 2`
 *      - Iteration 4:
 *        `currentEntryA = nums1[2] = [4, 5]`, `currentEntryB = nums2[2] = [4, 2]`
 *        `idA = 4`, `idB = 4`. `idA === idB`.
 *        `resultList.push([4, 5 + 2])` -> `[[1, 7], [2, 3], [3, 1], [4, 7]]`
 *        `pointerA = 3`, `pointerB = 3`
 *      - Loop ends because `pointerA` (3) is not less than `lengthOne` (3).
 *
 *   3. Remaining elements in `nums1` (`while (pointerA < lengthOne)`):
 *      - `pointerA` (3) is not less than `lengthOne` (3). Loop skipped.
 *
 *   4. Remaining elements in `nums2` (`while (pointerB < lengthTwo)`):
 *      - Iteration 1:
 *        `pointerB = 3`, `lengthTwo = 4`. `3 < 4`.
 *        `remainingEntry = nums2[3] = [5, 10]`
 *        `resultList.push([5, 10])` -> `[[1, 7], [2, 3], [3, 1], [4, 7], [5, 10]]`
 *        `pointerB = 4`
 *      - Loop ends because `pointerB` (4) is not less than `lengthTwo` (4).
 *
 *   5. Return `resultList`: `[[1, 7], [2, 3], [3, 1], [4, 7], [5, 10]]`.
 * Time Complexity: O(N + M)
 * Space Complexity: O(N + M)
 */
var mergeArrays = function (nums1, nums2) {
  const lengthOne = nums1.length;
  const lengthTwo = nums2.length;
  let pointerA = 0;
  let pointerB = 0;
  const resultList = [];

  while (pointerA < lengthOne && pointerB < lengthTwo) {
    const entryOne = nums1[pointerA];
    const entryTwo = nums2[pointerB];
    const idOne = entryOne[0];
    const valueOne = entryOne[1];
    const idTwo = entryTwo[0];
    const valueTwo = entryTwo[1];

    if (idOne < idTwo) {
      resultList.push([idOne, valueOne]);
      pointerA++;
    } else if (idTwo < idOne) {
      resultList.push([idTwo, valueTwo]);
      pointerB++;
    } else {
      resultList.push([idOne, valueOne + valueTwo]);
      pointerA++;
      pointerB++;
    }
  }

  while (pointerA < lengthOne) {
    const remainingElementA = nums1[pointerA];
    resultList.push(remainingElementA);
    pointerA++;
  }

  while (pointerB < lengthTwo) {
    const remainingElementB = nums2[pointerB];
    resultList.push(remainingElementB);
    pointerB++;
  }

  return resultList;
};
