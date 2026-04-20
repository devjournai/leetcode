/**
 * Break A Palindrome
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var breakPalindrome = function (originalPalindromicString) {
  const stringTotalLength = originalPalindromicString.length;

  if (stringTotalLength === 1) {
    return "";
  }

  const mutableCharArray = originalPalindromicString.split("");

  let traversalIndex = 0;
  const midpointExclusive = Math.floor(stringTotalLength / 2);

  let firstNonAIndex = -1;

  while (traversalIndex < midpointExclusive) {
    if (mutableCharArray[traversalIndex] !== "a") {
      firstNonAIndex = traversalIndex;
      break;
    }
    traversalIndex++;
  }

  if (firstNonAIndex !== -1) {
    mutableCharArray[firstNonAIndex] = "a";
  } else {
    const finalCharacterPosition = stringTotalLength - 1;
    mutableCharArray[finalCharacterPosition] = "b";
  }

  return mutableCharArray.join("");
};
