/**
 * Maximum Number Of Weeks For Which You Can Work
 * Intuition: The key constraint is that we cannot work on the same project for two consecutive weeks. This means that if we work on a project, say Project X, this week, we must work on a different project next week. The total number of weeks we can work is limited by either the total number of milestones available or by the inability to alternate projects. If the largest project (with `maximumProjectMilestones`) can always be interleaved with milestones from other projects (`accumulatedMilestones - maximumProjectMilestones`), we can complete all `accumulatedMilestones`. Otherwise, the number of weeks is limited by how many times we can alternate the largest project with any other project. Each of the `accumulatedMilestones - maximumProjectMilestones` 'other' milestones can act as a separator, allowing us to work on the largest project twice (once before and once after the separator), plus one initial largest project milestone.
 * Approach: 1. Calculate the total number of all milestones across all projects. 2. Identify the maximum number of milestones in any single project. 3. Compare the maximum project's milestones with the sum of all other projects' milestones. 4. If the largest project's milestones can be fully interleaved (i.e., `maximumProjectMilestones <= (accumulatedMilestones - maximumProjectMilestones) + 1`), then we can complete all `accumulatedMilestones`. 5. Otherwise, the number of weeks is limited to `2 * (accumulatedMilestones - maximumProjectMilestones) + 1`, representing the maximum possible alternations plus one extra task for the largest project. Both cases are covered by `Math.min(accumulatedMilestones, 2 * (accumulatedMilestones - maximumProjectMilestones) + 1)`.
 * Dry Run: milestones = [5, 2, 1]
 * 1. Initialize `accumulatedMilestones = 0`, `maximumProjectMilestones = 0`.
 * 2. Loop through `milestones`:
 *    - `projectMilestoneCount = 5`: `accumulatedMilestones = 5`, `maximumProjectMilestones = 5`.
 *    - `projectMilestoneCount = 2`: `accumulatedMilestones = 7`, `maximumProjectMilestones = 5`.
 *    - `projectMilestoneCount = 1`: `accumulatedMilestones = 8`, `maximumProjectMilestones = 5`.
 * 3. After loop, `accumulatedMilestones = 8`, `maximumProjectMilestones = 5`.
 * 4. Calculate result: `Math.min(accumulatedMilestones, 2 * (accumulatedMilestones - maximumProjectMilestones) + 1)`
 *    `Math.min(8, 2 * (8 - 5) + 1)`
 *    `Math.min(8, 2 * 3 + 1)`
 *    `Math.min(8, 6 + 1)`
 *    `Math.min(8, 7)`
 * 5. Return `7`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var numberOfWeeks = function (milestones) {
  let accumulatedMilestones = 0;
  let maximumProjectMilestones = 0;

  for (const projectMilestoneCount of milestones) {
    accumulatedMilestones += projectMilestoneCount;
    maximumProjectMilestones = Math.max(
      maximumProjectMilestones,
      projectMilestoneCount,
    );
  }

  return Math.min(
    accumulatedMilestones,
    2 * (accumulatedMilestones - maximumProjectMilestones) + 1,
  );
};
