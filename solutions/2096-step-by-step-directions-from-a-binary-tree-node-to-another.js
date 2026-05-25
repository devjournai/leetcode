/**
 * Step By Step Directions From A Binary Tree Node To Another
 * Intuition: The shortest path between any two nodes in a tree always involves going up to their Lowest Common Ancestor (LCA) and then down to the destination. By finding the path from the root to the start node and from the root to the destination node, the common prefix of these paths identifies the path from the root to the LCA.
 * Approach: 1. Implement a recursive Depth-First Search (DFS) helper function, `findPathToNode`, that traverses the tree from a given node towards a target value, recording the path of 'L' (left) or 'R' (right) steps in an array. This function returns `true` if the target is found in the current subtree, and `false` otherwise, backtracking by popping directions if a path doesn't lead to the target.
 * 2. Call `findPathToNode` from the `root` to determine the path from the root to `startValue`, storing it in `pathFromRootToStartNode`.
 * 3. Call `findPathToNode` from the `root` again to determine the path from the root to `destValue`, storing it in `pathFromRootToDestNode`.
 * 4. Identify the length of the common prefix between `pathFromRootToStartNode` and `pathFromRootToDestNode`. This length indicates how many steps both paths share from the root until they diverge at or above their LCA. A `for` loop is used for this comparison.
 * 5. The number of 'U' (up) moves required from `startValue` to reach the LCA is the length of `pathFromRootToStartNode` minus the common prefix length. Construct a string of 'U's.
 * 6. The remaining 'L' or 'R' moves from the LCA down to `destValue` are the suffix of `pathFromRootToDestNode` starting from the common prefix length. Extract this suffix and join its elements into a string.
 * 7. Concatenate the 'U' moves string and the 'L'/'R' moves string to form the final directions.
 * Dry Run: Root: [5,1,2,3,null,6,4], startValue: 3, destValue: 6
 * 1. `findPathToNode(5, 3, pathFromRootToStartNode)`:
 *    - Path for 3: `['L', 'L']` (5 -> 1 -> 3)
 *    - `pathFromRootToStartNode` becomes `['L', 'L']`.
 * 2. `findPathToNode(5, 6, pathFromRootToDestNode)`:
 *    - Path for 6: `['R', 'L']` (5 -> 2 -> 6)
 *    - `pathFromRootToDestNode` becomes `['R', 'L']`.
 * 3. Find common prefix:
 *    - `pathFromRootToStartNode`: `['L', 'L']`
 *    - `pathFromRootToDestNode`: `['R', 'L']`
 *    - `commonPathIndex` initialized to 0. `minPathLength` is 2.
 *    - Loop `currentIdx = 0`: `pathFromRootToStartNode[0]` ('L') `!==` `pathFromRootToDestNode[0]` ('R'). Break.
 *    - `commonPathIndex` remains 0.
 * 4. Calculate 'U' moves:
 *    - `upwardsDirectionCount = pathFromRootToStartNode.length - commonPathIndex = 2 - 0 = 2`.
 *    - `upwardsDirectionString = 'U'.repeat(2) = "UU"`.
 * 5. Calculate 'L'/'R' moves:
 *    - `downwardsDirectionSegment = pathFromRootToDestNode.slice(commonPathIndex).join('')`
 *    - `downwardsDirectionSegment = ['R', 'L'].slice(0).join('') = "RL"`.
 * 6. Return `upwardsDirectionString + downwardsDirectionSegment` which is `"UURL"`.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var getDirections = function (root, startValue, destValue) {
  const pathFromRootToStartNode = [];
  const pathFromRootToDestNode = [];

  function findPathToNode(currentNode, targetVal, currentPathArray) {
    if (!currentNode) {
      return false;
    }

    if (currentNode.val === targetVal) {
      return true;
    }

    currentPathArray.push("L");
    if (findPathToNode(currentNode.left, targetVal, currentPathArray)) {
      return true;
    }
    currentPathArray.pop();

    currentPathArray.push("R");
    if (findPathToNode(currentNode.right, targetVal, currentPathArray)) {
      return true;
    }
    currentPathArray.pop();

    return false;
  }

  findPathToNode(root, startValue, pathFromRootToStartNode);
  findPathToNode(root, destValue, pathFromRootToDestNode);

  let commonPathIndex = 0;
  const minPathLength = Math.min(
    pathFromRootToStartNode.length,
    pathFromRootToDestNode.length,
  );

  for (let currentIdx = 0; currentIdx < minPathLength; ++currentIdx) {
    if (
      pathFromRootToStartNode[currentIdx] === pathFromRootToDestNode[currentIdx]
    ) {
      commonPathIndex++;
    } else {
      break;
    }
  }

  const upwardsDirectionCount =
    pathFromRootToStartNode.length - commonPathIndex;
  const upwardsDirectionString = "U".repeat(upwardsDirectionCount);
  const downwardsDirectionSegment = pathFromRootToDestNode
    .slice(commonPathIndex)
    .join("");

  return upwardsDirectionString + downwardsDirectionSegment;
};
