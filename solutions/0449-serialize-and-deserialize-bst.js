/**
 * Serialize And Deserialize Bst
 * Intuition: Preorder values plus BST bounds uniquely place each next number as left or right, so nulls are not stored.
 * Approach: 1. `serialize`: preorder push values, join with commas; empty → `''`. 2. `deserialize`: split to numbers. 3. `treeBuilder` peeks `currentValues[0]`; if outside `[minimumBound, maximumBound]`, return null. 4. Shift, make `TreeNode`, recurse left with upper=val then right with lower=val.
 * Dry Run: 2 / 1,3 → "2,1,3". Builder takes 2, then 1 in (-∞,2), then 3 in (2,+∞).
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var serialize = function (root) {
  if (!root) {
    return "";
  }

  const outputCollection = [];

  function treeTraversal(nodeElement) {
    if (!nodeElement) {
      return;
    }
    outputCollection.push(nodeElement.val);
    treeTraversal(nodeElement.left);
    treeTraversal(nodeElement.right);
  }

  treeTraversal(root);
  return outputCollection.join(",");
};

var deserialize = function (data) {
  if (!data) {
    return null;
  }

  const numericalSegments = data.split(",").map(Number);

  function treeBuilder(currentValues, minimumBound, maximumBound) {
    if (currentValues.length === 0) {
      return null;
    }

    let candidateValue = currentValues[0];
    if (candidateValue < minimumBound || candidateValue > maximumBound) {
      return null;
    }

    let extractedValue = currentValues.shift();
    let treeNodeInstance = new TreeNode(extractedValue);

    treeNodeInstance.left = treeBuilder(
      currentValues,
      minimumBound,
      extractedValue
    );
    treeNodeInstance.right = treeBuilder(
      currentValues,
      extractedValue,
      maximumBound
    );

    return treeNodeInstance;
  }

  return treeBuilder(
    numericalSegments,
    Number.MIN_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER
  );
};
