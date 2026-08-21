/**
 * Maximum Length Of Semi Decreasing Subarrays
 * Intuition: For each potential starting element `nums[i]`, we want to find the largest possible index `j > i` such that `nums[j] < nums[i]`. This can be efficiently found by pre-processing the array from right to left using a monotonic stack to identify relevant suffix minimums. Then, a second pass from left to right can use these suffix minimums to determine the maximum length.
 * Approach: 1. Build a monotonic stack of indices from right to left. An index `k` is pushed onto the stack only if `nums[k]` is strictly smaller than the value at the current stack top. This ensures the stack holds indices `j_1, j_2, ..., j_m` such that `j_1 > j_2 > ... > j_m` and `nums[j_1] > nums[j_2] > ... > nums[j_m]`. These are potential right endpoints for semi-decreasing subarrays. 2. Initialize `currentMaxSubarrayLength` to 0 and `largestLeftElement` to negative infinity. 3. Iterate `leftPointer` from the beginning of the array. For each `leftPointer`, remove any indices from the stack that are less than or equal to `leftPointer` (as they are no longer valid right endpoints). 4. If `nums[leftPointer]` is greater than `largestLeftElement`, update `largestLeftElement` to `nums[leftPointer]` and then iterate through the remaining elements in the stack. For each `rightCandidateIndex` in the stack where `nums[rightCandidateIndex]` is strictly less than `largestLeftElement`, update `currentMaxSubarrayLength` with `rightCandidateIndex - leftPointer + 1` and remove `rightCandidateIndex` from the stack. 5. Return `currentMaxSubarrayLength`.
 * Dry Run: nums = [3, 1, 5, 2, 4]
 * Initial: currentMaxSubarrayLength = 0, indicesForSuffixMinimums = [], largestLeftElement = -Infinity
 * Phase 1: Build indicesForSuffixMinimums (right to left)
 * - arrayIterator = 4 (nums[4]=4): indicesForSuffixMinimums is empty. Push 4. indicesForSuffixMinimums = [4]
 * - arrayIterator = 3 (nums[3]=2): nums[3]=2 < nums[indicesForSuffixMinimums.top()]=nums[4]=4. Push 3. indicesForSuffixMinimums = [4, 3]
 * - arrayIterator = 2 (nums[2]=5): nums[2]=5 is not < nums[indicesForSuffixMinimums.top()]=nums[3]=2. Skip. indicesForSuffixMinimums = [4, 3]
 * - arrayIterator = 1 (nums[1]=1): nums[1]=1 < nums[indicesForSuffixMinimums.top()]=nums[3]=2. Push 1. indicesForSuffixMinimums = [4, 3, 1]
 * - arrayIterator = 0 (nums[0]=3): nums[0]=3 is not < nums[indicesForSuffixMinimums.top()]=nums[1]=1. Skip. indicesForSuffixMinimums = [4, 3, 1]
 *
 * Phase 2: Find maximum length (left to right)
 * - leftPointer = 0 (nums[0]=3): indicesForSuffixMinimums = [4, 3, 1]
 *   - Stack top (1) is not <= 0.
 *   - nums[0]=3 > largestLeftElement (-Infinity). Update largestLeftElement = 3.
 *   - Inner while:
 *     - Stack top (1), nums[1]=1 < largestLeftElement (3). Update currentMaxSubarrayLength = max(0, 1-0+1=2) = 2. Pop 1. indicesForSuffixMinimums = [4, 3]
 *     - Stack top (3), nums[3]=2 < largestLeftElement (3). Update currentMaxSubarrayLength = max(2, 3-0+1=4) = 4. Pop 3. indicesForSuffixMinimums = [4]
 *     - Stack top (4), nums[4]=4 is not < largestLeftElement (3). Break inner while.
 * - leftPointer = 1 (nums[1]=1): indicesForSuffixMinimums = [4]
 *   - Stack top (4) is not <= 1.
 *   - nums[1]=1 is not > largestLeftElement (3). Skip inner if block.
 * - leftPointer = 2 (nums[2]=5): indicesForSuffixMinimums = [4]
 *   - Stack top (4) is not <= 2.
 *   - nums[2]=5 > largestLeftElement (3). Update largestLeftElement = 5.
 *   - Inner while:
 *     - Stack top (4), nums[4]=4 < largestLeftElement (5). Update currentMaxSubarrayLength = max(4, 4-2+1=3) = 4. Pop 4. indicesForSuffixMinimums = []
 *     - Stack is empty. Break inner while.
 * - leftPointer = 3: indicesForSuffixMinimums is empty. Loop terminates.
 * Result: currentMaxSubarrayLength = 4.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maxSubarrayLength = function (nums) {
  const totalElements = nums.length;
  const indicesForSuffixMinimums = [];

  for (let arrayIndex = totalElements - 1; arrayIndex >= 0; arrayIndex--) {
    if (
      indicesForSuffixMinimums.length === 0 ||
      nums[arrayIndex] <
        nums[indicesForSuffixMinimums[indicesForSuffixMinimums.length - 1]]
    ) {
      indicesForSuffixMinimums.push(arrayIndex);
    }
  }

  let currentMaxSubarrayLength = 0;
  let largestLeftElement = -Infinity;

  for (
    let leftPointer = 0;
    leftPointer < totalElements && indicesForSuffixMinimums.length > 0;
    leftPointer++
  ) {
    while (
      indicesForSuffixMinimums.length > 0 &&
      indicesForSuffixMinimums[indicesForSuffixMinimums.length - 1] <=
        leftPointer
    ) {
      indicesForSuffixMinimums.pop();
    }

    if (nums[leftPointer] > largestLeftElement) {
      largestLeftElement = nums[leftPointer];
      while (
        indicesForSuffixMinimums.length > 0 &&
        nums[indicesForSuffixMinimums[indicesForSuffixMinimums.length - 1]] <
          largestLeftElement
      ) {
        const rightCandidateIndex =
          indicesForSuffixMinimums[indicesForSuffixMinimums.length - 1];
        const calculatedLength = rightCandidateIndex - leftPointer + 1;
        currentMaxSubarrayLength = Math.max(
          currentMaxSubarrayLength,
          calculatedLength
        );
        indicesForSuffixMinimums.pop();
      }
    }
  }

  return currentMaxSubarrayLength;
};
