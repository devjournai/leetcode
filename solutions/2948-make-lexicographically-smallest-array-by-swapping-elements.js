/**
 * Make Lexicographically Smallest Array By Swapping Elements
 * Intuition: Elements that can be swapped directly or indirectly form connected components. Within such a component, any element can be moved to any position. To achieve the lexicographically smallest array, each component's values should be arranged in increasing order into its original indices, also in increasing order.
 * Approach: 1. Create an array of original indices and sort it based on the values in the input array. This effectively gives us the numbers sorted by value while retaining their original positions. 2. Iterate through this sorted-by-value index array to identify contiguous "swappable groups" (connected components). A group extends as long as consecutive elements (in the value-sorted sequence) have a difference within the `limit`. 3. For each identified group, take its original indices and sort them to get the target positions in the result array. Then, assign the values from the group (which are already value-sorted) to these sorted original indices. 4. Collect these assigned values into a final result array.
 * Dry Run: nums = [1, 5, 3, 2], limit = 1
 * 1. inputNumbers = [1, 5, 3, 2], swapLimit = 1
 * 2. indexedOriginalPositions (original indices sorted by nums value):
 *    - Initial: [0, 1, 2, 3]
 *    - After sort (nums[0]=1, nums[3]=2, nums[2]=3, nums[1]=5): [0, 3, 2, 1]
 * 3. finalResult = [0, 0, 0, 0]
 * 4. Main loop:
 *    groupStartingIndex = 0
 *    - groupEndingPointer = 1
 *    - Inner while:
 *      - groupEndingPointer = 1: nums[indexedOriginalPositions[1]] - nums[indexedOriginalPositions[0]] = nums[3] - nums[0] = 2 - 1 = 1. (1 <= 1) true. groupEndingPointer becomes 2.
 *      - groupEndingPointer = 2: nums[indexedOriginalPositions[2]] - nums[indexedOriginalPositions[1]] = nums[2] - nums[3] = 3 - 2 = 1. (1 <= 1) true. groupEndingPointer becomes 3.
 *      - groupEndingPointer = 3: nums[indexedOriginalPositions[3]] - nums[indexedOriginalPositions[2]] = nums[1] - nums[2] = 5 - 3 = 2. (2 <= 1) false. While loop ends.
 *    - Current group identified: indexedOriginalPositions from 0 to 3 is [0, 3, 2]. These are original indices of values [1, 2, 3].
 *    - currentGroupOriginalIndices = [0, 3, 2]. Sort it: [0, 2, 3]. These are the target positions for the values in this group.
 *    - Inner for (elementOffset = 0 to 2):
 *      - elementOffset = 0: finalResult[currentGroupOriginalIndices[0]] = inputNumbers[indexedOriginalPositions[0 + 0]] => finalResult[0] = inputNumbers[0] = 1. (finalResult = [1,0,0,0])
 *      - elementOffset = 1: finalResult[currentGroupOriginalIndices[1]] = inputNumbers[indexedOriginalPositions[0 + 1]] => finalResult[2] = inputNumbers[3] = 2. (finalResult = [1,0,2,0])
 *      - elementOffset = 2: finalResult[currentGroupOriginalIndices[2]] = inputNumbers[indexedOriginalPositions[0 + 2]] => finalResult[3] = inputNumbers[2] = 3. (finalResult = [1,0,2,3])
 *    - groupStartingIndex = groupEndingPointer (which is 3).
 * 5. Main loop:
 *    groupStartingIndex = 3
 *    - groupEndingPointer = 4
 *    - Inner while: groupEndingPointer (4) is not less than inputNumbers.length (4). While loop does not run.
 *    - Current group identified: indexedOriginalPositions from 3 to 4 is [1]. This is original index of value [5].
 *    - currentGroupOriginalIndices = [1]. Sort it: [1].
 *    - Inner for (elementOffset = 0):
 *      - elementOffset = 0: finalResult[currentGroupOriginalIndices[0]] = inputNumbers[indexedOriginalPositions[3 + 0]] => finalResult[1] = inputNumbers[1] = 5. (finalResult = [1,5,2,3])
 *    - groupStartingIndex = groupEndingPointer (which is 4).
 * 6. Main loop:
 *    groupStartingIndex = 4. (4 < 4) false. Loop ends.
 * 7. Return finalResult = [1, 5, 2, 3].
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var lexicographicallySmallestArray = function (inputNumbers, swapLimit) {
  const totalElements = inputNumbers.length;
  const indexedOriginalPositions = new Array(totalElements)
    .fill(0)
    .map((_elementValue, originalPos) => originalPos);
  indexedOriginalPositions.sort(
    (indexOne, indexTwo) => inputNumbers[indexOne] - inputNumbers[indexTwo]
  );

  const finalResult = new Array(totalElements).fill(0);
  let groupStartingIndex = 0;

  while (groupStartingIndex < totalElements) {
    let groupEndingPointer = groupStartingIndex + 1;

    while (
      groupEndingPointer < totalElements &&
      inputNumbers[indexedOriginalPositions[groupEndingPointer]] -
        inputNumbers[indexedOriginalPositions[groupEndingPointer - 1]] <=
        swapLimit
    ) {
      groupEndingPointer++;
    }

    const currentGroupOriginalIndices = indexedOriginalPositions.slice(
      groupStartingIndex,
      groupEndingPointer
    );
    currentGroupOriginalIndices.sort((posOne, posTwo) => posOne - posTwo);

    for (
      let elementOffset = 0;
      elementOffset < currentGroupOriginalIndices.length;
      elementOffset++
    ) {
      finalResult[currentGroupOriginalIndices[elementOffset]] =
        inputNumbers[
          indexedOriginalPositions[groupStartingIndex + elementOffset]
        ];
    }
    groupStartingIndex = groupEndingPointer;
  }

  return finalResult;
};
