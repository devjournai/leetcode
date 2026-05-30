/**
 * Sort Even And Odd Indices Independently
 * Intuition: Separate elements based on their index parity, sort them according to the rules (even indices non-decreasing, odd indices non-increasing), then reassemble the array preserving the original index parities.
 * Approach: 1. Iterate through the input array, creating two new arrays: one for elements at even indices and another for elements at odd indices. 2. Sort the even-indexed elements array in ascending order. 3. Sort the odd-indexed elements array in descending order. 4. Initialize a result array and two pointers for the sorted even and odd arrays. 5. Iterate from 0 to the length of the original array using a while loop, placing elements from the sorted even array at even indices and from the sorted odd array at odd indices in the result array, incrementing the respective pointer each time. 6. Return the constructed result array.
 * Dry Run: nums = [4,1,2,3]
 *   1. Separate:
 *      valuesFromEvenIndices = []
 *      valuesFromOddIndices = []
 *      currentSplitIndex = 0 (even): valuesFromEvenIndices.push(4) -> valuesFromEvenIndices = [4]
 *      currentSplitIndex = 1 (odd): valuesFromOddIndices.push(1) -> valuesFromOddIndices = [1]
 *      currentSplitIndex = 2 (even): valuesFromEvenIndices.push(2) -> valuesFromEvenIndices = [4,2]
 *      currentSplitIndex = 3 (odd): valuesFromOddIndices.push(3) -> valuesFromOddIndices = [1,3]
 *   After separation: valuesFromEvenIndices = [4,2], valuesFromOddIndices = [1,3]
 *   2. Sort:
 *      valuesFromEvenIndices.sort((valA,valB) => valA-valB) -> valuesFromEvenIndices = [2,4]
 *      valuesFromOddIndices.sort((valC,valD) => valD-valC) -> valuesFromOddIndices = [3,1]
 *   After sorting: valuesFromEvenIndices = [2,4], valuesFromOddIndices = [3,1]
 *   3. Merge:
 *      rearrangedArray = []
 *      evenSourcePointer = 0, oddSourcePointer = 0
 *      currentMergeIndex = 0 (even): rearrangedArray.push(valuesFromEvenIndices[evenSourcePointer++]) -> rearrangedArray = [2], evenSourcePointer = 1
 *      currentMergeIndex = 1 (odd): rearrangedArray.push(valuesFromOddIndices[oddSourcePointer++]) -> rearrangedArray = [2,3], oddSourcePointer = 1
 *      currentMergeIndex = 2 (even): rearrangedArray.push(valuesFromEvenIndices[evenSourcePointer++]) -> rearrangedArray = [2,3,4], evenSourcePointer = 2
 *      currentMergeIndex = 3 (odd): rearrangedArray.push(valuesFromOddIndices[oddSourcePointer++]) -> rearrangedArray = [2,3,4,1], oddSourcePointer = 2
 *   Return: [2,3,4,1]
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var sortEvenOdd = function (nums) {
  const originalLength = nums.length;
  const valuesFromEvenIndices = [];
  const valuesFromOddIndices = [];

  let currentSplitIndex = 0;
  for (
    currentSplitIndex = 0;
    currentSplitIndex < originalLength;
    currentSplitIndex++
  ) {
    if (currentSplitIndex % 2 === 0) {
      valuesFromEvenIndices.push(nums[currentSplitIndex]);
    } else {
      valuesFromOddIndices.push(nums[currentSplitIndex]);
    }
  }

  valuesFromEvenIndices.sort((valA, valB) => valA - valB);
  valuesFromOddIndices.sort((valC, valD) => valD - valC);

  const rearrangedArray = [];
  let evenSourcePointer = 0;
  let oddSourcePointer = 0;
  let currentMergeIndex = 0;

  while (currentMergeIndex < originalLength) {
    if (currentMergeIndex % 2 === 0) {
      rearrangedArray.push(valuesFromEvenIndices[evenSourcePointer]);
      evenSourcePointer++;
    } else {
      rearrangedArray.push(valuesFromOddIndices[oddSourcePointer]);
      oddSourcePointer++;
    }
    currentMergeIndex++;
  }

  return rearrangedArray;
};
