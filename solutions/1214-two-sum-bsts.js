/**
 * Two Sum Bsts
 * Intuition: Two-pointer on BST inorder (smallest from tree1, largest from tree2) finds a pair summing to target in linear time.
 * Approach: 1. Stack-descend left on tree1 and right on tree2. 2. Compare sum of current values. 3. Equal → true; too small → next inorder from tree1; too large → next reverse-inorder from tree2.
 * Dry Run: tree1={1,2,3}, tree2={4,5}, target=6. 1+5=6 → true.
 * Time Complexity: O(N1 + N2)
 * Space Complexity: O(H1 + H2)
 */
var twoSumBSTs = function (root1, root2, target) {
  const stackTreeOne = [];
  const stackTreeTwo = [];

  const populateLeftPath = (nodeArgument, stackParameter) => {
    let currentTraversalNode = nodeArgument;
    while (currentTraversalNode) {
      stackParameter.push(currentTraversalNode);
      currentTraversalNode = currentTraversalNode.left;
    }
  };

  const populateRightPath = (nodeArgumentTwo, stackParameterTwo) => {
    let currentTraversalNodeTwo = nodeArgumentTwo;
    while (currentTraversalNodeTwo) {
      stackParameterTwo.push(currentTraversalNodeTwo);
      currentTraversalNodeTwo = currentTraversalNodeTwo.right;
    }
  };

  populateLeftPath(root1, stackTreeOne);
  populateRightPath(root2, stackTreeTwo);

  let currentValOne = null;
  let currentValTwo = null;

  const retrieveNextSmallest = () => {
    if (stackTreeOne.length === 0) return null;
    const extractedNodeOne = stackTreeOne.pop();
    populateLeftPath(extractedNodeOne.right, stackTreeOne);
    return extractedNodeOne.val;
  };

  const retrieveNextLargest = () => {
    if (stackTreeTwo.length === 0) return null;
    const extractedNodeTwo = stackTreeTwo.pop();
    populateRightPath(extractedNodeTwo.left, stackTreeTwo);
    return extractedNodeTwo.val;
  };

  currentValOne = retrieveNextSmallest();
  currentValTwo = retrieveNextLargest();

  while (currentValOne !== null && currentValTwo !== null) {
    const sumOfValues = currentValOne + currentValTwo;

    if (sumOfValues === target) {
      return true;
    } else if (sumOfValues < target) {
      currentValOne = retrieveNextSmallest();
    } else {
      currentValTwo = retrieveNextLargest();
    }
  }

  return false;
};
