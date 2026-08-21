/**
 * Maximize Profit from Task Assignment
 * Intuition: Each worker takes the highest remaining profit among tasks of their skill. One extra worker of any skill can take one leftover task — add the best remaining profit after assignments.
 * Approach: 1. Group task profits by skill and sort each group ascending (pop from the end). 2. For each worker, if their skill still has a task, take the largest. 3. Among leftover profits, add the global maximum (or 0).
 * Dry Run: workers = [1,2,3], tasks = [[1,10],[1,5],[2,8]]. Worker 1 takes 10, worker 2 takes 8, leftover 5 becomes the extra hire → 23.
 * Time Complexity: O(T log T + W)
 * Space Complexity: O(T)
 */
var maxProfit = function (workers, tasks) {
  const skillToProfits = new Map();

  for (const [skill, profit] of tasks) {
    if (!skillToProfits.has(skill)) {
      skillToProfits.set(skill, []);
    }
    skillToProfits.get(skill).push(profit);
  }

  for (const profits of skillToProfits.values()) {
    profits.sort((left, right) => left - right);
  }

  let totalProfit = 0;
  for (const workerSkill of workers) {
    const profits = skillToProfits.get(workerSkill);
    if (profits && profits.length > 0) {
      totalProfit += profits.pop();
    }
  }

  let maxRemainingProfit = 0;
  for (const profits of skillToProfits.values()) {
    if (profits.length > 0) {
      maxRemainingProfit = Math.max(
        maxRemainingProfit,
        profits[profits.length - 1]
      );
    }
  }

  return totalProfit + maxRemainingProfit;
};
