/**
 * Palindrome Partitioning
 * Intuition: Every valid partition is a sequence of palindromic prefixes of the remaining suffix. Backtracking tries each palindrome prefix and continues on the rest.
 * Approach: 1. Helper checks a string with two pointers. 2. Recurse on remaining: if empty, push the parts list. 3. For split = 1..length, if remaining[0..split) is a palindrome, recurse with that part appended and the suffix. Start from ([], s).
 * Dry Run: s = "aab". Prefixes "a"+"a"+"b" and "aa"+"b" are palindrome partitions. "aab" as one piece is not.
 * Time Complexity: O(N^2 * 2^N)
 * Space Complexity: O(N * 2^N)
 */
var partition = function (s) {
  const allPartitionResults = [];

  const isInputPalindrome = (checkingString) => {
    let startPointer = 0;
    let endPointer = checkingString.length - 1;

    while (startPointer < endPointer) {
      if (checkingString[startPointer] !== checkingString[endPointer]) {
        return false;
      }
      startPointer++;
      endPointer--;
    }
    return true;
  };

  const findPartitions = (currentProcessedParts, remainingSubstring) => {
    if (!remainingSubstring.length) {
      allPartitionResults.push(currentProcessedParts);
      return;
    }

    for (
      let splitIndex = 1;
      splitIndex <= remainingSubstring.length;
      splitIndex++
    ) {
      const candidatePalindrome = remainingSubstring.slice(0, splitIndex);
      if (isInputPalindrome(candidatePalindrome)) {
        findPartitions(
          [...currentProcessedParts, candidatePalindrome],
          remainingSubstring.slice(splitIndex)
        );
      }
    }
  };

  findPartitions([], s);
  return allPartitionResults;
};
