/**
 * Construct Binary Tree From String
 * Intuition: The string is `value(left)(right)` with optional children. A recursive parser consumes the integer then optional parenthesized subtrees in order.
 * Approach: 1. `parseValue` reads an optional `-` and digits via `currentPointerIndex`. 2. `buildNode` creates a `TreeNode`, and if the next char is `'('`, skips it, builds left, skips `')'`; same for right. 3. Empty `s` is null.
 * Dry Run: s = "4(2)(3)".
 *   - Parse 4, first `( ` builds left 2, second `(` builds right 3. Tree 4 / 2 3.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var str2tree = function (s) {
  if (!s) {
    return null;
  }

  let currentPointerIndex = 0;

  const parseValue = () => {
    let isNegativeValue = false;
    if (s[currentPointerIndex] === "-") {
      isNegativeValue = true;
      currentPointerIndex++;
    }

    let extractedNumber = 0;
    while (
      currentPointerIndex < s.length &&
      s[currentPointerIndex] >= "0" &&
      s[currentPointerIndex] <= "9"
    ) {
      extractedNumber = extractedNumber * 10 + parseInt(s[currentPointerIndex]);
      currentPointerIndex++;
    }

    return isNegativeValue ? -extractedNumber : extractedNumber;
  };

  const buildNode = () => {
    if (currentPointerIndex >= s.length) {
      return null;
    }

    const nodeValue = parseValue();
    const currentNode = new TreeNode(nodeValue);

    if (currentPointerIndex < s.length && s[currentPointerIndex] === "(") {
      currentPointerIndex++;
      currentNode.left = buildNode();
      currentPointerIndex++;
    }

    if (currentPointerIndex < s.length && s[currentPointerIndex] === "(") {
      currentPointerIndex++;
      currentNode.right = buildNode();
      currentPointerIndex++;
    }

    return currentNode;
  };

  return buildNode();
};
