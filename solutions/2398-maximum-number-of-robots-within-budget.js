/**
 * Maximum Number Of Robots Within Budget
 * Intuition: This problem asks for the maximum length of a consecutive subarray (window) that satisfies a given cost constraint. This is a classic sliding window problem. To efficiently calculate the maximum charge time within the current window and the sum of running costs, we can use a monotonic decreasing deque for charge times and a running sum variable for costs.
 * Approach:
 * 1. Initialize `maximumRobotCountValue` to 0, `windowStartingIndex` to 0, `currentTotalRunningCost` to 0, and a deque `monotonicChargeIndices` to store indices of `chargeTimes` in decreasing order of their values.
 * 2. Iterate `windowEndingIndex` from 0 to `n-1` to expand the sliding window.
 * 3. Inside the loop, add `runningCosts[windowEndingIndex]` to `currentTotalRunningCost`.
 * 4. Maintain `monotonicChargeIndices`: Remove indices from the back of the deque if their corresponding `chargeTimes` value is less than or equal to `chargeTimes[windowEndingIndex]`. Then, add `windowEndingIndex` to the back of the deque. This ensures the front of the deque always holds the index of the maximum `chargeTime` in the current window.
 * 5. Calculate the current maximum charge time (`maxChargeCurrentWindow`) from the front of `monotonicChargeIndices` and the current window length (`currentWindowSizeValue`).
 * 6. Calculate the `totalWindowCostComputed` using `maxChargeCurrentWindow + currentWindowSizeValue * currentTotalRunningCost`.
 * 7. While `totalWindowCostComputed` exceeds `budget`, shrink the window from the left:
 *    a. Subtract `runningCosts[windowStartingIndex]` from `currentTotalRunningCost`.
 *    b. If `windowStartingIndex` is the index at the front of `monotonicChargeIndices`, remove it from the front.
 *    c. Increment `windowStartingIndex`.
 *    d. Recalculate `currentWindowSizeValue`.
 *    e. If `monotonicChargeIndices` is not empty, `maxChargeCurrentWindow` is updated from the new front of the deque; otherwise, set `maxChargeCurrentWindow` to 0 (effectively making the window cost 0 or invalid if it becomes empty).
 *    f. Recalculate `totalWindowCostComputed`.
 * 8. After shrinking (or if the window was already valid), update `maximumRobotCountValue` with the maximum of its current value and `windowEndingIndex - windowStartingIndex + 1`.
 * 9. After the loop, return `maximumRobotCountValue`.
 * Dry Run:
 * chargeTimes = [3,6,1,3,4], runningCosts = [2,1,3,4,5], budget = 25
 * numberOfElements = 5
 * initial: maximumRobotCountValue = 0, windowStartingIndex = 0, currentTotalRunningCost = 0, monotonicChargeIndices = []
 *
 * windowEndingIndex = 0 (chargeTimes[0]=3, runningCosts[0]=2):
 *   currentTotalRunningCost = 2
 *   monotonicChargeIndices = [0]
 *   maxChargeCurrentWindow = chargeTimes[0] = 3
 *   currentWindowSizeValue = 1
 *   totalWindowCostComputed = 3 + 1 * 2 = 5
 *   5 <= 25 (valid). maximumRobotCountValue = max(0, 1) = 1
 *
 * windowEndingIndex = 1 (chargeTimes[1]=6, runningCosts[1]=1):
 *   currentTotalRunningCost = 2 + 1 = 3
 *   monotonicChargeIndices: pop 0 (3 <= 6), push 1 -> [1]
 *   maxChargeCurrentWindow = chargeTimes[1] = 6
 *   currentWindowSizeValue = 2
 *   totalWindowCostComputed = 6 + 2 * 3 = 12
 *   12 <= 25 (valid). maximumRobotCountValue = max(1, 2) = 2
 *
 * windowEndingIndex = 2 (chargeTimes[2]=1, runningCosts[2]=3):
 *   currentTotalRunningCost = 3 + 3 = 6
 *   monotonicChargeIndices: push 2 -> [1, 2] (1 (6) > 2 (1), so 1 stays)
 *   maxChargeCurrentWindow = chargeTimes[1] = 6
 *   currentWindowSizeValue = 3
 *   totalWindowCostComputed = 6 + 3 * 6 = 24
 *   24 <= 25 (valid). maximumRobotCountValue = max(2, 3) = 3
 *
 * windowEndingIndex = 3 (chargeTimes[3]=3, runningCosts[3]=4):
 *   currentTotalRunningCost = 6 + 4 = 10
 *   monotonicChargeIndices: pop 2 (1 <= 3), push 3 -> [1, 3]
 *   maxChargeCurrentWindow = chargeTimes[1] = 6
 *   currentWindowSizeValue = 4
 *   totalWindowCostComputed = 6 + 4 * 10 = 46
 *   46 > 25 (invalid). Shrink window:
 *     currentTotalRunningCost = 10 - runningCosts[0] = 10 - 2 = 8
 *     windowStartingIndex (0) != monotonicChargeIndices[0] (1).
 *     windowStartingIndex = 1
 *     currentWindowSizeValue = 3
 *     maxChargeCurrentWindow = chargeTimes[1] = 6
 *     totalWindowCostComputed = 6 + 3 * 8 = 30
 *     30 > 25 (invalid). Shrink again:
 *       currentTotalRunningCost = 8 - runningCosts[1] = 8 - 1 = 7
 *       windowStartingIndex (1) == monotonicChargeIndices[0] (1). Pop from deque -> [3]
 *       windowStartingIndex = 2
 *       currentWindowSizeValue = 2
 *       maxChargeCurrentWindow = chargeTimes[3] = 3
 *       totalWindowCostComputed = 3 + 2 * 7 = 17
 *       17 <= 25 (valid). Exit shrink loop.
 *   maximumRobotCountValue = max(3, 2) = 3
 *
 * windowEndingIndex = 4 (chargeTimes[4]=5, runningCosts[4]=5):
 *   currentTotalRunningCost = 7 + 5 = 12
 *   monotonicChargeIndices: pop 3 (3 <= 5), push 4 -> [4]
 *   maxChargeCurrentWindow = chargeTimes[4] = 5
 *   currentWindowSizeValue = 3
 *   totalWindowCostComputed = 5 + 3 * 12 = 41
 *   41 > 25 (invalid). Shrink window:
 *     currentTotalRunningCost = 12 - runningCosts[2] = 12 - 3 = 9
 *     windowStartingIndex (2) != monotonicChargeIndices[0] (4).
 *     windowStartingIndex = 3
 *     currentWindowSizeValue = 2
 *     maxChargeCurrentWindow = chargeTimes[4] = 5
 *     totalWindowCostComputed = 5 + 2 * 9 = 23
 *     23 <= 25 (valid). Exit shrink loop.
 *   maximumRobotCountValue = max(3, 2) = 3
 *
 * End of loop. Return maximumRobotCountValue = 3.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maximumRobots = function (chargeTimes, runningCosts, budget) {
  const numberOfElements = chargeTimes.length;
  let maximumRobotCountValue = 0;
  let windowStartingIndex = 0;
  let currentTotalRunningCost = 0;
  const monotonicChargeIndices = [];

  for (
    let windowEndingIndex = 0;
    windowEndingIndex < numberOfElements;
    windowEndingIndex++
  ) {
    currentTotalRunningCost += runningCosts[windowEndingIndex];

    while (
      monotonicChargeIndices.length > 0 &&
      chargeTimes[monotonicChargeIndices[monotonicChargeIndices.length - 1]] <=
        chargeTimes[windowEndingIndex]
    ) {
      monotonicChargeIndices.pop();
    }
    monotonicChargeIndices.push(windowEndingIndex);

    let maxChargeCurrentWindow = chargeTimes[monotonicChargeIndices[0]];
    let currentWindowSizeValue = windowEndingIndex - windowStartingIndex + 1;
    let totalWindowCostComputed =
      maxChargeCurrentWindow + currentWindowSizeValue * currentTotalRunningCost;

    while (totalWindowCostComputed > budget) {
      currentTotalRunningCost -= runningCosts[windowStartingIndex];
      if (monotonicChargeIndices[0] === windowStartingIndex) {
        monotonicChargeIndices.shift();
      }
      windowStartingIndex++;

      currentWindowSizeValue = windowEndingIndex - windowStartingIndex + 1;
      if (monotonicChargeIndices.length > 0) {
        maxChargeCurrentWindow = chargeTimes[monotonicChargeIndices[0]];
      } else {
        maxChargeCurrentWindow = 0;
      }

      totalWindowCostComputed =
        maxChargeCurrentWindow +
        currentWindowSizeValue * currentTotalRunningCost;
    }

    maximumRobotCountValue = Math.max(
      maximumRobotCountValue,
      windowEndingIndex - windowStartingIndex + 1
    );
  }

  return maximumRobotCountValue;
};
