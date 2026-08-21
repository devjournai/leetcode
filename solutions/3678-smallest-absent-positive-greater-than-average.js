/**
 * Smallest Absent Positive Greater Than Average
 * Intuition: The answer is the smallest missing positive integer strictly above the array average. Floor(average)+1 is the first candidate, then walk upward until a value is absent.
 * Approach: 1. Put nums in a set. 2. Start at max(1, floor(sum/n)+1). 3. Increment while the candidate is present.
 * Dry Run: nums = [3, 5], average 4, start at 5 (present) then 6 (absent) → 6.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var smallestAbsent = function (nums) {
  const presentValues = new Set(nums);
  let total = 0;
  for (const value of nums) {
    total += value;
  }
  let candidate = Math.max(1, Math.floor(total / nums.length) + 1);
  while (presentValues.has(candidate)) {
    candidate++;
  }
  return candidate;
};
