/**
 * Maximum Number of Groups With Increasing Length
 *
 * Intuition:
 * To maximize the number of groups, we should build them with the smallest
 * possible lengths:
 *
 *      1, 2, 3, 4, ...
 *
 * Sort the usage limits so that smaller capacities are used first.
 *
 * While processing the limits, maintain the total number of available usages.
 * Whenever the accumulated usages are enough to create the next group, we
 * form that group and subtract its required size from the accumulated usages.
 *
 * This greedy strategy is optimal because delaying the creation of a group
 * cannot increase the total number of groups.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Sort usageLimits in ascending order.
 *
 * 2. Maintain:
 *
 *      available
 *          Remaining usages accumulated so far.
 *
 *      groups
 *          Number of groups already formed.
 *
 * 3. For every usage limit:
 *
 *      • Add it to available.
 *
 *      • If available >= groups + 1,
 *        create the next group:
 *
 *              available -= groups + 1
 *              groups++
 *
 * 4. Return groups.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * usageLimits = [1,2,5]
 *
 * Sorted:
 *
 * [1,2,5]
 *
 * available = 1
 *
 * Need group of size 1
 *
 * available = 0
 * groups = 1
 *
 * Add 2
 *
 * available = 2
 *
 * Need group of size 2
 *
 * available = 0
 * groups = 2
 *
 * Add 5
 *
 * available = 5
 *
 * Need group of size 3
 *
 * available = 2
 * groups = 3
 *
 * Answer = 3
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var maxIncreasingGroups = function (usageLimits) {
  usageLimits.sort((a, b) => a - b);

  let available = 0;
  let groups = 0;

  for (const limit of usageLimits) {
    available += limit;

    if (available >= groups + 1) {
      available -= groups + 1;
      groups++;
    }
  }

  return groups;
};
