/**
 * Lowest Common Ancestor Of A Binary Tree II
 * Intuition: Classic postorder LCA, but p or q might be missing. Recurse fully, flag when each node is seen, and return the candidate only if both flags are true.
 * Approach: 1. Postorder: search left and right. 2. Mark hasFoundP / hasFoundQ if the current node is p or q. 3. If both subtrees return nodes, or the current node is p/q and a subtree found the other, current is the LCA candidate. 4. After the walk, return the candidate iff both nodes were found.
 * Dry Run: tree with p present and q absent → flags incomplete → null.
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
