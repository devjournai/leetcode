/**
 * Longest Substring Without Repeating Characters
 * Time Complexity: O(N)
 * Space Complexity: O(min(M, N))
 */

var lengthOfLongestSubstring = function (str) {
  let leftPointer = 0;
  let maxLength = 0;
  const seenCharacters = new Set();

  for (let rightPointer = 0; rightPointer < str.length; rightPointer++) {
    const currentChar = str[rightPointer];

    while (seenCharacters.has(currentChar)) {
      seenCharacters.delete(str[leftPointer]);
      leftPointer++;
    }

    seenCharacters.add(currentChar);
    maxLength = Math.max(maxLength, rightPointer - leftPointer + 1);
  }

  return maxLength;
};
