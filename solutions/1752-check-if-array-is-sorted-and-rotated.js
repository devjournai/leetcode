/**
 * Check if Array Is Sorted and Rotated
 * Intuition: A non-decreasingly sorted array, when rotated, will exhibit at most one "break point" where an element is strictly greater than its successor. If there are no such break points, the array is already sorted. If there is one, it represents the point of rotation. More than one such break point implies the array is not sorted and rotated. We must also consider the wrap-around comparison between the last and first elements.
 * Approach: 1. Initialize a counter named `descentOccurrences` to zero. This counter will track the number of times `nums[i] > nums[i+1]`. 2. Determine the length of the input array and store it in `inputLength`. 3. Iterate through the array using a `for` loop from the first element up to the second-to-last element. In each iteration, if the current element `nums[currentIndex]` is greater than its subsequent element `nums[currentIndex + 1]`, increment `descentOccurrences`. 4. After the loop completes, perform a final check for the wrap-around condition: if the last element `nums[inputLength - 1]` is greater than the first element `nums[0]`, increment `descentOccurrences`. 5. Finally, return `true` if `descentOccurrences` is less than or equal to 1, indicating that the array is either sorted or sorted and rotated. Otherwise, return `false`.
 * Dry Run: nums = [3,4,5,1,2]
 *   1. `descentOccurrences = 0`. `inputLength = 5`.
 *   2. Loop `currentIndex` from `0` to `3` (i.e., `inputLength - 2`):
 *      - `currentIndex = 0`: `nums[0]=3`, `nums[1]=4`. `3 > 4` is false. `descentOccurrences` remains `0`.
 *      - `currentIndex = 1`: `nums[1]=4`, `nums[2]=5`. `4 > 5` is false. `descentOccurrences` remains `0`.
 *      - `currentIndex = 2`: `nums[2]=5`, `nums[3]=1`. `5 > 1` is true. `descentOccurrences` becomes `1`.
 *      - `currentIndex = 3`: `nums[3]=1`, `nums[4]=2`. `1 > 2` is false. `descentOccurrences` remains `1`.
 *   3. Loop finishes. Current `descentOccurrences = 1`.
 *   4. Wrap-around check: `nums[inputLength - 1]` (`nums[4]`) is `2`. `nums[0]` is `3`. `2 > 3` is false. `descentOccurrences` remains `1`.
 *   5. Return `descentOccurrences <= 1` (which is `1 <= 1`), resulting in `true`.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var check = function (nums) {
  let descentOccurrences = 0;
  const inputLength = nums.length;

  for (let currentIndex = 0; currentIndex < inputLength - 1; currentIndex++) {
    if (nums[currentIndex] > nums[currentIndex + 1]) {
      descentOccurrences++;
    }
  }

  if (nums[inputLength - 1] > nums[0]) {
    descentOccurrences++;
  }

  return descentOccurrences <= 1;
};
