/**
 * Minimum Initial Energy to Finish Tasks
 * Intuition: To minimize the total initial energy, we should prioritize tasks that are "hardest" to start relative to their actual cost. This difficulty is captured by the difference between the minimum required energy and the actual energy spent (`minimum_i - actual_i`). Tasks with a larger positive difference imply a greater need to bridge an energy gap. By tackling these first, we potentially raise the initial energy requirement early, ensuring it covers subsequent, less demanding tasks without constant large upward adjustments.
 * Approach: 1. Sort the `tasks` array in descending order based on the difference `minimum_i - actual_i`. 2. Initialize `minimumTotalEnergyRequired` to 0 and `currentEnergyBalance` to 0. 3. Iterate through the sorted tasks: If `currentEnergyBalance` is less than the `minimumRequirement` for the current task, calculate the `energyDeficiency`. Add this `energyDeficiency` to `minimumTotalEnergyRequired` and conceptually 'recharge' `currentEnergyBalance` by adding the `energyDeficiency` to it. 4. Subtract the `actualCost` of the current task from `currentEnergyBalance`. 5. Return `minimumTotalEnergyRequired`.
 * Dry Run: tasks = [[1,2],[2,3]]
        1. Sort tasks:
           - For [1,2]: 2 - 1 = 1
           - For [2,3]: 3 - 2 = 1
           Sorted order (for equal differences, original order or reversed doesn't change outcome): [[1,2],[2,3]]
        2. Initialize `minimumTotalEnergyRequired = 0`, `currentEnergyBalance = 0`.
        3. Iterate:
           a. Task [1,2] (actualCost = 1, minimumRequirement = 2):
              - `currentEnergyBalance` (0) < `minimumRequirement` (2)? Yes.
              - `energyDeficiency = 2 - 0 = 2`.
              - `minimumTotalEnergyRequired = 0 + 2 = 2`.
              - `currentEnergyBalance = 0 + 2 = 2`.
              - `currentEnergyBalance = 2 - actualCost (1) = 1`.
              (State: `minimumTotalEnergyRequired = 2`, `currentEnergyBalance = 1`)
           b. Task [2,3] (actualCost = 2, minimumRequirement = 3):
              - `currentEnergyBalance` (1) < `minimumRequirement` (3)? Yes.
              - `energyDeficiency = 3 - 1 = 2`.
              - `minimumTotalEnergyRequired = 2 + 2 = 4`.
              - `currentEnergyBalance = 1 + 2 = 3`.
              - `currentEnergyBalance = 3 - actualCost (2) = 1`.
              (State: `minimumTotalEnergyRequired = 4`, `currentEnergyBalance = 1`)
        4. Loop ends.
        5. Return `minimumTotalEnergyRequired` (4).
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
*/
var minimumEffort = function (tasks) {
  tasks.sort((taskOne, taskTwo) => {
    const diffOne = taskOne[1] - taskOne[0];
    const diffTwo = taskTwo[1] - taskTwo[0];
    return diffTwo - diffOne;
  });

  let minimumTotalEnergyRequired = 0;
  let currentEnergyBalance = 0;

  for (const individualTask of tasks) {
    const taskActualCost = individualTask[0];
    const taskMinimumRequirement = individualTask[1];

    if (currentEnergyBalance < taskMinimumRequirement) {
      const energyDeficiency = taskMinimumRequirement - currentEnergyBalance;
      minimumTotalEnergyRequired += energyDeficiency;
      currentEnergyBalance += energyDeficiency;
    }
    currentEnergyBalance -= taskActualCost;
  }

  return minimumTotalEnergyRequired;
};
