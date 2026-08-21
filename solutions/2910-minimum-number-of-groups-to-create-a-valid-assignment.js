/**
 * Minimum Number of Groups to Create a Valid Assignment
 *
 * Intuition:
 * First count how many times each number appears.
 *
 * Suppose the smallest group size is `x`. Because the largest
 * group can have at most one more element, every group must have
 * either:
 *
 * - x elements
 * - x + 1 elements
 *
 * For a value appearing `frequency` times, we need to determine
 * whether it can be divided into groups of size x or x + 1.
 *
 * We try every possible value of x from 1 to the minimum frequency.
 * For each frequency, we calculate the minimum number of groups
 * required.
 *
 * If a frequency cannot be divided into valid groups of size x
 * and x + 1, that value of x is invalid.
 *
 * Approach:
 * 1. Count the frequency of every number.
 * 2. Find the minimum frequency.
 * 3. Try every possible smallest group size from 1 to minFrequency.
 * 4. For every frequency:
 *    - Find the minimum number of groups needed.
 *    - Check whether those groups can have sizes x or x + 1.
 * 5. Keep the minimum total number of groups.
 *
 * Dry Run: frequencies [3, 3], minFrequency=3. groupSize=1: ceil(3/2)=2 groups and 2*1<=3, total=4. groupSize=2: ceil(3/3)=1 and 1*2<=3, total=2. Answer=2.
 *
 * Time Complexity: O(N * M)
 * Space Complexity: O(N)
 */
var minGroupsForValidAssignment = function (balls) {
  const frequencyMap = new Map();

  for (const ball of balls) {
    frequencyMap.set(ball, (frequencyMap.get(ball) || 0) + 1);
  }

  const frequencies = [...frequencyMap.values()];
  const minFrequency = Math.min(...frequencies);

  let minimumGroups = Infinity;

  for (let groupSize = 1; groupSize <= minFrequency; groupSize++) {
    let totalGroups = 0;
    let isValid = true;

    for (const frequency of frequencies) {
      const groups = Math.ceil(frequency / (groupSize + 1));

      if (groups * groupSize > frequency) {
        isValid = false;
        break;
      }

      totalGroups += groups;
    }

    if (isValid) {
      minimumGroups = Math.min(minimumGroups, totalGroups);
    }
  }

  return minimumGroups;
};
