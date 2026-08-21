/**
 * Maximum Subarray Min Product
 * Intuition: For each index as the exclusive minimum of some range, min × range-sum is a candidate. A monotonic stack finds the next-smaller boundary; prefix sums give the range total.
 * Approach: 1. Build `prefixTotals`. 2. Scan with `monotonicStackStorage` of {storedIndex, storedValue}; pop when current is smaller (sentinel 0 at the end). 3. For each pop, range is (leftBoundIndex, currentTraversalPosition). 4. Return max product mod 1e9+7.
 * Dry Run: nums=[1,2,3,2].
 *   - Subarray [2,3,2] min=2 sum=7 product=14 is best among candidates. Return 14.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maxSumMinProduct = function (nums) {
  const moduloDivisor = 1000000007n;
  const monotonicStackStorage = [];
  const prefixTotals = [0n];
  let maximumPossibleMinProduct = 0n;

  let indexForPrefixSum = 0;
  while (indexForPrefixSum < nums.length) {
    prefixTotals.push(
      prefixTotals[indexForPrefixSum] + BigInt(nums[indexForPrefixSum])
    );
    indexForPrefixSum++;
  }

  let currentTraversalPosition = 0;
  while (currentTraversalPosition <= nums.length) {
    const currentElementValueBigInt =
      currentTraversalPosition < nums.length
        ? BigInt(nums[currentTraversalPosition])
        : 0n;

    let canPopFromStack = monotonicStackStorage.length > 0;
    let topOfStackValueExceedsCurrent =
      canPopFromStack &&
      monotonicStackStorage[monotonicStackStorage.length - 1].storedValue >
        currentElementValueBigInt;

    while (canPopFromStack && topOfStackValueExceedsCurrent) {
      const poppedEntry = monotonicStackStorage.pop();
      const poppedElementIndex = poppedEntry.storedIndex;
      const poppedElementValue = poppedEntry.storedValue;

      const leftBoundIndex =
        monotonicStackStorage.length > 0
          ? monotonicStackStorage[monotonicStackStorage.length - 1]
              .storedIndex + 1
          : 0;
      const calculatedSubarrayTotal =
        prefixTotals[currentTraversalPosition] - prefixTotals[leftBoundIndex];
      maximumPossibleMinProduct =
        maximumPossibleMinProduct > poppedElementValue * calculatedSubarrayTotal
          ? maximumPossibleMinProduct
          : poppedElementValue * calculatedSubarrayTotal;

      canPopFromStack = monotonicStackStorage.length > 0;
      topOfStackValueExceedsCurrent =
        canPopFromStack &&
        monotonicStackStorage[monotonicStackStorage.length - 1].storedValue >
          currentElementValueBigInt;
    }

    monotonicStackStorage.push({
      storedIndex: currentTraversalPosition,
      storedValue: currentElementValueBigInt,
    });
    currentTraversalPosition++;
  }

  return Number(maximumPossibleMinProduct % moduloDivisor);
};
