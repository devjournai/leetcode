/**
 * Kth Smallest Subarray Sum
 * Time Complexity: O(N * log(S))
 * Space Complexity: O(1)
 */
var kthSmallestSubarraySum = function (nums, k) {
  let searchSpaceLowerBound = nums[0];
  let searchSpaceUpperBound = 0;

  for (let numValue of nums) {
    if (numValue < searchSpaceLowerBound) {
      searchSpaceLowerBound = numValue;
    }
    searchSpaceUpperBound += numValue;
  }

  let resultSum = searchSpaceUpperBound;

  while (searchSpaceLowerBound <= searchSpaceUpperBound) {
    const candidateSum = Math.floor(
      (searchSpaceLowerBound + searchSpaceUpperBound) / 2,
    );

    const calculateSubarrayCount = (targetMaxSum) => {
      let currentSubarrayTotal = 0;
      let windowLeftPointer = 0;
      let countedSubarrayQuantity = 0;

      for (
        let windowRightPointer = 0;
        windowRightPointer < nums.length;
        windowRightPointer++
      ) {
        currentSubarrayTotal += nums[windowRightPointer];

        while (currentSubarrayTotal > targetMaxSum) {
          currentSubarrayTotal -= nums[windowLeftPointer];
          windowLeftPointer++;
        }
        countedSubarrayQuantity += windowRightPointer - windowLeftPointer + 1;
      }
      return countedSubarrayQuantity;
    };

    const totalSubarraysBelowCandidate = calculateSubarrayCount(candidateSum);

    if (totalSubarraysBelowCandidate >= k) {
      resultSum = candidateSum;
      searchSpaceUpperBound = candidateSum - 1;
    } else {
      searchSpaceLowerBound = candidateSum + 1;
    }
  }

  return resultSum;
};
