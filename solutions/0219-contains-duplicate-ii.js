/**
 * Contains Duplicate II
 * Intuition: We only care about duplicates within distance k. A sliding window set of the last k values answers membership in O(1).
 * Approach: 1. Scan left to right. 2. If nums[i] is already in the set, return true. 3. Add it; if the set size exceeds k, delete nums[i-k]. 4. Return false if none collide.
 * Dry Run: nums = [1,2,3,1], k = 3.
 *   - Add 1,2,3 (window size 3).
 *   - i=3: 1 is already in the set → true.
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
