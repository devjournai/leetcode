/**
 * Remove Palindromic Subsequences
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
