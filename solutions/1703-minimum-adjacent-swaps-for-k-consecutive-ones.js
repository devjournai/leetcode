/**
 * Minimum Adjacent Swaps For K Consecutive Ones
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
      prefixSumsOfIndices[currentOnePosition] + oneIndices[currentOnePosition],
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
      currentWindowCalculatedSwaps,
    );
  }

  const consecutiveAdjustment = halfWindowSizeFloor * halfWindowSizeCeil;
  return minimumTotalSwaps - consecutiveAdjustment;
};
