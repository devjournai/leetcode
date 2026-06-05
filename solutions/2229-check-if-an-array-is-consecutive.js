/**
 * Check If An Array Is Consecutive
 * Intuition: A consecutive array, when sorted, must exhibit a strict incremental sequence where each element is exactly one greater than its predecessor, with no duplicate values.
 * Approach: 1. Determine the number of elements in the input array. 2. Create a sorted copy of the original array in ascending order. 3. Iterate through the sorted array from the first element up to the second-to-last element. 4. Inside the loop, check two conditions: a) if the current element is identical to the next element (indicating a duplicate), or b) if the current element incremented by one is not equal to the next element (indicating a gap in the sequence). If either of these conditions is met, the array is not consecutive, so return false. 5. If the loop completes without returning false, it means all elements are unique and form a consecutive sequence, so return true.
 * Dry Run: nums = [3, 1, 2]
 *   arraySize = 3
 *   sortedArrangement = [1, 2, 3] (after sorting the copy of [3, 1, 2])
 *   Loop (using index `currentIdx`):
 *     currentIdx = 0:
 *       sortedArrangement[0] is 1, sortedArrangement[1] is 2.
 *       Condition (1 === 2 || 1 + 1 !== 2) evaluates to (false || false), which is false. Continue.
 *     currentIdx = 1:
 *       sortedArrangement[1] is 2, sortedArrangement[2] is 3.
 *       Condition (2 === 3 || 2 + 1 !== 3) evaluates to (false || false), which is false. Continue.
 *   Loop finishes.
 *   Return true.
 * Dry Run: nums = [1, 3]
 *   arraySize = 2
 *   sortedArrangement = [1, 3]
 *   Loop (using index `currentIdx`):
 *     currentIdx = 0:
 *       sortedArrangement[0] is 1, sortedArrangement[1] is 3.
 *       Condition (1 === 3 || 1 + 1 !== 3) evaluates to (false || true), which is true.
 *       Return false.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var isConsecutive = function (nums) {
  const arraySize = nums.length;
  const sortedArrangement = [...nums].sort((valueA, valueB) => valueA - valueB);

  for (let currentIdx = 0; currentIdx < arraySize - 1; currentIdx++) {
    if (
      sortedArrangement[currentIdx] === sortedArrangement[currentIdx + 1] ||
      sortedArrangement[currentIdx] + 1 !== sortedArrangement[currentIdx + 1]
    ) {
      return false;
    }
  }

  return true;
};
