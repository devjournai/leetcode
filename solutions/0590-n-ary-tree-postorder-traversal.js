/**
 * N Ary Tree Postorder Traversal
 * Intuition: Postorder is children then root. Two stacks: pop from `primaryStack` onto `auxiliaryStack` while pushing children left-to-right; then pop the auxiliary stack to reverse into children-then-root order.
 * Approach: 1. If `!root`, return []. 2. `primaryStack = [root]`. 3. While nonempty, pop `currentNode` onto `auxiliaryStack` and push all `children` onto primary. 4. Pop `auxiliaryStack` into `collectedValues` via `finalNode.val`. 5. Return the list.
 * Dry Run: root=1, children [3,2,4], 3 has [5,6].
 *   - Primary drains 1 then 3,2,4 then 5,6 onto auxiliary. Reverse pop → [5,6,3,2,4,1].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var postorder = function (root) {
  const collectedValues = [];

  if (!root) {
    return collectedValues;
  }

  const primaryStack = [root];
  const auxiliaryStack = [];

  while (primaryStack.length > 0) {
    const currentNode = primaryStack.pop();
    auxiliaryStack.push(currentNode);

    for (
      let childIndex = 0;
      childIndex < currentNode.children.length;
      childIndex++
    ) {
      primaryStack.push(currentNode.children[childIndex]);
    }
  }

  while (auxiliaryStack.length > 0) {
    const finalNode = auxiliaryStack.pop();
    collectedValues.push(finalNode.val);
  }

  return collectedValues;
};
