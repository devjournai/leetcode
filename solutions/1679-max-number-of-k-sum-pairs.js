/**
 * Max Number Of K Sum Pairs
 * Intuition: After sorting, a two-pointer scan pairs the smallest leftover with the largest: equal to k counts an operation; too small move left; too large move right.
 * Approach: 1. Sort nums. 2. left=0, right=n-1. 3. Sum == k: count++, both pointers inward. Sum < k: left++. Sum > k: right--. 4. Return the count.
 * Dry Run: nums=[1,2,3,4], k=5.
 *   - 1+4=5, 2+3=5 → 2 operations.
 * Time Complexity: O(N log N)
 * Space Complexity: O(log N)
 */
var maxOperations = function (nums, k) {
  const sortedValues = nums.sort((valA, valB) => valA - valB);
  let leftPointer = 0;
  let rightPointer = sortedValues.length - 1;
  let operationCount = 0;

  while (leftPointer < rightPointer) {
    const currentSumCalculation =
      sortedValues[leftPointer] + sortedValues[rightPointer];

    if (currentSumCalculation === k) {
      operationCount++;
      leftPointer++;
      rightPointer--;
    } else if (currentSumCalculation < k) {
      leftPointer++;
    } else {
      rightPointer--;
    }
  }

  return operationCount;
};
