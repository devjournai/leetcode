/**
 * Smallest String Starting From Leaf
 * Intuition: DFS prepends letters (`unshift` of `val+97`) so the path is leaf-to-root. At a leaf, compare the joined string to `globalSmallestString`.
 * Approach: 1. `performDfs` adds the char, updates the min at leaves, recurses left/right, then `shift` to backtrack. 2. Start from `root` with []. 3. Return the min or "".
 * Dry Run: [0,1,2,3,4,3,4] letters a,b,c,... Leaf dba vs eba vs dca vs eca. Smallest "dba".
 * Time Complexity: O(N * H)
 * Space Complexity: O(H)
 */
var smallestFromLeaf = function (root) {
  let globalSmallestString = null;

  function performDfs(nodeBeingVisited, currentPathParts) {
    if (!nodeBeingVisited) {
      return;
    }

    const nodeCharValue = String.fromCharCode(nodeBeingVisited.val + 97);
    currentPathParts.unshift(nodeCharValue);

    if (!nodeBeingVisited.left && !nodeBeingVisited.right) {
      const candidateStringFromLeaf = currentPathParts.join("");
      if (
        globalSmallestString === null ||
        candidateStringFromLeaf < globalSmallestString
      ) {
        globalSmallestString = candidateStringFromLeaf;
      }
    }

    const leftNodeChild = nodeBeingVisited.left;
    performDfs(leftNodeChild, currentPathParts);

    const rightNodeChild = nodeBeingVisited.right;
    performDfs(rightNodeChild, currentPathParts);

    currentPathParts.shift();
  }

  performDfs(root, []);

  return globalSmallestString || "";
};
