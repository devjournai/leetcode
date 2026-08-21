/**
 * Verify Preorder Serialization Of A Binary Tree
 * Intuition: A binary tree preorder uses one slot per node. A value consumes a slot and opens two child slots; '#' consumes a slot and opens none. The serialization is valid iff slots never hit 0 mid-stream and finish at 0.
 * Approach: 1. Split preorder on commas; start treeCapacity = 1. 2. For each token, if capacity is already 0 return false, then decrement. 3. If the token is not '#', add 2. 4. Return whether capacity is 0 at the end.
 * Dry Run: preorder = "9,3,4,#,#,1,#,#,2,#,6,#,#".
 *   - Each non-# spends 1 and adds 2; each # spends 1. Capacity stays positive until the last #.
 *   - Ends at 0 → true.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var isValidSerialization = function (preorder) {
  const tokenParts = preorder.split(",");
  let treeCapacity = 1;

  for (
    let traversalIndex = 0;
    traversalIndex < tokenParts.length;
    traversalIndex++
  ) {
    const currentElement = tokenParts[traversalIndex];
    if (treeCapacity === 0) {
      return false;
    }

    treeCapacity--;

    if (currentElement !== "#") {
      treeCapacity += 2;
    }
  }
  return treeCapacity === 0;
};
