/**
 * Remove Outermost Parentheses
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var removeOuterParentheses = function (s) {
  let collectedInnerStrings = [];
  let currentPrimitiveStartingIndex = 0;
  let openCloseBalance = 0;

  for (let stringCharIndex = 0; stringCharIndex < s.length; stringCharIndex++) {
    const currentSymbol = s[stringCharIndex];

    if (currentSymbol === "(") {
      openCloseBalance++;
    } else {
      openCloseBalance--;
    }

    if (openCloseBalance === 0) {
      const innerSegment = s.substring(
        currentPrimitiveStartingIndex + 1,
        stringCharIndex,
      );
      collectedInnerStrings.push(innerSegment);
      currentPrimitiveStartingIndex = stringCharIndex + 1;
    }
  }

  return collectedInnerStrings.join("");
};
