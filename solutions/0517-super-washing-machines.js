/**
 * Super Washing Machines
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var findMinMoves = function (machines) {
  let totalDressesCount = machines.reduce(
    (currentSum, dressNumber) => currentSum + dressNumber,
    0,
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
      dressCountDifference,
    );
  }

  return maxMovesRequired;
};
