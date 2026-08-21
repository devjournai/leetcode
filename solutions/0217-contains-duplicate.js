/**
 * Contains Duplicate
 * Intuition: A value is a duplicate if we have already stored it. An object used as a set gives average O(1) membership.
 * Approach: 1. Create an empty object. 2. For each number, if it is already a key, return true. 3. Otherwise store it as true. 4. Return false if the loop finishes.
 * Dry Run: nums = [1,2,3,1].
 *   - 1,2,3 stored. Next 1 is already defined → true.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var containsDuplicate = function (nums) {
  const encounteredElements = {};

  for (let currentElement of nums) {
    if (encounteredElements[currentElement] !== undefined) {
      return true;
    }
    encounteredElements[currentElement] = true;
  }

  return false;
};
