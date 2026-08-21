/**
 * House Robber III
 * Intuition: At each node the best loot is either this value plus both children skipped, or skip this node and take the better of rob/skip on each child. Return both options from a postorder DFS.
 * Approach: 1. Null returns [0, 0] as [robbed, notRobbed]. 2. Recurse left and right. 3. robbed = val + leftNot + rightNot; notRobbed = max(left pair) + max(right pair). 4. Answer is max of the root pair.
 * Dry Run: root = [3, 2, 3, null, 3, null, 1].
 *   - Leaves: rob 3 and rob 1. Root robbed = 3 + skip-children; skip-root takes both child maxes.
 *   - max is 7.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var rob = function (root) {
  function calculateRobberyOptions(currentNode) {
    if (!currentNode) {
      return [0, 0];
    }

    const leftSubtreeResult = calculateRobberyOptions(currentNode.left);
    const leftRobbedAmount = leftSubtreeResult[0];
    const leftNotRobbedAmount = leftSubtreeResult[1];

    const rightSubtreeResult = calculateRobberyOptions(currentNode.right);
    const rightRobbedAmount = rightSubtreeResult[0];
    const rightNotRobbedAmount = rightSubtreeResult[1];

    const moneyIfCurrentNodeRobbed =
      currentNode.val + leftNotRobbedAmount + rightNotRobbedAmount;

    const moneyIfCurrentNodeNotRobbed =
      Math.max(leftRobbedAmount, leftNotRobbedAmount) +
      Math.max(rightRobbedAmount, rightNotRobbedAmount);

    return [moneyIfCurrentNodeRobbed, moneyIfCurrentNodeNotRobbed];
  }

  const finalRobberyOutcome = calculateRobberyOptions(root);
  return Math.max(finalRobberyOutcome[0], finalRobberyOutcome[1]);
};
