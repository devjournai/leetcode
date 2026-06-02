/**
 * Create Binary Tree From Descriptions
 * Intuition: The root node of a binary tree is the only node that appears as a parent but never as a child. By tracking all nodes and identifying which ones are children, we can find the unique root.
 * Approach: 1. Initialize a Map (e.g., `treeNodesRegistry`) to store `TreeNode` objects, keyed by their integer value, allowing efficient retrieval. 2. Initialize a Set (e.g., `childValuesSet`) to store all integer values that appear as children. 3. Iterate through each description: For each parent and child value, ensure a `TreeNode` exists in `treeNodesRegistry` (creating if not), and add the child value to `childValuesSet`. Then, establish the `left` or `right` child link from the parent `TreeNode` to the child `TreeNode` based on the `isLeft` flag. 4. After processing all descriptions, iterate through the keys (node values) in `treeNodesRegistry`. The first node value encountered that is NOT present in `childValuesSet` is the root's value. Return the corresponding `TreeNode` from `treeNodesRegistry`.
 * Dry Run: descriptions = [[20,15,1],[20,17,0],[50,20,1],[50,80,0],[80,19,1]]
 * Initial: `treeNodesRegistry = Map()`, `childValuesSet = Set()`
 * 1. Process [20,15,1]: `treeNodesRegistry` gets `TreeNode(20)` and `TreeNode(15)`. `TreeNode(20).left = TreeNode(15)`. `childValuesSet` gets `15`.
 * 2. Process [20,17,0]: `treeNodesRegistry` gets `TreeNode(17)`. `TreeNode(20).right = TreeNode(17)`. `childValuesSet` gets `17`.
 * 3. Process [50,20,1]: `treeNodesRegistry` gets `TreeNode(50)`. `TreeNode(50).left = TreeNode(20)`. `childValuesSet` gets `20`.
 * 4. Process [50,80,0]: `treeNodesRegistry` gets `TreeNode(80)`. `TreeNode(50).right = TreeNode(80)`. `childValuesSet` gets `80`.
 * 5. Process [80,19,1]: `treeNodesRegistry` gets `TreeNode(19)`. `TreeNode(80).left = TreeNode(19)`. `childValuesSet` gets `19`.
 * Final states: `treeNodesRegistry` contains TreeNodes for 15, 17, 19, 20, 50, 80 with correct links. `childValuesSet = {15, 17, 19, 20, 80}`.
 * Finding root: Iterate `treeNodesRegistry` keys.
 * - Check 20: `childValuesSet.has(20)` is true.
 * - Check 15: `childValuesSet.has(15)` is true.
 * - Check 17: `childValuesSet.has(17)` is true.
 * - Check 50: `childValuesSet.has(50)` is false. This is the root! Return `treeNodesRegistry.get(50)`.
 * Time Complexity: O(D + N)
 * Space Complexity: O(N)
 */
var createBinaryTree = function (descriptions) {
  const treeNodesRegistry = new Map();
  const childValuesSet = new Set();

  for (const singleDescription of descriptions) {
    const currentParentValue = singleDescription[0];
    const currentChildValue = singleDescription[1];
    const isCurrentLeft = singleDescription[2];

    if (!treeNodesRegistry.has(currentParentValue)) {
      treeNodesRegistry.set(
        currentParentValue,
        new TreeNode(currentParentValue),
      );
    }
    if (!treeNodesRegistry.has(currentChildValue)) {
      treeNodesRegistry.set(currentChildValue, new TreeNode(currentChildValue));
    }

    childValuesSet.add(currentChildValue);

    const parentObject = treeNodesRegistry.get(currentParentValue);
    const childObject = treeNodesRegistry.get(currentChildValue);

    if (isCurrentLeft === 1) {
      parentObject.left = childObject;
    } else {
      parentObject.right = childObject;
    }
  }

  for (const nodeIdentifier of treeNodesRegistry.keys()) {
    if (!childValuesSet.has(nodeIdentifier)) {
      return treeNodesRegistry.get(nodeIdentifier);
    }
  }

  return null;
};
