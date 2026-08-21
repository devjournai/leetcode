/**
 * Remove Outermost Parentheses
 * Intuition: Each primitive VPS is a balanced span that returns to depth 0. Drop the matching outer pair of that span.
 * Approach: 1. Track balance while scanning. 2. On '(', increment; on ')', decrement. 3. When balance hits 0, take substring (start+1, i) and advance start. 4. Join the inner pieces.
 * Dry Run: s = "(()())(())".
 *   - First primitive (()()) contributes ()(). Second (()) contributes (). Result "()()()".
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
        stringCharIndex
      );
      collectedInnerStrings.push(innerSegment);
      currentPrimitiveStartingIndex = stringCharIndex + 1;
    }
  }

  return collectedInnerStrings.join("");
};
