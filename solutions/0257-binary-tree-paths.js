/**
 * Binary Tree Paths
 * Intuition: Every root-to-leaf path is a DFS trail of node values joined with `"->"`. Copy the path array at each step so sibling branches do not share mutations.
 * Approach: 1. DFS with `currentPathValues`. 2. Null → return. 3. Append this node’s string value. 4. If leaf, join with `'->'` and push. 5. Else recurse on existing children. Start from root with `[]`.
 * Dry Run: 1 with left 2 (right leaf 5) and right 3.
 *   - Paths built: ["1","2","5"] → "1->2->5"; ["1","3"] → "1->3". Return those two.
 * Time Complexity: O(N * H)
 * Space Complexity: O(N * H)
 */
var binaryTreePaths = function (rootNode) {
  const collectedPaths = [];

  const depthFirstSearch = (currentNode, currentPathValues) => {
    if (!currentNode) {
      return;
    }

    const valueToAppend = currentNode.val.toString();
    const nextPathSegment = [...currentPathValues, valueToAppend];

    if (!currentNode.left && !currentNode.right) {
      const fullPathString = nextPathSegment.join("->");
      collectedPaths.push(fullPathString);
    } else {
      if (currentNode.left) {
        depthFirstSearch(currentNode.left, nextPathSegment);
      }
      if (currentNode.right) {
        depthFirstSearch(currentNode.right, nextPathSegment);
      }
    }
  };

  depthFirstSearch(rootNode, []);
  return collectedPaths;
};
