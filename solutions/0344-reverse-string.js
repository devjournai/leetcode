/**
 * Reverse String
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