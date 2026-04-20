/**
 * Closest Binary Search Tree Value II
 * Time Complexity: O(H + k)
 * Space Complexity: O(H + k)
 */
var closestKValues = function (root, target, k) {
  const closestElements = [];
  if (!root || k === 0) {
    return closestElements;
  }

  const previousValuesStack = [];
  let currentSearchNodeP = root;
  while (currentSearchNodeP) {
    if (currentSearchNodeP.val <= target) {
      previousValuesStack.push(currentSearchNodeP);
      currentSearchNodeP = currentSearchNodeP.right;
    } else {
      currentSearchNodeP = currentSearchNodeP.left;
    }
  }

  const nextValuesStack = [];
  let currentSearchNodeS = root;
  while (currentSearchNodeS) {
    if (currentSearchNodeS.val > target) {
      nextValuesStack.push(currentSearchNodeS);
      currentSearchNodeS = currentSearchNodeS.left;
    } else {
      currentSearchNodeS = currentSearchNodeS.right;
    }
  }

  const getNextPredecessor = () => {
    let poppedNodeP = previousValuesStack.pop();
    let valFromPrevious = poppedNodeP.val;
    let nextPushedNode = poppedNodeP.left;
    while (nextPushedNode) {
      previousValuesStack.push(nextPushedNode);
      nextPushedNode = nextPushedNode.right;
    }
    return valFromPrevious;
  };

  const getNextSuccessor = () => {
    let poppedNodeS = nextValuesStack.pop();
    let valFromSuccessor = poppedNodeS.val;
    let nextPushedNodeS = poppedNodeS.right;
    while (nextPushedNodeS) {
      nextValuesStack.push(nextPushedNodeS);
      nextPushedNodeS = nextPushedNodeS.left;
    }
    return valFromSuccessor;
  };

  let countCollected = 0;
  while (countCollected < k) {
    if (previousValuesStack.length === 0) {
      closestElements.push(getNextSuccessor());
    } else if (nextValuesStack.length === 0) {
      closestElements.push(getNextPredecessor());
    } else {
      let valPredecessor =
        previousValuesStack[previousValuesStack.length - 1].val;
      let valSuccessor = nextValuesStack[nextValuesStack.length - 1].val;

      let distancePredecessor = Math.abs(valPredecessor - target);
      let distanceSuccessor = Math.abs(valSuccessor - target);

      if (distancePredecessor <= distanceSuccessor) {
        closestElements.push(getNextPredecessor());
      } else {
        closestElements.push(getNextSuccessor());
      }
    }
    countCollected++;
  }

  return closestElements;
};
