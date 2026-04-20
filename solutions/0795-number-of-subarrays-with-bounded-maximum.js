/**
 * Number Of Subarrays With Bounded Maximum
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
