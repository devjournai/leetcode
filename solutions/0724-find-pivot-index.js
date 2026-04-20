/**
 * Find Pivot Index
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var pivotIndex = function (nums) {
  let entireArraySum = 0;
  for (const numberValue of nums) {
    entireArraySum += numberValue;
  }

  let currentSumLeft = 0;
  let indexPosition = 0;

  while (indexPosition < nums.length) {
    let currentSumRight = entireArraySum - currentSumLeft - nums[indexPosition];

    if (currentSumLeft === currentSumRight) {
      return indexPosition;
    }

    currentSumLeft += nums[indexPosition];
    indexPosition++;
  }

  return -1;
};
