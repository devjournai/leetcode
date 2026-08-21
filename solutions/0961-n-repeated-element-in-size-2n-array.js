/**
 * N-Repeated Element in Size 2N Array
 * Intuition: The duplicated value appears n times in 2n slots, so it must sit within distance 1–3 of another copy. Scan each index against +1, +2, and +3.
 * Approach: 1. Walk `indexIterator` over `nums`. 2. Compare `firstComparedElement` with positions +1, +2, +3 when in range. 3. Return on first match. 4. Fallback `-1` if none (shouldn't happen on valid input).
 * Dry Run: nums = [1,2,3,3]. At index 2, nums[2]===nums[3]===3. Return 3.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var repeatedNTimes = function (nums) {
  let indexIterator = 0;

  while (indexIterator < nums.length) {
    let firstComparedElement = nums[indexIterator];

    if (indexIterator + 1 < nums.length) {
      let secondComparedElement = nums[indexIterator + 1];
      if (firstComparedElement === secondComparedElement) {
        return firstComparedElement;
      }
    }

    if (indexIterator + 2 < nums.length) {
      let thirdComparedElement = nums[indexIterator + 2];
      if (firstComparedElement === thirdComparedElement) {
        return firstComparedElement;
      }
    }

    if (indexIterator + 3 < nums.length) {
      let fourthComparedElement = nums[indexIterator + 3];
      if (firstComparedElement === fourthComparedElement) {
        return firstComparedElement;
      }
    }

    indexIterator = indexIterator + 1;
  }
  return -1;
};
