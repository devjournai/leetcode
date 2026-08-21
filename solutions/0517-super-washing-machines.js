/**
 * Super Washing Machines
 * Intuition: Dresses can only move to adjacent machines, so the bottleneck is the max of (dresses a machine must give away) and (net flow that must pass any prefix).
 * Approach: 1. If total dresses are not divisible by n, return -1. 2. `target = total/n`. 3. Scan: `dressCountDifference = machines[i]-target`, add to `currentCumulativeBalance`, and take max of `|balance|` and the local surplus. 4. That max is `maxMovesRequired`.
 * Dry Run: machines = [1, 0, 5], target=2.
 *   - diffs -1,-2,+3. balances -1,-3,0. max(|bal|, surplus) = 3. Return 3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var findMinMoves = function (machines) {
  let totalDressesCount = machines.reduce(
    (currentSum, dressNumber) => currentSum + dressNumber,
    0
  );
  const numberOfMachines = machines.length;

  if (totalDressesCount % numberOfMachines !== 0) {
    return -1;
  }

  const targetDressesPerMachine = totalDressesCount / numberOfMachines;
  let maxMovesRequired = 0;
  let currentCumulativeBalance = 0;

  for (
    let machineIterator = 0;
    machineIterator < numberOfMachines;
    machineIterator++
  ) {
    const dressCountDifference =
      machines[machineIterator] - targetDressesPerMachine;
    currentCumulativeBalance += dressCountDifference;
    maxMovesRequired = Math.max(
      maxMovesRequired,
      Math.abs(currentCumulativeBalance),
      dressCountDifference
    );
  }

  return maxMovesRequired;
};
