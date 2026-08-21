/**
 * Find The Duplicate Number
 * Intuition: Values are pointers into [1,n], so the duplicate creates a cycle. Floyd’s tortoise/hare finds the cycle; a second walk from 0 meets at the duplicate.
 * Approach: 1. tortoise=nums[0], hare=nums[nums[0]]. 2. Until they meet, tortoise one step, hare two. 3. Walk from 0 and from the meeting index one step each until they meet. 4. Return that index value.
 * Dry Run: nums = [1,3,4,2,2].
 *   - tortoise/hare meet inside the cycle, then start=0 and meeting walk to 2.
 *   - Return 2.
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
