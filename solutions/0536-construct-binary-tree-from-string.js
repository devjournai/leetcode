/**
 * Construct Binary Tree From String
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
