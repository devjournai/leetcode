/**
 * Lowest Common Ancestor Of A Binary Tree II
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var lowestCommonAncestor = function (initialRoot, searchNodeP, searchNodeQ) {
  let hasFoundP = false;
  let hasFoundQ = false;

  const traverseAndFind = (currentTreeElement) => {
    if (!currentTreeElement) {
      return null;
    }

    let valueFromLeft = traverseAndFind(currentTreeElement.left);
    let valueFromRight = traverseAndFind(currentTreeElement.right);

    let isMatchForP = currentTreeElement === searchNodeP;
    let isMatchForQ = currentTreeElement === searchNodeQ;

    if (isMatchForP) {
      hasFoundP = true;
    }
    if (isMatchForQ) {
      hasFoundQ = true;
    }

    let returnedNode = null;

    if (valueFromLeft && valueFromRight) {
      returnedNode = currentTreeElement;
    } else if (isMatchForP || isMatchForQ) {
      returnedNode = currentTreeElement;
    } else {
      returnedNode = valueFromLeft || valueFromRight;
    }

    return returnedNode;
  };

  const potentialLcaNode = traverseAndFind(initialRoot);

  return hasFoundP && hasFoundQ ? potentialLcaNode : null;
};
