/**
 * Number Of Equal Numbers Blocks
 * Intuition: The problem states that all occurrences of a value are adjacent, forming blocks. To count these maximal blocks efficiently in a potentially very large array, we can iterate through the array and for each block, use binary search to find the index where the value changes, which marks the beginning of the next block.
 * Approach: 1. Initialize a counter for blocks and a pointer for the current position in the array. 2. Iterate while the current pointer is within the array bounds. 3. In each iteration, increment the block counter. 4. Record the value at the current pointer, as this is the value for the current block. 5. Perform a binary search starting from the next index after the current pointer up to the end of the array. The goal of this binary search is to find the first index that contains a value different from the current block's value. 6. Update the current pointer to this found index (which is the start of the next block or past the end of the array). 7. Repeat until the current pointer reaches or exceeds the array's total length.
 * Dry Run:
 * Input: nums = [1, 1, 2, 2, 2, 3]
 * arrayLengthValue = 6
 * blockCounter = 0
 * currentArrayIndex = 0
 *
 * Iteration 1: (currentArrayIndex = 0 < 6)
 *   blockCounter = 1
 *   currentBlockValue = nums.at(0) = 1
 *   Binary Search (searching for first value != 1 in range [1, 5]):
 *     searchRangeStart = 1, searchRangeEnd = 5, boundaryIndex = 6
 *     - midPoint = 3 (nums.at(3)=2 != 1) -> boundaryIndex=3, searchRangeEnd=2
 *     - midPoint = 1 (nums.at(1)=1 == 1) -> searchRangeStart=2
 *     - midPoint = 2 (nums.at(2)=2 != 1) -> boundaryIndex=2, searchRangeEnd=1
 *     Loop ends.
 *   currentArrayIndex = boundaryIndex = 2
 *
 * Iteration 2: (currentArrayIndex = 2 < 6)
 *   blockCounter = 2
 *   currentBlockValue = nums.at(2) = 2
 *   Binary Search (searching for first value != 2 in range [3, 5]):
 *     searchRangeStart = 3, searchRangeEnd = 5, boundaryIndex = 6
 *     - midPoint = 4 (nums.at(4)=2 == 2) -> searchRangeStart=5
 *     - midPoint = 5 (nums.at(5)=3 != 2) -> boundaryIndex=5, searchRangeEnd=4
 *     Loop ends.
 *   currentArrayIndex = boundaryIndex = 5
 *
 * Iteration 3: (currentArrayIndex = 5 < 6)
 *   blockCounter = 3
 *   currentBlockValue = nums.at(5) = 3
 *   Binary Search (searching for first value != 3 in range [6, 5]):
 *     searchRangeStart = 6, searchRangeEnd = 5, boundaryIndex = 6
 *     Loop condition (6 <= 5) is false. Loop does not run.
 *   currentArrayIndex = boundaryIndex = 6
 *
 * Iteration 4: (currentArrayIndex = 6 < 6) is false.
 * Main loop ends.
 * Return blockCounter = 3.
 *
 * Time Complexity: O(K * log N)
 * Space Complexity: O(1)
 */
var countBlocks = function (nums) {
  const arrayLengthValue = nums.size();
  if (arrayLengthValue === 0) {
    return 0;
  }

  let blockCounter = 0;
  let currentArrayIndex = 0;

  while (currentArrayIndex < arrayLengthValue) {
    blockCounter = blockCounter + 1;
    const currentBlockValue = nums.at(currentArrayIndex);

    let searchRangeStart = currentArrayIndex + 1;
    let searchRangeEnd = arrayLengthValue - 1;
    let boundaryIndex = arrayLengthValue;

    while (searchRangeStart <= searchRangeEnd) {
      const midPoint = Math.floor((searchRangeStart + searchRangeEnd) / 2);
      if (nums.at(midPoint) === currentBlockValue) {
        searchRangeStart = midPoint + 1;
      } else {
        boundaryIndex = midPoint;
        searchRangeEnd = midPoint - 1;
      }
    }
    currentArrayIndex = boundaryIndex;
  }
  return blockCounter;
};
