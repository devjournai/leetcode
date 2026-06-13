/**
 * Minimum Flips In Binary Tree To Get Result
 * Intuition: Use dynamic programming (bottom-up) to calculate the minimum flips required for each subtree to evaluate to true and false independently. Combine these results based on the parent node's boolean operation.
 * Approach: 1. Define a helper function, `determineFlips(currentNode)`, which recursively traverses the tree. This function returns a tuple `[minFlipsForTrue, minFlipsForFalse]` for the subtree rooted at `currentNode`.
 * 2. For leaf nodes (value 0 or 1): Base cases are straightforward. A leaf with value 0 needs 1 flip to become true, 0 flips to remain false. A leaf with value 1 needs 0 flips to remain true, 1 flip to become false.
 * 3. For a NOT node (value 5): Recursively call `determineFlips` on its single child. If the child's minimum flips to true is `C_T` and to false is `C_F`, then the NOT node's minimum flips to true is `C_F` (because NOT(false) is true) and to false is `C_T` (because NOT(true) is false).
 * 4. For binary operation nodes (OR: 2, AND: 3, XOR: 4): Recursively call `determineFlips` for both left and right children to get `[leftTrueCost, leftFalseCost]` and `[rightTrueCost, rightFalseCost]`.
 * 5. For OR (2):
 *    - To make OR evaluate to false: Both children must be false. Cost = `leftFalseCost + rightFalseCost`.
 *    - To make OR evaluate to true: At least one child must be true. Calculate costs for (true, true), (false, true), (true, false) and take the minimum.
 * 6. For AND (3):
 *    - To make AND evaluate to true: Both children must be true. Cost = `leftTrueCost + rightTrueCost`.
 *    - To make AND evaluate to false: At least one child must be false. Calculate costs for (true, false), (false, true), (false, false) and take the minimum.
 * 7. For XOR (4):
 *    - To make XOR evaluate to true: One child true, one child false. Calculate costs for (true, false) and (false, true) and take the minimum.
 *    - To make XOR evaluate to false: Both children true, or both children false. Calculate costs for (true, true) and (false, false) and take the minimum.
 * 8. The initial call to `determineFlips(root)` will return the final `[minFlipsForTrue, minFlipsForFalse]` for the entire tree. Based on the desired `result` boolean, return the appropriate flip count from this tuple.
 * Dry Run: Input: root = (OR:2), left = (0), right = (1), result = true
 * 1. Call `minimumFlips((OR:2), true)`
 * 2. `determineFlips((OR:2))` is called.
 *    a. `determineFlips((0))` is called. `currentNodeValue` is 0. Returns `[1, 0]` (`costTrueLeafZero`, `costFalseLeafZero`). This is `leftBranchFlips`.
 *    b. `determineFlips((1))` is called. `currentNodeValue` is 1. Returns `[0, 1]` (`costTrueLeafOne`, `costFalseLeafOne`). This is `rightBranchFlips`.
 *    c. Back in `determineFlips((OR:2))`:
 *       `leftTruePathCost = 1`, `leftFalsePathCost = 0`
 *       `rightTruePathCost = 0`, `rightFalsePathCost = 1`
 *       `currentNodeValue` is 2 (OR).
 *       `orFalseResultCost = leftFalsePathCost + rightFalsePathCost = 0 + 1 = 1`
 *       `orTrueOptionOne = leftTruePathCost + rightTruePathCost = 1 + 0 = 1`
 *       `orTrueOptionTwo = leftFalsePathCost + rightTruePathCost = 0 + 0 = 0`
 *       `orTrueOptionThree = leftTruePathCost + rightFalsePathCost = 1 + 1 = 2`
 *       `orTrueResultCost = Math.min(1, 0, 2) = 0`
 *       Returns `[0, 1]` (`orTrueResultCost`, `orFalseResultCost`). This is `finalCostsTuple`.
 * 3. Back in `minimumFlips`:
 *    `minTrueFlips = 0`, `minFalseFlips = 1`.
 *    `resultBoolean` is `true`.
 *    Returns `minTrueFlips`, which is `0`.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var minimumFlips = function (root, result) {
  function determineFlips(currentNode) {
    const currentNodeValue = currentNode.val;

    if (currentNodeValue === 0) {
      const costTrueLeafZero = 1;
      const costFalseLeafZero = 0;
      return [costTrueLeafZero, costFalseLeafZero];
    }

    if (currentNodeValue === 1) {
      const costTrueLeafOne = 0;
      const costFalseLeafOne = 1;
      return [costTrueLeafOne, costFalseLeafOne];
    }

    if (currentNodeValue === 5) {
      const notChildNode = currentNode.left || currentNode.right;
      const notChildFlipsTuple = determineFlips(notChildNode);
      const notChildTrueCost = notChildFlipsTuple[0];
      const notChildFalseCost = notChildFlipsTuple[1];
      return [notChildFalseCost, notChildTrueCost];
    }

    const leftBranchFlips = determineFlips(currentNode.left);
    const rightBranchFlips = determineFlips(currentNode.right);

    const leftTruePathCost = leftBranchFlips[0];
    const leftFalsePathCost = leftBranchFlips[1];
    const rightTruePathCost = rightBranchFlips[0];
    const rightFalsePathCost = rightBranchFlips[1];

    if (currentNodeValue === 2) {
      const orFalseResultCost = leftFalsePathCost + rightFalsePathCost;
      const orTrueOptionOne = leftTruePathCost + rightTruePathCost;
      const orTrueOptionTwo = leftFalsePathCost + rightTruePathCost;
      const orTrueOptionThree = leftTruePathCost + rightFalsePathCost;
      const orTrueResultCost = Math.min(
        orTrueOptionOne,
        orTrueOptionTwo,
        orTrueOptionThree,
      );
      return [orTrueResultCost, orFalseResultCost];
    }

    if (currentNodeValue === 3) {
      const andTrueResultCost = leftTruePathCost + rightTruePathCost;
      const andFalseOptionOne = leftTruePathCost + rightFalsePathCost;
      const andFalseOptionTwo = leftFalsePathCost + rightTruePathCost;
      const andFalseOptionThree = leftFalsePathCost + rightFalsePathCost;
      const andFalseResultCost = Math.min(
        andFalseOptionOne,
        andFalseOptionTwo,
        andFalseOptionThree,
      );
      return [andTrueResultCost, andFalseResultCost];
    }

    if (currentNodeValue === 4) {
      const xorTrueOptionA = leftFalsePathCost + rightTruePathCost;
      const xorTrueOptionB = leftTruePathCost + rightFalsePathCost;
      const xorTrueResultCost = Math.min(xorTrueOptionA, xorTrueOptionB);
      const xorFalseOptionA = leftTruePathCost + rightTruePathCost;
      const xorFalseOptionB = leftFalsePathCost + rightFalsePathCost;
      const xorFalseResultCost = Math.min(xorFalseOptionA, xorFalseOptionB);
      return [xorTrueResultCost, xorFalseResultCost];
    }
  }

  const finalCostsTuple = determineFlips(root);
  const minTrueFlips = finalCostsTuple[0];
  const minFalseFlips = finalCostsTuple[1];
  const resultBoolean = result;

  return resultBoolean ? minTrueFlips : minFalseFlips;
};
