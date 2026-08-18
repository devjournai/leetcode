/**
 * Find If Array Can Be Sorted
 * Intuition: Elements can only swap if they have the same number of set bits. This means elements with different set bit counts cannot pass each other. Consequently, the array is partitioned into contiguous blocks where all elements within a block have the same number of set bits. Each of these blocks must be sortable independently to match the corresponding segment in the globally sorted version of the entire array.
 * Approach: 1. Create a fully sorted copy of the input array to serve as the target. 2. Iterate through the original array to identify contiguous subarrays (blocks) where all elements share the same set bit count. 3. For each identified block, extract its elements and sort them. 4. Compare this sorted block with the corresponding segment in the fully sorted target array. If any comparison fails, return false. 5. If all blocks successfully match their respective segments, return true. A helper function calculates set bits for individual numbers.
 * Dry Run: nums = [3, 1, 2]
 *   1. calculateSetBits(3) = 2, calculateSetBits(1) = 1, calculateSetBits(2) = 1.
 *   2. perfectlySortedOriginal = [1, 2, 3].
 *   3. totalElements = 3, overallProgressPointer = 0.
 *   4. currentBlockBegin = 0.
 *      - firstValueInBlock = nums[0] = 3.
 *      - bitsInFirstValue = calculateSetBits(3) = 2.
 *      - currentBlockEnd = 1.
 *      - Inner while loop (currentBlockEnd=1): calculateSetBits(nums[1]) = calculateSetBits(1) = 1. `1 === 2` is false. Loop terminates. currentBlockEnd remains 1.
 *      - Block is from index 0 to 0.
 *      - blockValues = [].
 *      - elementAssemblerIndex = 0.
 *      - while (0 < 1): blockValues.push(nums[0]) => blockValues = [3]. elementAssemblerIndex = 1. Loop terminates.
 *      - sortedBlockValues = [3].sort(...) => [3].
 *      - blockActualSize = 1.
 *      - blockVerifierIndex = 0.
 *      - while (0 < 1):
 *          - sortedBlockValues[0] (3) !== perfectlySortedOriginal[overallProgressPointer + 0] (perfectlySortedOriginal[0] which is 1).
 *          - `3 !== 1` is true.
 *          - Return `false`.
 *   Result: `false`.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var canSortArray = function (nums) {
  function calculateSetBits(numberToExamine) {
    let setBitsCount = 0;
    let tempNumber = numberToExamine;
    while (tempNumber > 0) {
      setBitsCount += tempNumber & 1;
      tempNumber >>= 1;
    }
    return setBitsCount;
  }

  let perfectlySortedOriginal = [...nums].sort(
    (elementA, elementB) => elementA - elementB,
  );
  let totalElements = nums.length;
  let overallProgressPointer = 0;

  let currentBlockBegin = 0;
  while (currentBlockBegin < totalElements) {
    let firstValueInBlock = nums[currentBlockBegin];
    let bitsInFirstValue = calculateSetBits(firstValueInBlock);

    let currentBlockEnd = currentBlockBegin + 1;
    while (
      currentBlockEnd < totalElements &&
      calculateSetBits(nums[currentBlockEnd]) === bitsInFirstValue
    ) {
      currentBlockEnd++;
    }

    let blockValues = [];
    let elementAssemblerIndex = currentBlockBegin;
    while (elementAssemblerIndex < currentBlockEnd) {
      blockValues.push(nums[elementAssemblerIndex]);
      elementAssemblerIndex++;
    }

    let sortedBlockValues = blockValues.sort(
      (valueX, valueY) => valueX - valueY,
    );
    let blockActualSize = sortedBlockValues.length;

    let blockVerifierIndex = 0;
    while (blockVerifierIndex < blockActualSize) {
      if (
        sortedBlockValues[blockVerifierIndex] !==
        perfectlySortedOriginal[overallProgressPointer + blockVerifierIndex]
      ) {
        return false;
      }
      blockVerifierIndex++;
    }

    overallProgressPointer += blockActualSize;
    currentBlockBegin = currentBlockEnd;
  }

  return true;
};
