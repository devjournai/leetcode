/**
 * Sort Array By Moving Items To Empty Space
 * Intuition: The problem requires sorting an array by moving items to an empty space (represented by 0). This is equivalent to swapping an item with 0. There are two valid sorted states: [0, 1, ..., N-1] or [1, ..., N-1, 0]. The task is to find the minimum operations to reach either state. We can model this by tracking the current index of each value. The optimal strategy involves a greedy approach: if the empty space is not in its final target position, move an item into it that helps bring the empty space closer to its final position. If the empty space *is* in its final position, use it to directly fix the first out-of-place item.
 * Approach: 1. Create a `valuePositionsMapping` array to store the current index of each value (where `valuePositionsMapping[value] = index`). 2. Define two distinct functions, `calculateMovesForZeroAtBeginning` and `calculateMovesForZeroAtEnd`, each implementing the sorting logic for one of the two target configurations. 3. Each function takes a copy of the `valuePositionsMapping` and simulates the sorting process. It maintains an `operationsCount` and `nextItemToCheck` (starting from 1). 4. In a loop, it checks if the empty space (value 0) is at its target final index (0 for beginning, N-1 for end). 5. If 0 is at its final index, it efficiently increments `nextItemToCheck` for all items that are already in their correct places. If an out-of-place `nextItemToCheck` is found, that item is chosen to be swapped with 0. 6. If 0 is NOT at its final index, it chooses an item to swap with 0. This chosen item is determined by the `currentEmptyIndex` and the target configuration's `offset` (0 or 1), specifically `currentEmptyIndex + offset`. This item is chosen because moving it into the empty slot effectively moves the empty slot closer to its final position or helps correctly place another item relative to the empty slot's position. 7. The chosen item's and 0's indices are swapped in the `currentPositions` array, and `operationsCount` is incremented. 8. The loop continues until all items from 1 to N-1 are in their correct sorted positions. 9. The overall minimum operations is the minimum of the results from the two functions.
 * Dry Run:
 *   Input: nums = [2,1,0]
 *   N = 3
 *   valuePositionsMapping = [2, 1, 0] (Value 0 is at index 2, Value 1 at 1, Value 2 at 0)
 *
 *   1. calculateMovesForZeroAtBeginning(valuePositionsMapping) (Target: [0,1,2])
 *      - currentPositionsForBegin = [2,1,0], operationsCountForBegin = 0, nextItemToCheckBegin = 1, emptySpaceFinalIndexBegin = 0
 *      - Loop 1 (nextItemToCheckBegin=1):
 *        - currentEmptyIndexBegin = 2. Not equal to emptySpaceFinalIndexBegin (0).
 *        - itemToMoveToEmptyBegin = currentEmptyIndexBegin + 0 = 2.
 *        - Swap indices of 0 (at 2) and 2 (at 0): currentPositionsForBegin becomes [0,1,2].
 *        - operationsCountForBegin = 1.
 *      - Loop 2 (nextItemToCheckBegin=1):
 *        - currentEmptyIndexBegin = 0. Equal to emptySpaceFinalIndexBegin (0).
 *        - Inner while loop:
 *          - innerLoopCheckItemBegin=1. currentPositionsForBegin[1]=1. 1-0=1. Match. innerLoopCheckItemBegin becomes 2.
 *          - innerLoopCheckItemBegin=2. currentPositionsForBegin[2]=2. 2-0=2. Match. innerLoopCheckItemBegin becomes 3.
 *        - innerLoopCheckItemBegin (3) equals N (3). Returns operationsCountForBegin (1).
 *      - resultOne = 1
 *
 *   2. calculateMovesForZeroAtEnd(valuePositionsMapping) (Target: [1,2,0])
 *      - currentPositionsForEnd = [2,1,0], operationsCountForEnd = 0, nextItemToCheckEnd = 1, emptySpaceFinalIndexEnd = 2
 *      - Loop 1 (nextItemToCheckEnd=1):
 *        - currentEmptyIndexEnd = 2. Equal to emptySpaceFinalIndexEnd (2).
 *        - Inner while loop:
 *          - innerLoopCheckItemEnd=1. currentPositionsForEnd[1]=1. 1-1=0. Not match (1 != 0). Inner loop exits.
 *        - innerLoopCheckItemEnd (1) not equal to N (3).
 *        - itemToMoveToEmptyEnd = innerLoopCheckItemEnd = 1.
 *        - Swap indices of 0 (at 2) and 1 (at 1): currentPositionsForEnd becomes [1,2,0].
 *        - operationsCountForEnd = 1.
 *      - Loop 2 (nextItemToCheckEnd=1):
 *        - currentEmptyIndexEnd = 1. Not equal to emptySpaceFinalIndexEnd (2).
 *        - itemToMoveToEmptyEnd = currentEmptyIndexEnd + 1 = 2.
 *        - Swap indices of 0 (at 1) and 2 (at 0): currentPositionsForEnd becomes [0,2,1].
 *        - operationsCountForEnd = 2.
 *      - Loop 3 (nextItemToCheckEnd=1):
 *        - currentEmptyIndexEnd = 0. Not equal to emptySpaceFinalIndexEnd (2).
 *        - itemToMoveToEmptyEnd = currentEmptyIndexEnd + 1 = 1.
 *        - Swap indices of 0 (at 0) and 1 (at 2): currentPositionsForEnd becomes [2,0,1].
 *        - operationsCountForEnd = 3.
 *      - Loop 4 (nextItemToCheckEnd=1):
 *        - currentEmptyIndexEnd = 2. Equal to emptySpaceFinalIndexEnd (2).
 *        - Inner while loop:
 *          - innerLoopCheckItemEnd=1. currentPositionsForEnd[1]=0. 1-1=0. Match. innerLoopCheckItemEnd becomes 2.
 *          - innerLoopCheckItemEnd=2. currentPositionsForEnd[2]=1. 2-1=1. Match. innerLoopCheckItemEnd becomes 3.
 *        - innerLoopCheckItemEnd (3) equals N (3). Returns operationsCountForEnd (3).
 *      - resultTwo = 3
 *
 *   3. Result: Math.min(resultOne, resultTwo) = Math.min(1, 3) = 1.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var sortArray = function (nums) {
  const numsArrayLength = nums.length;
  const valuePositionsMapping = new Array(numsArrayLength);

  for (
    let initialLoopIndex = 0;
    initialLoopIndex < numsArrayLength;
    initialLoopIndex++
  ) {
    const actualNumber = nums[initialLoopIndex];
    valuePositionsMapping[actualNumber] = initialLoopIndex;
  }

  const calculateMovesForZeroAtBeginning = (positionsForAnalysisOne) => {
    let operationsCountForBegin = 0;
    let nextItemToCheckBegin = 1;
    const currentPositionsForBegin = [...positionsForAnalysisOne];
    const emptySpaceFinalIndexBegin = 0;
    const offsetForBegin = 0;

    while (nextItemToCheckBegin < numsArrayLength) {
      const currentEmptyIndexBegin = currentPositionsForBegin[0];

      if (currentEmptyIndexBegin === emptySpaceFinalIndexBegin) {
        let innerLoopCheckItemBegin = nextItemToCheckBegin;
        while (
          innerLoopCheckItemBegin < numsArrayLength &&
          currentPositionsForBegin[innerLoopCheckItemBegin] ===
            innerLoopCheckItemBegin - offsetForBegin
        ) {
          innerLoopCheckItemBegin++;
        }
        nextItemToCheckBegin = innerLoopCheckItemBegin;
        if (nextItemToCheckBegin === numsArrayLength) {
          return operationsCountForBegin;
        }
        const itemToMoveToEmptyBegin = nextItemToCheckBegin;
        const zeroOriginalIndexBegin = currentPositionsForBegin[0];
        const itemToMoveOriginalIndexBegin =
          currentPositionsForBegin[itemToMoveToEmptyBegin];
        currentPositionsForBegin[0] = itemToMoveOriginalIndexBegin;
        currentPositionsForBegin[itemToMoveToEmptyBegin] =
          zeroOriginalIndexBegin;
        operationsCountForBegin++;
      } else {
        const itemToMoveToEmptyBegin = currentEmptyIndexBegin + offsetForBegin;
        const zeroOriginalIndexBegin = currentPositionsForBegin[0];
        const itemToMoveOriginalIndexBegin =
          currentPositionsForBegin[itemToMoveToEmptyBegin];
        currentPositionsForBegin[0] = itemToMoveOriginalIndexBegin;
        currentPositionsForBegin[itemToMoveToEmptyBegin] =
          zeroOriginalIndexBegin;
        operationsCountForBegin++;
      }
    }
    return operationsCountForBegin;
  };

  const calculateMovesForZeroAtEnd = (positionsForAnalysisTwo) => {
    let operationsCountForEnd = 0;
    let nextItemToCheckEnd = 1;
    const currentPositionsForEnd = [...positionsForAnalysisTwo];
    const emptySpaceFinalIndexEnd = numsArrayLength - 1;
    const offsetForEnd = 1;

    while (nextItemToCheckEnd < numsArrayLength) {
      const currentEmptyIndexEnd = currentPositionsForEnd[0];

      if (currentEmptyIndexEnd === emptySpaceFinalIndexEnd) {
        let innerLoopCheckItemEnd = nextItemToCheckEnd;
        while (
          innerLoopCheckItemEnd < numsArrayLength &&
          currentPositionsForEnd[innerLoopCheckItemEnd] ===
            innerLoopCheckItemEnd - offsetForEnd
        ) {
          innerLoopCheckItemEnd++;
        }
        nextItemToCheckEnd = innerLoopCheckItemEnd;
        if (nextItemToCheckEnd === numsArrayLength) {
          return operationsCountForEnd;
        }
        const itemToMoveToEmptyEnd = nextItemToCheckEnd;
        const zeroOriginalIndexEnd = currentPositionsForEnd[0];
        const itemToMoveOriginalIndexEnd =
          currentPositionsForEnd[itemToMoveToEmptyEnd];
        currentPositionsForEnd[0] = itemToMoveOriginalIndexEnd;
        currentPositionsForEnd[itemToMoveToEmptyEnd] = zeroOriginalIndexEnd;
        operationsCountForEnd++;
      } else {
        const itemToMoveToEmptyEnd = currentEmptyIndexEnd + offsetForEnd;
        const zeroOriginalIndexEnd = currentPositionsForEnd[0];
        const itemToMoveOriginalIndexEnd =
          currentPositionsForEnd[itemToMoveToEmptyEnd];
        currentPositionsForEnd[0] = itemToMoveOriginalIndexEnd;
        currentPositionsForEnd[itemToMoveToEmptyEnd] = zeroOriginalIndexEnd;
        operationsCountForEnd++;
      }
    }
    return operationsCountForEnd;
  };

  const resultOne = calculateMovesForZeroAtBeginning(valuePositionsMapping);
  const resultTwo = calculateMovesForZeroAtEnd(valuePositionsMapping);

  return Math.min(resultOne, resultTwo);
};
