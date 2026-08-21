/**
 * Minimum Increment To Make Array Unique
 * Intuition: After sorting, each value must be at least one more than the previous assigned unique number. If it is not, increment it up to that floor and add the gap to the cost.
 * Approach: 1. Sort. Empty → 0. 2. `nextExpectedValue = nums[0]`. 3. For later elements: if ≤ expected, add (expected+1 − element) and set expected to expected+1; else expected = element. 4. Return total.
 * Dry Run: [3,2,1,2,1,7] sorted [1,1,2,2,3,7]. Second 1 → 2 (cost 1), next 2 → 3 (cost 1), next 2 → 4 (cost 2), 3 → 5 (cost 2), 7 stays. Total 6.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minIncrementForUnique = function (nums) {
  nums.sort((firstNum, secondNum) => firstNum - secondNum);

  let calculatedTotal = 0;
  let nextExpectedValue = 0;
  let currentIndex = 0;

  if (nums.length === 0) {
    return 0;
  }

  nextExpectedValue = nums[0];
  currentIndex = 1;

  while (currentIndex < nums.length) {
    let currentElement = nums[currentIndex];

    if (currentElement <= nextExpectedValue) {
      let requiredNext = nextExpectedValue + 1;
      calculatedTotal += requiredNext - currentElement;
      nextExpectedValue = requiredNext;
    } else {
      nextExpectedValue = currentElement;
    }
    currentIndex++;
  }

  return calculatedTotal;
};
