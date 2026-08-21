/**
 * Count Of Smaller Numbers After Self
 * Intuition: A smaller number after i is an inversion. Merge sort can count, for each left element, how many already-taken right-half values were strictly smaller.
 * Approach: 1. Pair each value with its original index. 2. Merge-sort the pairs. 3. When merging, if the right value is smaller, increment a right-taken counter; when taking a left value (or leftover left items), add that counter to smallerCounts[originalIndex]. 4. Copy the merged range back and return smallerCounts.
 * Dry Run: nums = [5, 2, 6, 1].
 *   - Merge [5, 2]: 2 is taken first → count[0] += 1.
 *   - Merge [6, 1]: count[2] += 1. Final merge adds one more to 5 and one to 2 → [2, 1, 1, 0].
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var countSmaller = function (nums) {
  const inputLength = nums.length;
  if (inputLength === 0) {
    return [];
  }

  const indexedOriginals = new Array(inputLength);
  for (
    let currentNumberIndex = 0;
    currentNumberIndex < inputLength;
    currentNumberIndex++
  ) {
    indexedOriginals[currentNumberIndex] = [
      nums[currentNumberIndex],
      currentNumberIndex,
    ];
  }

  const smallerCounts = new Array(inputLength).fill(0);
  const tempMergedArray = new Array(inputLength);

  const mergeSortProcedure = (startIndex, endIndex) => {
    if (startIndex >= endIndex) {
      return;
    }

    const midIndex = Math.floor((startIndex + endIndex) / 2);
    mergeSortProcedure(startIndex, midIndex);
    mergeSortProcedure(midIndex + 1, endIndex);

    let leftPartPointer = startIndex;
    let rightPartPointer = midIndex + 1;
    let tempArrayPointer = startIndex;
    let elementsFromRightCount = 0;

    while (leftPartPointer <= midIndex && rightPartPointer <= endIndex) {
      const leftElementValue = indexedOriginals[leftPartPointer][0];
      const rightElementValue = indexedOriginals[rightPartPointer][0];

      if (leftElementValue > rightElementValue) {
        tempMergedArray[tempArrayPointer] = indexedOriginals[rightPartPointer];
        elementsFromRightCount++;
        rightPartPointer++;
      } else {
        smallerCounts[indexedOriginals[leftPartPointer][1]] +=
          elementsFromRightCount;
        tempMergedArray[tempArrayPointer] = indexedOriginals[leftPartPointer];
        leftPartPointer++;
      }
      tempArrayPointer++;
    }

    for (
      let remainingLeftIndex = leftPartPointer;
      remainingLeftIndex <= midIndex;
      remainingLeftIndex++
    ) {
      smallerCounts[indexedOriginals[remainingLeftIndex][1]] +=
        elementsFromRightCount;
      tempMergedArray[tempArrayPointer] = indexedOriginals[remainingLeftIndex];
      tempArrayPointer++;
    }

    for (
      let remainingRightIndex = rightPartPointer;
      remainingRightIndex <= endIndex;
      remainingRightIndex++
    ) {
      tempMergedArray[tempArrayPointer] = indexedOriginals[remainingRightIndex];
      tempArrayPointer++;
    }

    for (
      let copyBackIndex = startIndex;
      copyBackIndex <= endIndex;
      copyBackIndex++
    ) {
      indexedOriginals[copyBackIndex] = tempMergedArray[copyBackIndex];
    }
  };

  mergeSortProcedure(0, inputLength - 1);

  return smallerCounts;
};
