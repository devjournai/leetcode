/**
 * Find Pivot Index
 * Intuition: The pivot is the first index where left sum equals right sum. Right sum is total minus left minus the current element, so one left-to-right pass suffices.
 * Approach: 1. Sum all values into `entireArraySum`. 2. Walk indices with `currentSumLeft`. 3. If `currentSumLeft === entireArraySum - currentSumLeft - nums[index]`, return the index. 4. Else add the element to the left sum. Return -1 if none.
 * Dry Run: [1,7,3,6,5,6]. At index 3, left 11 equals right 11 → 3.
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
