/**
 * Closest Binary Search Tree Value II
 * Intuition: The k closest values sit immediately left and right of `target` in inorder. Two stacks hold predecessors (≤ target) and successors (> target); repeatedly pick the closer peek and walk that iterator one step.
 * Approach: 1. If no root or k=0, return []. 2. Walk rightward from nodes ≤ target to fill `previousValuesStack`; walk leftward from nodes > target to fill `nextValuesStack`. 3. `getNextPredecessor` pops and pushes that node’s left-then-right spine; successor pops and pushes right-then-left. 4. k times, take successor if pred stack empty, pred if succ empty, else the peek closer to target (pred on a tie). 5. Return the collected values.
 * Dry Run: tree 4 / 2 / 5 with 2’s children 1,3; target=3.2, k=2.
 *   - Pred stack tops at 3 (via 4 then 2 then 3); succ tops at 4. |3-3.2|<|4-3.2| so take 3, then take 4. Return [3, 4].
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
