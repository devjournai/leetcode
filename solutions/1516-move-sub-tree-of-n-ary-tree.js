/**
 * Move Sub Tree Of N Ary Tree
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
      checkDescendant(childNodeValue, potentialChild),
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
      (childToRemoveQ) => childToRemoveQ !== q,
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
      (anotherChildToRemoveP) => anotherChildToRemoveP !== p,
    );
    q.children.push(p);
  }

  return finalRoot;
};
