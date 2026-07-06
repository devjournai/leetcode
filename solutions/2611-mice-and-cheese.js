/**
 * Mice and Cheese
 *
 * Intuition:
 * Assume initially that the second mouse eats every cheese.
 *
 * This gives the base score:
 *
 *      sum(reward2)
 *
 * If the first mouse eats cheese `i` instead, the total score changes by:
 *
 *      reward1[i] - reward2[i]
 *
 * Therefore, we should choose the `k` cheeses with the largest positive
 * differences to maximize the total score.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Compute the base score assuming the second mouse eats every cheese.
 *
 *      baseScore =
 *          sum(reward2)
 *
 * 2. For every cheese, compute:
 *
 *      difference =
 *          reward1[i] - reward2[i]
 *
 * 3. Sort all differences in descending order.
 *
 * 4. Add the largest `k` differences to the base score.
 *
 * 5. Return the final score.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * reward1 =
 * [1,1,3,4]
 *
 * reward2 =
 * [4,4,1,1]
 *
 * Base Score:
 *
 * 4+4+1+1
 *
 * =10
 *
 * Differences:
 *
 * -3
 * -3
 * 2
 * 3
 *
 * Sort:
 *
 * 3
 * 2
 * -3
 * -3
 *
 * k = 2
 *
 * Answer:
 *
 * 10 + 3 + 2
 *
 * =15
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

var miceAndCheese = function (reward1, reward2, k) {
  const n = reward1.length;

  let answer = 0;

  const differences = new Array(n);

  for (let i = 0; i < n; i++) {
    answer += reward2[i];
    differences[i] = reward1[i] - reward2[i];
  }

  differences.sort((a, b) => b - a);

  for (let i = 0; i < k; i++) {
    answer += differences[i];
  }

  return answer;
};
