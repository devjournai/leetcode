/**
 * N Ary Tree Preorder Traversal
 * Intuition: Preorder is root then children left-to-right. An explicit stack pops a node, records `val`, then pushes children from right to left so the leftmost child is processed next.
 * Approach: 1. If `root === null`, return []. 2. `processStack = [root]`. 3. Pop `currentVisitingNode`, push `val` to `collectedValues`. 4. Loop `childIndex` from `children.length-1` down to 0 and push each `currentChildNode`. 5. Return `collectedValues`.
 * Dry Run: root=1, children [3,2,4], 3 has [5,6].
 *   - Pop 1 → [1], push 4,2,3. Pop 3 → [1,3], push 6,5. Pop 5,6,2,4 → [1,3,5,6,2,4].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var preorder = function (root) {
  const collectedValues = [];

  if (root === null) {
    return collectedValues;
  }

  const processStack = [root];

  while (processStack.length > 0) {
    const currentVisitingNode = processStack.pop();
    collectedValues.push(currentVisitingNode.val);

    for (
      let childIndex = currentVisitingNode.children.length - 1;
      childIndex >= 0;
      childIndex--
    ) {
      const currentChildNode = currentVisitingNode.children[childIndex];
      processStack.push(currentChildNode);
    }
  }

  return collectedValues;
};
