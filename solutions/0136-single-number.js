/**
 * Single Number
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