/**
 * Contains Duplicate II
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var containsNearbyDuplicate = function (nums, k) {
  const nearbyValues = new Set();

  for (let indexPosition = 0; indexPosition < nums.length; indexPosition++) {
    const currentValue = nums[indexPosition];

    if (nearbyValues.has(currentValue)) {
      return true;
    }

    nearbyValues.add(currentValue);

    if (nearbyValues.size > k) {
      const oldestValue = nums[indexPosition - k];
      nearbyValues.delete(oldestValue);
    }
  }

  return false;
};
