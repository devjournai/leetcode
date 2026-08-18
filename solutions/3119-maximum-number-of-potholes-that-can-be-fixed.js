/**
 * Maximum Number Of Potholes That Can Be Fixed
 * Intuition: A contiguous run of `x` potholes costs `x + 1` to fully repair (one extra for the trailing patch). Prefer longer runs first because each run pays that overhead only once. If the leftover budget cannot finish a run, spend `budget - 1` of it on a partial repair of that run.
 * Approach: 1. Split the road on `.` and collect run lengths of `'x'`. 2. Sort lengths descending. 3. For each run, if `length > budget - 1`, add `max(0, budget - 1)` and stop. 4. Otherwise repair the whole run and subtract `length + 1` from the budget.
 * Dry Run:
 * Input: road = "..x.x.x..x", budget = 7
 * 1. Runs of length 1,1,1,1. Sorted same
 * 2. Each full repair costs 2. Three runs use 6, leftover 1 cannot start another (need 2). Answer: 3
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
var maxPotholes = function (road, budget) {
  const potholeRunLengths = road.split(".").map((segment) => segment.length);
  potholeRunLengths.sort((lengthA, lengthB) => lengthB - lengthA);

  let remainingBudget = budget;
  let repairedPotholes = 0;
  for (let runIndex = 0; runIndex < potholeRunLengths.length; runIndex++) {
    const runLength = potholeRunLengths[runIndex];
    if (runLength === 0) {
      continue;
    }
    const maxRepairableInRun = Math.max(0, remainingBudget - 1);
    if (runLength > maxRepairableInRun) {
      return repairedPotholes + maxRepairableInRun;
    }
    repairedPotholes += runLength;
    remainingBudget -= runLength + 1;
  }

  return repairedPotholes;
};
