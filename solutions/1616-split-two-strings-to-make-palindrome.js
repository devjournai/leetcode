/**
 * Split Two Strings To Make Palindrome
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
      checkEndIdx,
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
      rightPointer,
    );
    let isPalinSecondSegment = isPalindromeHelper(
      secondStringParam,
      leftPointer,
      rightPointer,
    );

    return isPalinFirstSegment || isPalinSecondSegment;
  };

  return checkPairLogic(stringA, stringB) || checkPairLogic(stringB, stringA);
};
