/**
 * Divide an Array Into Subarrays With Minimum Cost I
 * Intuition: The first subarray must start at index 0, so nums[0] is always in the cost. The other two subarrays start at the two remaining smallest values in nums[1..n-1].
 * Approach: Track the two smallest values after index 0 in one pass, then return nums[0] plus those two values.
 * Dry Run: nums = [1, 2, 3, 12] -> first=1, two smallest after it are 2 and 3, cost = 6.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumCost = function (nums) {
  const arrayLength = nums.length;
  const firstElementCost = nums[0];

  let minimumFirstCandidate = Infinity;
  let minimumSecondCandidate = Infinity;

  for (let indexVal = 1; indexVal < arrayLength; indexVal++) {
    const currentElement = nums[indexVal];
    if (currentElement < minimumFirstCandidate) {
      minimumSecondCandidate = minimumFirstCandidate;
      minimumFirstCandidate = currentElement;
    } else if (currentElement < minimumSecondCandidate) {
      minimumSecondCandidate = currentElement;
    }
  }

  const totalMinimumCost =
    firstElementCost + minimumFirstCandidate + minimumSecondCandidate;
  return totalMinimumCost;
};
