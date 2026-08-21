/**
 * Reduction Operations To Make The Array Elements Equal
 * Intuition: Each unique larger value must be reduced down through every distinct value below it. After sorting, the k-th new distinct value adds k operations for every remaining occurrence.
 * Approach: 1. Sort a copy. 2. Walk i=1..n-1; when nums[i] differs from previous, increment `currentReductionSteps`. 3. Add that to `overallOperations` for every position.
 * Dry Run: nums=[5,1,3] sorted [1,3,5]. At 3: steps=1 ops=1; at 5: steps=2 ops=3. Return 3.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var reductionOperations = function (nums) {
  const sortedNumbers = [...nums];
  sortedNumbers.sort(
    (firstElement, secondElement) => firstElement - secondElement
  );

  let overallOperations = 0;
  let currentReductionSteps = 0;

  let elementIndex = 1;

  while (elementIndex < sortedNumbers.length) {
    if (sortedNumbers[elementIndex] !== sortedNumbers[elementIndex - 1]) {
      currentReductionSteps++;
    }
    overallOperations += currentReductionSteps;

    elementIndex++;
  }

  return overallOperations;
};
