/**
 * Closest Subsequence Sum
 * Intuition: Meet-in-the-middle: all subsequence sums of each half. For each left sum, binary-search the right sum nearest to `goal - left`.
 * Approach: 1. Split at `midpointIndex`; DFS fill `firstHalfSums` and `secondHalfSums`. 2. Sort the second set. 3. For each left sum, binary search and track `minimumDifference`. 4. Return it.
 * Dry Run: nums = [5,-7,3,5], goal = 6
 * First half [5,-7] sums {0,5,-7,-2}; second [3,5] sums {0,3,5,8}. Pair -2+8=6 → difference 0.
 * Time Complexity: O(N * 2^(N/2))
 * Space Complexity: O(2^(N/2))
 */
var minAbsDifference = function (nums, goal) {
  const inputNumbers = nums;
  const targetSum = goal;

  const arrayLength = inputNumbers.length;
  const midpointIndex = Math.floor(arrayLength / 2);

  const firstHalfSums = new Set();
  const secondHalfSums = new Set();

  const calculateSubsequenceSums = (
    currentIndex,
    stopIndex,
    sumCollection,
    currentSumAccumulator
  ) => {
    if (currentIndex === stopIndex) {
      sumCollection.add(currentSumAccumulator);
      return;
    }
    calculateSubsequenceSums(
      currentIndex + 1,
      stopIndex,
      sumCollection,
      currentSumAccumulator
    );
    calculateSubsequenceSums(
      currentIndex + 1,
      stopIndex,
      sumCollection,
      currentSumAccumulator + inputNumbers[currentIndex]
    );
  };

  calculateSubsequenceSums(0, midpointIndex, firstHalfSums, 0);
  calculateSubsequenceSums(midpointIndex, arrayLength, secondHalfSums, 0);

  const sortedSecondHalfSums = [...secondHalfSums].sort(
    (valA, valB) => valA - valB
  );

  let minimumDifference = Infinity;

  firstHalfSums.forEach((currentFirstHalfSum) => {
    const remainingTarget = targetSum - currentFirstHalfSum;

    let searchLowIndex = 0;
    let searchHighIndex = sortedSecondHalfSums.length - 1;

    while (searchLowIndex <= searchHighIndex) {
      const searchMidIndex = Math.floor((searchLowIndex + searchHighIndex) / 2);
      const totalSubsequenceSum =
        currentFirstHalfSum + sortedSecondHalfSums[searchMidIndex];

      minimumDifference = Math.min(
        minimumDifference,
        Math.abs(totalSubsequenceSum - targetSum)
      );

      if (totalSubsequenceSum < targetSum) {
        searchLowIndex = searchMidIndex + 1;
      } else {
        searchHighIndex = searchMidIndex - 1;
      }
    }
  });

  return minimumDifference;
};
