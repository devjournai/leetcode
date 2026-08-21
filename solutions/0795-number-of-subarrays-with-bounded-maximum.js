/**
 * Number Of Subarrays With Bounded Maximum
 * Intuition: Subarrays whose max is in `[left, right]` equal those with max ≤ `right` minus those with max ≤ `left-1`.
 * Approach: 1. `calculateSubarraysAtMost` walks the array, growing a run of values ≤ `maximumAllowed` and adding `len*(len+1)/2` when a run breaks (and at the end). 2. Return `atMost(right) - atMost(left-1)`.
 * Dry Run: nums = [2,1,4,3], left = 2, right = 3. atMost(3) treats 4 as a break; atMost(1) is smaller. Difference is 3.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var numSubarrayBoundedMax = function (nums, left, right) {
  const calculateSubarraysAtMost = (inputArray, maximumAllowed) => {
    let totalValidSubarrays = 0;
    let currentContiguousLength = 0;
    for (let elementValue of inputArray) {
      if (elementValue <= maximumAllowed) {
        currentContiguousLength++;
      } else {
        totalValidSubarrays +=
          (currentContiguousLength * (currentContiguousLength + 1)) / 2;
        currentContiguousLength = 0;
      }
    }
    totalValidSubarrays +=
      (currentContiguousLength * (currentContiguousLength + 1)) / 2;
    return totalValidSubarrays;
  };

  let firstCallResult = calculateSubarraysAtMost(nums, right);
  let secondCallResult = calculateSubarraysAtMost(nums, left - 1);

  let overallResult = firstCallResult - secondCallResult;

  return overallResult;
};
