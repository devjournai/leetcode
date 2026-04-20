/**
    * Find The Duplicate Number
    * Time Complexity: O(n)
    * Space Complexity: O(1)
*/
var findDuplicate = function (nums) {
  let tortoisePointer = nums[0];
  let harePointer = nums[nums[0]];

  while (tortoisePointer !== harePointer) {
    tortoisePointer = nums[tortoisePointer];
    harePointer = nums[nums[harePointer]];
  }

  let startIterator = 0;
  let meetingIterator = tortoisePointer;

  while (startIterator !== meetingIterator) {
    startIterator = nums[startIterator];
    meetingIterator = nums[meetingIterator];
  }

  return startIterator;
};