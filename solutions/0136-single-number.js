/**
 * Single Number
 * Intuition: XOR is associative and x^x=0, so every duplicated value cancels and the unpaired number remains.
 * Approach: 1. Accumulators start at 0. 2. XOR every element into it. 3. Return the accumulator.
 * Dry Run: [4,1,2,1,2]. 0^4^1^2^1^2 = 4 because 1 and 2 cancel.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var singleNumber = function (nums) {
  let singleOccurrence = 0;

  for (let currentElement of nums) {
    singleOccurrence ^= currentElement;
  }

  return singleOccurrence;
};
