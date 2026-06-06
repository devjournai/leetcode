/**
 * Minimum Rounds To Complete All Tasks
 * Intuition: Any group of tasks with the same difficulty level, say 'C' tasks, can be completed if 'C' is at least 2. The minimum rounds to complete 'C' tasks is `ceil(C/3)`, where 'C' is always distributed into groups of 2s and 3s. If 'C' is 1, it's impossible.
 * Approach: 1. First, count the frequency of each task difficulty level using a map. 2. Initialize a variable to accumulate the total minimum rounds. 3. Iterate through the counts (frequencies) stored in the map. 4. For each count, check if it's 1. If so, return -1 immediately as it's impossible to complete. 5. Otherwise, calculate the rounds for this specific difficulty level using `Math.ceil(count / 3)` and add it to the total rounds. 6. After processing all difficulties, return the accumulated total rounds.
 * Dry Run: tasks = [2,2,3,3,2,4,4,4,4,4]
 *   1. Initialize frequencyMap.
 *   2. Populate frequencyMap:
 *      - tasks[0]=2: frequencyMap = {2:1}
 *      - tasks[1]=2: frequencyMap = {2:2}
 *      - tasks[2]=3: frequencyMap = {2:2, 3:1}
 *      - tasks[3]=3: frequencyMap = {2:2, 3:2}
 *      - tasks[4]=2: frequencyMap = {2:3, 3:2}
 *      - tasks[5]=4: frequencyMap = {2:3, 3:2, 4:1}
 *      - tasks[6]=4: frequencyMap = {2:3, 3:2, 4:2}
 *      - tasks[7]=4: frequencyMap = {2:3, 3:2, 4:3}
 *      - tasks[8]=4: frequencyMap = {2:3, 3:2, 4:4}
 *      - tasks[9]=4: frequencyMap = {2:3, 3:2, 4:5}
 *      Final frequencyMap = {2:3, 3:2, 4:5}
 *   3. Initialize totalRoundsRequired = 0.
 *   4. Iterate through values of frequencyMap:
 *      - currentDifficultyCount = 3 (for difficulty 2): 3 is not 1. Add `Math.ceil(3/3)` which is 1 to totalRoundsRequired. totalRoundsRequired = 1.
 *      - currentDifficultyCount = 2 (for difficulty 3): 2 is not 1. Add `Math.ceil(2/3)` which is 1 to totalRoundsRequired. totalRoundsRequired = 1 + 1 = 2.
 *      - currentDifficultyCount = 5 (for difficulty 4): 5 is not 1. Add `Math.ceil(5/3)` which is 2 to totalRoundsRequired. totalRoundsRequired = 2 + 2 = 4.
 *   5. Return totalRoundsRequired = 4.
 * Time Complexity: O(N)
 * Space Complexity: O(U)
 */
var minimumRounds = function (tasks) {
  const taskCountMap = new Map();

  for (const taskLevel of tasks) {
    const existingCount = taskCountMap.get(taskLevel) || 0;
    taskCountMap.set(taskLevel, existingCount + 1);
  }

  let accumulatedRounds = 0;

  for (const countValue of taskCountMap.values()) {
    if (countValue === 1) {
      return -1;
    }
    accumulatedRounds += Math.ceil(countValue / 3);
  }

  return accumulatedRounds;
};
