/**
 * Minimum Time to Break Locks II
 * Intuition: Energy on turn `t` (1-indexed) is `t`, so breaking lock `j` on that turn costs `ceil(strength[j] / t)`. Assigning turns to locks is a minimum-cost bipartite matching (Hungarian algorithm).
 * Approach: 1. Build cost matrix `costs[turn][lock] = ceil(strength[lock] / (turn+1))`. 2. Run Hungarian assignment. 3. Return the min cost of assigning all n turns.
 * Dry Run: strength = [3, 4, 1].
 *   - Turn 1 costs: ceil(3/1)=3, 4, 1. Turn 2: 2, 2, 1. Turn 3: 1, 2, 1.
 *   - Optimal matching cost is 5 (e.g. lock 1 on turn 1, lock 3 on turn 2, lock 4 on turn 3: 1+1+2 wait sample typically 4 or 5).
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^2)
 */

var findMinimumTime = function (strength) {
  const lockCount = strength.length;
  const assignmentCosts = [];
  for (let turnEnergy = 1; turnEnergy <= lockCount; turnEnergy++) {
    const costsForTurn = [];
    for (const lockStrength of strength) {
      costsForTurn.push(
        Math.floor((lockStrength + turnEnergy - 1) / turnEnergy)
      );
    }
    assignmentCosts.push(costsForTurn);
  }
  return hungarian(assignmentCosts)[lockCount - 1];
};

function hungarian(costs) {
  const numLocks = costs.length;
  const turnPotentials = new Array(numLocks).fill(0);
  const lockPotentials = new Array(numLocks + 1).fill(0);
  const lockAssignments = new Array(numLocks + 1).fill(-1);
  const minCostsByTurn = [];

  for (let currentTurn = 0; currentTurn < numLocks; currentTurn++) {
    let currentLock = numLocks;
    lockAssignments[currentLock] = currentTurn;
    const minReducedCosts = new Array(numLocks + 1).fill(Infinity);
    const previousLockAssignments = new Array(numLocks + 1).fill(-1);
    const locksInOptimalPath = new Array(numLocks + 1).fill(false);

    while (lockAssignments[currentLock] !== -1) {
      locksInOptimalPath[currentLock] = true;
      const assignedTurn = lockAssignments[currentLock];
      let minCostDelta = Infinity;
      let nextLock = -1;

      for (let lock = 0; lock < numLocks; lock++) {
        if (!locksInOptimalPath[lock]) {
          const reducedCost =
            costs[assignedTurn][lock] -
            turnPotentials[assignedTurn] -
            lockPotentials[lock];
          if (reducedCost < minReducedCosts[lock]) {
            minReducedCosts[lock] = reducedCost;
            previousLockAssignments[lock] = currentLock;
          }
          if (minReducedCosts[lock] < minCostDelta) {
            minCostDelta = minReducedCosts[lock];
            nextLock = lock;
          }
        }
      }

      for (let lock = 0; lock <= numLocks; lock++) {
        if (locksInOptimalPath[lock]) {
          turnPotentials[lockAssignments[lock]] += minCostDelta;
          lockPotentials[lock] -= minCostDelta;
        } else {
          minReducedCosts[lock] -= minCostDelta;
        }
      }

      currentLock = nextLock;
    }

    while (currentLock !== numLocks) {
      const previousLock = previousLockAssignments[currentLock];
      lockAssignments[currentLock] = lockAssignments[previousLock];
      currentLock = previousLock;
    }

    minCostsByTurn.push(-lockPotentials[numLocks]);
  }

  return minCostsByTurn;
}
