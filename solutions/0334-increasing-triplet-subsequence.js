/**
 * Increasing Triplet Subsequence
 * Intuition: Track the smallest value seen and the smallest second value that has a smaller predecessor. Any later value larger than the second completes i < j < k with increasing values.
 * Approach: 1. firstSmallest = secondSmallest = Infinity. 2. For each x: if x > secondSmallest return true; else if x > firstSmallest set secondSmallest = x; else set firstSmallest = x. 3. Return false if the loop ends.
 * Dry Run: nums = [2, 1, 5, 0, 4, 6].
 *   - first becomes 2 then 1 then 0; second becomes 5 then 4; 6 > 4 → true.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var increasingTriplet = function (nums) {
  let firstSmallest = Infinity;
  let secondSmallest = Infinity;

  for (const iteratedValue of nums) {
    if (iteratedValue > secondSmallest) {
      return true;
    } else if (iteratedValue > firstSmallest) {
      secondSmallest = iteratedValue;
    } else {
      firstSmallest = iteratedValue;
    }
  }

  return false;
};
