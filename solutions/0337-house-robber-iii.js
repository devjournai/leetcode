/**
 * House Robber III
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
