/**
 * Majority Element
 * Intuition: Boyer–Moore voting: a majority (> n/2) survives pairing every other value against it. A count of zero means the current candidate is discarded and the next value becomes the new candidate.
 * Approach: 1. `currentMajorityElement = 0`, `majorityCount = 0`. 2. For each `valueAtCurrentIndex`, if count is 0, adopt it with count 1; else increment if it matches the candidate, otherwise decrement. 3. Return `currentMajorityElement`.
 * Dry Run: nums = [2,2,1,1,1,2,2]
 * Candidate 2 count 2; 1 reduces to 0; adopt 1; later 2s adopt 2 with count 1 then 2
 * Result: 2
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var majorityElement = function (nums) {
  let currentMajorityElement = 0;
  let majorityCount = 0;

  for (let currentIndex = 0; currentIndex < nums.length; currentIndex++) {
    const valueAtCurrentIndex = nums[currentIndex];
    if (majorityCount === 0) {
      currentMajorityElement = valueAtCurrentIndex;
      majorityCount = 1;
    } else if (valueAtCurrentIndex === currentMajorityElement) {
      majorityCount++;
    } else {
      majorityCount--;
    }
  }

  return currentMajorityElement;
};
