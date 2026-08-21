/**
 * Kth Smallest Subarray Sum
 * Intuition: Subarray sums of a positive array are monotone in the bound. Binary-search the sum S and count how many subarrays have sum ≤ S with a sliding window.
 * Approach: 1. Low = min(nums), high = total sum. 2. For mid, two-pointer `calculateSubarrayCount`. 3. If count ≥ k, try smaller (record resultSum); else raise low.
 * Dry Run: nums=[2,1,3], k=4. Sorted subarray sums 1,2,3,3,4,6; 4th is 3. Return 3.
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
      (searchSpaceLowerBound + searchSpaceUpperBound) / 2
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
