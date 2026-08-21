/**
 * Minimum Number Of Work Sessions To Finish The Tasks
 * Intuition: The problem involves finding an optimal way to partition tasks into sessions, where the order doesn't matter and session time is limited. This is a classic characteristic of dynamic programming with bitmasking, where each bitmask represents a subset of tasks.
 * Approach: 1. Initialize a DP array, `dpArray`, where `dpArray[mask]` stores the minimum number of work sessions required to complete the tasks represented by the bitmask `mask`. Initialize `dpArray[0]` to 0 (no tasks, no sessions) and all other entries to a large value (`tasksCount + 1`).
 * 2. Precompute `sumOfTaskTimes`: Create an array `sumOfTaskTimes` where `sumOfTaskTimes[mask]` stores the total time of tasks represented by `mask`. This is done efficiently by iterating masks and using the lowest set bit to build sums from smaller masks.
 * 3. Iterate through all possible masks from `1` to `(1 << tasksCount) - 1`. For each `currentTaskSet`:
 *    a. First, consider the trivial case where all tasks in `currentTaskSet` can be completed in a single session. If `sumOfTaskTimes[currentTaskSet]` is less than or equal to `sessionMaxTime`, set `dpArray[currentTaskSet]` to `1`. This provides an initial upper bound.
 *    b. Then, iterate through all proper submasks (`subTaskSet`) of `currentTaskSet`. Each `subTaskSet` represents a set of tasks that could form the *last* work session.
 *    c. If `sumOfTaskTimes[subTaskSet]` is less than or equal to `sessionMaxTime`, it's a valid session. Update `dpArray[currentTaskSet]` by taking the minimum of its current value and `dpArray[currentTaskSet ^ subTaskSet] + 1` (sessions for remaining tasks plus the current session).
 * 4. The final answer is `dpArray[(1 << tasksCount) - 1]`, which corresponds to completing all tasks.
 * Dry Run: tasks = [1, 2, 3], sessionTime = 3
 * tasksCount = 3
 * dpArray = [0, 4, 4, 4, 4, 4, 4, 4] (initially [0, infinity, ...])
 * sumOfTaskTimes = [0, 1, 2, 3, 3, 4, 5, 6] (precomputed for masks 0 to 7)
 *
 * currentTaskSet = 1 (001): sumOfTaskTimes[1]=1 <= 3. dpArray[1] = 1.
 *   subTaskSet = 1: (skip)
 *   dpArray = [0, 1, 4, 4, 4, 4, 4, 4]
 * currentTaskSet = 2 (010): sumOfTaskTimes[2]=2 <= 3. dpArray[2] = 1.
 *   subTaskSet = 2: (skip)
 *   dpArray = [0, 1, 1, 4, 4, 4, 4, 4]
 * currentTaskSet = 3 (011): sumOfTaskTimes[3]=3 <= 3. dpArray[3] = 1.
 *   subTaskSet = 3: (skip)
 *   subTaskSet = 2 (010): sumOfTaskTimes[2]=2 <= 3. remainingTasksBitmask=3^2=1. dpArray[3]=min(1, dpArray[1]+1)=min(1,1+1)=1.
 *   subTaskSet = 1 (001): sumOfTaskTimes[1]=1 <= 3. remainingTasksBitmask=3^1=2. dpArray[3]=min(1, dpArray[2]+1)=min(1,1+1)=1.
 *   dpArray = [0, 1, 1, 1, 4, 4, 4, 4]
 * currentTaskSet = 4 (100): sumOfTaskTimes[4]=3 <= 3. dpArray[4] = 1.
 *   subTaskSet = 4: (skip)
 *   dpArray = [0, 1, 1, 1, 1, 4, 4, 4]
 * currentTaskSet = 5 (101): sumOfTaskTimes[5]=4 > 3. dpArray[5] remains 4.
 *   subTaskSet = 5: (skip)
 *   subTaskSet = 4 (100): sumOfTaskTimes[4]=3 <= 3. remainingTasksBitmask=5^4=1. dpArray[5]=min(4, dpArray[1]+1)=min(4,1+1)=2.
 *   subTaskSet = 1 (001): sumOfTaskTimes[1]=1 <= 3. remainingTasksBitmask=5^1=4. dpArray[5]=min(2, dpArray[4]+1)=min(2,1+1)=2.
 *   dpArray = [0, 1, 1, 1, 1, 2, 4, 4]
 * currentTaskSet = 6 (110): sumOfTaskTimes[6]=5 > 3. dpArray[6] remains 4.
 *   subTaskSet = 6: (skip)
 *   subTaskSet = 4 (100): sumOfTaskTimes[4]=3 <= 3. remainingTasksBitmask=6^4=2. dpArray[6]=min(4, dpArray[2]+1)=min(4,1+1)=2.
 *   subTaskSet = 2 (010): sumOfTaskTimes[2]=2 <= 3. remainingTasksBitmask=6^2=4. dpArray[6]=min(2, dpArray[4]+1)=min(2,1+1)=2.
 *   dpArray = [0, 1, 1, 1, 1, 2, 2, 4]
 * currentTaskSet = 7 (111): sumOfTaskTimes[7]=6 > 3. dpArray[7] remains 4.
 *   subTaskSet = 7: (skip)
 *   subTaskSet = 4 (100): sumOfTaskTimes[4]=3 <= 3. remainingTasksBitmask=7^4=3. dpArray[7]=min(4, dpArray[3]+1)=min(4,1+1)=2.
 *   subTaskSet = 3 (011): sumOfTaskTimes[3]=3 <= 3. remainingTasksBitmask=7^3=4. dpArray[7]=min(2, dpArray[4]+1)=min(2,1+1)=2.
 *   subTaskSet = 2 (010): sumOfTaskTimes[2]=2 <= 3. remainingTasksBitmask=7^2=5. dpArray[7]=min(2, dpArray[5]+1)=min(2,2+1)=2.
 *   subTaskSet = 1 (001): sumOfTaskTimes[1]=1 <= 3. remainingTasksBitmask=7^1=6. dpArray[7]=min(2, dpArray[6]+1)=min(2,2+1)=2.
 *   dpArray = [0, 1, 1, 1, 1, 2, 2, 2]
 *
 * Final result: dpArray[7] = 2.
 * Time Complexity: O(N * 2^N + 3^N)
 * Space Complexity: O(2^N)
 */
