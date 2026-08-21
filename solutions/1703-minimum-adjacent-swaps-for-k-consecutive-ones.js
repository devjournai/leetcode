/**
 * Minimum Adjacent Swaps For K Consecutive Ones
 * Intuition: Gather any k ones onto k consecutive positions; median of their current indices is optimal. Prefix sums of one-positions give the cost to meet at the median; subtract the cost of already-consecutive ones (`floor(k/2)*ceil(k/2)`).
 * Approach: 1. Collect `oneIndices` and `prefixSumsOfIndices`. 2. For each window of k ones, compute swaps to the median via left/right position sums. 3. Track `minimumTotalSwaps`, then subtract `consecutiveAdjustment`.
 * Dry Run: nums = [1,0,0,1,0,1], k = 2
 * ones at 0,3,5. Windows: (0,3) median 0 cost 3; (3,5) cost 2. consecutiveAdjustment=0. Min=2 (swap the last two ones together).
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minMoves = function (nums, k) {
  const oneIndices = [];
  for (
    let currentNumberIndex = 0;
    currentNumberIndex < nums.length;
    currentNumberIndex++
  ) {
    if (nums[currentNumberIndex] === 1) {
      oneIndices.push(currentNumberIndex);
    }
  }

  const prefixSumsOfIndices = [0];
  for (
    let currentOnePosition = 0;
    currentOnePosition < oneIndices.length;
    currentOnePosition++
  ) {
    prefixSumsOfIndices.push(
      prefixSumsOfIndices[currentOnePosition] + oneIndices[currentOnePosition]
    );
  }

  let minimumTotalSwaps = Infinity;
  const halfWindowSizeFloor = Math.floor(k / 2);
  const halfWindowSizeCeil = Math.ceil(k / 2);

  for (
    let startOneWindow = 0;
    startOneWindow <= oneIndices.length - k;
    startOneWindow++
  ) {
    const endOneWindow = startOneWindow + k - 1;
    const medianElementIndex = startOneWindow + halfWindowSizeFloor;
    const medianElementActualPosition = oneIndices[medianElementIndex];

    const leftSideCount = medianElementIndex - startOneWindow;
    const rightSideCount = endOneWindow - medianElementIndex;

    const sumOfPositionsLeft =
      prefixSumsOfIndices[medianElementIndex] -
      prefixSumsOfIndices[startOneWindow];
    const sumOfPositionsRight =
      prefixSumsOfIndices[endOneWindow + 1] -
      prefixSumsOfIndices[medianElementIndex + 1];

    const swapsToAlignLeft =
      medianElementActualPosition * leftSideCount - sumOfPositionsLeft;
    const swapsToAlignRight =
      sumOfPositionsRight - medianElementActualPosition * rightSideCount;

    const currentWindowCalculatedSwaps = swapsToAlignLeft + swapsToAlignRight;
    minimumTotalSwaps = Math.min(
      minimumTotalSwaps,
      currentWindowCalculatedSwaps
    );
  }

  const consecutiveAdjustment = halfWindowSizeFloor * halfWindowSizeCeil;
  return minimumTotalSwaps - consecutiveAdjustment;
};
