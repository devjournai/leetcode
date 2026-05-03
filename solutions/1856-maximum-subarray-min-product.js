/**
 * Maximum Subarray Min Product
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
      prefixTotals[indexForPrefixSum] + BigInt(nums[indexForPrefixSum]),
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
