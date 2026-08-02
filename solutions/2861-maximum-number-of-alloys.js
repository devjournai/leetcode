/**
 * Maximum Number of Alloys
 *
 * Intuition:
 * We must choose exactly one machine.
 *
 * For a fixed machine, suppose we want to manufacture x alloys.
 *
 * For every metal i:
 *
 *      required = composition[i] * x
 *
 * If:
 *
 *      required <= stock[i]
 *
 * we already have enough metal.
 *
 * Otherwise we must buy:
 *
 *      required - stock[i]
 *
 * units.
 *
 * The purchase cost is:
 *
 *      (required - stock[i]) * cost[i]
 *
 * If the total purchase cost does not exceed the budget,
 * then x alloys are feasible.
 *
 * Since feasibility is monotonic:
 *
 *      If x alloys are possible,
 *      then every value < x is also possible.
 *
 * we can binary search the answer.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. For every machine:
 *
 *      Binary search the maximum alloys.
 *
 * 2. To check feasibility:
 *
 *      For every metal:
 *
 *          required = composition * alloys
 *
 *          buy =
 *              max(0, required - stock)
 *
 *          totalCost += buy * cost
 *
 *      Return whether:
 *
 *          totalCost <= budget
 *
 * 3. Return the best answer among all machines.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * composition = [1,1,1]
 * stock = [0,0,0]
 * cost = [1,2,3]
 * budget = 15
 *
 * Check x = 2
 *
 * Need:
 *
 *      2,2,2
 *
 * Cost:
 *
 *      2 + 4 + 6 = 12
 *
 * Feasible.
 *
 * Check x = 3
 *
 * Cost:
 *
 *      3 + 6 + 9 = 18
 *
 * Not feasible.
 *
 * Answer = 2.
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(k × n × log M)
 * Space Complexity: O(1)
 */

var maxNumberOfAlloys = function (n, k, budget, composition, stock, cost) {
  const canMake = (machine, alloys) => {
    let totalCost = 0;

    for (let metal = 0; metal < n; metal++) {
      const required = composition[machine][metal] * alloys;

      if (required > stock[metal]) {
        totalCost += (required - stock[metal]) * cost[metal];

        if (totalCost > budget) {
          return false;
        }
      }
    }

    return true;
  };

  let answer = 0;

  for (let machine = 0; machine < k; machine++) {
    let left = 0;
    let right = 2e8;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (canMake(machine, mid)) {
        answer = Math.max(answer, mid);
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return answer;
};
