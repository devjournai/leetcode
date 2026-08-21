/**
 * Largest Divisible Subset
 * Intuition: After sorting, a number can extend any earlier subset whose last value divides it, so DP can store each index’s best subset length and previous index, then walk back from the global best end.
 * Approach: 1. Empty → []. 2. Sort ascending. 3. Each dp entry starts length 1, prev -1. 4. For i over j < i, if nums[i] % nums[j] === 0 and j’s length+1 is better, update i. 5. Track the max-length index, then unshift along previous pointers.
 * Dry Run: [1,2,3] sorted. 2 extends 1 (len 2); 3 extends 1 (len 2). Trace from index 1 → [1,2].
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var largestDivisibleSubset = function (nums) {
  if (nums.length === 0) {
    return [];
  }

  nums.sort((firstNum, secondNum) => firstNum - secondNum);

  const dpStates = new Array(nums.length).fill(null).map(() => ({
    subsetLength: 1,
    previousElementIndex: -1,
  }));

  let overallMaxLength = 1;
  let indexOfMaxSubsetEnd = 0;

  for (
    let currentNumberIndex = 0;
    currentNumberIndex < nums.length;
    currentNumberIndex++
  ) {
    for (
      let previousNumberIndex = 0;
      previousNumberIndex < currentNumberIndex;
      previousNumberIndex++
    ) {
      if (nums[currentNumberIndex] % nums[previousNumberIndex] === 0) {
        let candidateLength = dpStates[previousNumberIndex].subsetLength + 1;

        if (candidateLength > dpStates[currentNumberIndex].subsetLength) {
          dpStates[currentNumberIndex].subsetLength = candidateLength;
          dpStates[currentNumberIndex].previousElementIndex =
            previousNumberIndex;
        }
      }
    }

    if (dpStates[currentNumberIndex].subsetLength > overallMaxLength) {
      overallMaxLength = dpStates[currentNumberIndex].subsetLength;
      indexOfMaxSubsetEnd = currentNumberIndex;
    }
  }

  const finalSubset = [];
  let currentIndexToTrace = indexOfMaxSubsetEnd;

  while (currentIndexToTrace !== -1) {
    finalSubset.unshift(nums[currentIndexToTrace]);
    currentIndexToTrace = dpStates[currentIndexToTrace].previousElementIndex;
  }

  return finalSubset;
};
