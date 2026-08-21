/**
 * Split Two Strings To Make Palindrome
 * Intuition: A palindrome can take a prefix of one string and the matching suffix of the other. After greedy matching from both ends, the leftover middle must be a palindrome in a or in b.
 * Approach: 1. Walk i from left of first and j from right of second while chars match. 2. Check whether first[i..j] or second[i..j] is a palindrome. 3. Repeat with the strings swapped. 4. Return true if either pairing works.
 * Dry Run: a = "x", b = "y". Length 1 is always a palindrome → true. For a="abdef", b="fecab": prefix a + suffix b matches, middle "de"/"eca" — check the helper.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var checkPalindromeFormation = function (stringA, stringB) {
  const checkPairLogic = (firstStringParam, secondStringParam) => {
    let leftPointer = 0;
    let rightPointer = firstStringParam.length - 1;

    while (
      leftPointer < rightPointer &&
      firstStringParam[leftPointer] === secondStringParam[rightPointer]
    ) {
      leftPointer++;
      rightPointer--;
    }

    const isPalindromeHelper = (
      checkStringParam,
      checkStartIdx,
      checkEndIdx
    ) => {
      let palinLeft = checkStartIdx;
      let palinRight = checkEndIdx;
      while (palinLeft < palinRight) {
        if (checkStringParam[palinLeft] !== checkStringParam[palinRight]) {
          return false;
        }
        palinLeft++;
        palinRight--;
      }
      return true;
    };

    let isPalinFirstSegment = isPalindromeHelper(
      firstStringParam,
      leftPointer,
      rightPointer
    );
    let isPalinSecondSegment = isPalindromeHelper(
      secondStringParam,
      leftPointer,
      rightPointer
    );

    return isPalinFirstSegment || isPalinSecondSegment;
  };

  return checkPairLogic(stringA, stringB) || checkPairLogic(stringB, stringA);
};