var minSessions = function (tasksInput, sessionMaxTime) {
  const tasksCount = tasksInput.length;
  const allTasksMask = 1 << tasksCount;

  const dpArray = new Array(allTasksMask).fill(tasksCount + 1);
  dpArray[0] = 0;

  const sumOfTaskTimes = new Array(allTasksMask).fill(0);
  for (let sumMask = 1; sumMask < allTasksMask; sumMask++) {
    const lowestSetBit = sumMask & -sumMask;
    const lowestSetBitPosition = Math.log2(lowestSetBit);
    sumOfTaskTimes[sumMask] =
      sumOfTaskTimes[sumMask ^ lowestSetBit] + tasksInput[lowestSetBitPosition];
  }

  for (
    let currentTaskSet = 1;
    currentTaskSet < allTasksMask;
    currentTaskSet++
  ) {
    const totalTaskTime = sumOfTaskTimes[currentTaskSet];
    if (totalTaskTime <= sessionMaxTime) {
      dpArray[currentTaskSet] = 1;
    }

    for (
      let subTaskSet = currentTaskSet;
      subTaskSet > 0;
      subTaskSet = (subTaskSet - 1) & currentTaskSet
    ) {
      if (subTaskSet === currentTaskSet) {
        continue;
      }
      const sessionDuration = sumOfTaskTimes[subTaskSet];
      if (sessionDuration <= sessionMaxTime) {
        const remainingTasksBitmask = currentTaskSet ^ subTaskSet;
        dpArray[currentTaskSet] = Math.min(
          dpArray[currentTaskSet],
          dpArray[remainingTasksBitmask] + 1
        );
      }
    }
  }

  return dpArray[allTasksMask - 1];
};
