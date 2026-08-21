/**
 * Remove Palindromic Subsequences
 * Intuition: Only letters a and b. A palindrome subsequence can take all of one letter, so any string needs at most 2 deletions; 1 if it is already a palindrome.
 * Approach: 1. Empty → 0. 2. Two-pointer palindrome check. 3. Return 1 if palindrome else 2.
 * Dry Run: s = "abb". Not a palindrome → 2. s = "ababa" → 1.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var removePalindromeSub = function (s) {
  const stringSize = s.length;

  if (stringSize === 0) {
    return 0;
  }

  let leftTraversalPointer = 0;
  let rightTraversalPointer = stringSize - 1;
  let isPalindromeCheckPassed = true;

  while (leftTraversalPointer < rightTraversalPointer) {
    if (s[leftTraversalPointer] !== s[rightTraversalPointer]) {
      isPalindromeCheckPassed = false;
      break;
    }
    leftTraversalPointer++;
    rightTraversalPointer--;
  }

  if (isPalindromeCheckPassed) {
    return 1;
  } else {
    return 2;
  }
};
