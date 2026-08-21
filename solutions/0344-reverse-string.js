/**
 * Reverse String
 * Intuition: Reverse in place by swapping the left and right ends and walking the two pointers inward.
 * Approach: 1. leftPointer = 0, rightPointer = last index. 2. While left < right, swap s[left] and s[right]. 3. Increment left and decrement right.
 * Dry Run: s = ["h", "e", "l", "l", "o"].
 *   - Swap h/o, then e/l → ["o", "l", "l", "e", "h"].
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var reverseString = function (s) {
  let leftPointer = 0;
  let rightPointer = s.length - 1;

  while (leftPointer < rightPointer) {
    let temporaryStorage = s[leftPointer];
    s[leftPointer] = s[rightPointer];
    s[rightPointer] = temporaryStorage;

    leftPointer++;
    rightPointer--;
  }
};
