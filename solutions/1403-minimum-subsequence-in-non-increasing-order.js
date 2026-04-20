/**
 * Minimum Subsequence In Non Increasing Order
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minSubsequence = function (nums) {
  nums.sort((valueA, valueB) => valueB - valueA);

  let totalAggregate = 0;
  for (let indexValue = 0; indexValue < nums.length; indexValue++) {
    totalAggregate += nums[indexValue];
  }

  const foundElements = [];
  let currentSubsequenceSum = 0;

  for (let elementIndex = 0; elementIndex < nums.length; elementIndex++) {
    let presentNumber = nums[elementIndex];
    currentSubsequenceSum += presentNumber;
    foundElements.push(presentNumber);
    if (currentSubsequenceSum > totalAggregate - currentSubsequenceSum) {
      break;
    }
  }

  return foundElements;
};
