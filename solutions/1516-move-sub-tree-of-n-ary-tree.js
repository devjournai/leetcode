/**
 * Move Sub Tree Of N Ary Tree
 * Intuition: Detach p from its parent and hang it under q unless p is already q's child. If q sits inside p's subtree, lift q out first so the tree stays valid.
 * Approach: 1. If q already has p, return. 2. Find parent of p. 3. If q is a descendant of p, unlink q, attach p under q, and replace p with q in p's parent (or make q the new root). 4. Else unlink p and append under q.
 * Dry Run: root=1 children 2,3; p=2, q=3 (not nested).
 *   - Remove 2 from 1, push under 3 → 1→3→2.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var moveSubTree = function (root, p, q) {
  function obtainParent(startPoint, seekTarget) {
    if (!startPoint) return null;

    let childIterator = 0;
    while (childIterator < startPoint.children.length) {
      const currentChildElement = startPoint.children[childIterator];
      if (currentChildElement === seekTarget) {
        return startPoint;
      }
      const resultParent = obtainParent(currentChildElement, seekTarget);
      if (resultParent) {
        return resultParent;
      }
      childIterator++;
    }
    return null;
  }

  function checkDescendant(potentialAncestor, potentialChild) {
    if (potentialAncestor === potentialChild) {
      return true;
    }
    if (!potentialAncestor) {
      return false;
    }
    return potentialAncestor.children.some((childNodeValue) =>
      checkDescendant(childNodeValue, potentialChild)
    );
  }

  const isPDirectChildOfQ = q.children.includes(p);
  if (isPDirectChildOfQ) {
    return root;
  }

  const parentOfP = obtainParent(root, p);
  const isQInPDescendantTree = checkDescendant(p, q);

  let finalRoot = root;

  if (isQInPDescendantTree) {
    const parentOfQ = obtainParent(root, q);
    parentOfQ.children = parentOfQ.children.filter(
      (childToRemoveQ) => childToRemoveQ !== q
    );
    q.children.push(p);

    if (!parentOfP) {
      finalRoot = q;
    } else {
      const pIndexInParent = parentOfP.children.indexOf(p);
      if (pIndexInParent !== -1) {
        parentOfP.children[pIndexInParent] = q;
      }
    }
  } else {
    parentOfP.children = parentOfP.children.filter(
      (anotherChildToRemoveP) => anotherChildToRemoveP !== p
    );
    q.children.push(p);
  }

  return finalRoot;
};
