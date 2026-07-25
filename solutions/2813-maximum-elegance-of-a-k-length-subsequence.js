/**
 * Maximum Elegance of a K-Length Subsequence
 *
 * Intuition:
 * Elegance is:
 *
 *      totalProfit + distinctCategories²
 *
 * We want exactly k items.
 *
 * Start by maximizing profit: sort all items by profit in descending order
 * and initially choose the first k items.
 *
 * If multiple selected items have the same category, only one of them
 * contributes toward the number of distinct categories. The remaining
 * duplicates are candidates that we can replace.
 *
 * Since items are sorted by decreasing profit, duplicate items encountered
 * in the first k positions can be stored in a stack. The last duplicate in
 * this stack has the smallest profit, so it should be removed first.
 *
 * Then scan the remaining items.
 *
 * Whenever we find an item whose category is not already selected:
 *
 *      1. Remove the smallest-profit duplicate.
 *      2. Add this new-category item.
 *      3. Increase the number of distinct categories.
 *      4. Recalculate elegance.
 *
 * We try every useful replacement and keep the maximum.
 *
 * -----------------------------------------------------------------------
 *
 * Why This Works:
 *
 * Suppose our current k items contain duplicate categories.
 *
 * To introduce a new category while keeping exactly k items, we must remove
 * one selected item.
 *
 * Removing the only item of an existing category would not increase the
 * number of distinct categories, so we should remove a duplicate.
 *
 * Among all duplicates, removing the one with the smallest profit loses the
 * least total profit.
 *
 * Sorting by profit descending allows us to greedily maintain exactly this.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Sort items by profit in descending order.
 *
 * 2. Select the first k items:
 *
 *      • Add their profits to totalProfit.
 *      • Track categories in a Set.
 *      • If a category already exists, store that item's profit in
 *        duplicates.
 *
 * 3. Calculate initial elegance:
 *
 *      totalProfit + categories.size²
 *
 * 4. Scan items from index k onward.
 *
 *      If the item's category is new and we have a duplicate available:
 *
 *          removedProfit = duplicates.pop()
 *
 *          totalProfit -= removedProfit
 *          totalProfit += currentProfit
 *
 *          add current category
 *
 *          update answer
 *
 * 5. Return the maximum elegance.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * items = [[3,1],[3,1],[2,2],[5,3]]
 * k = 3
 *
 * Sort:
 *
 *      [5,3], [3,1], [3,1], [2,2]
 *
 * Initially select:
 *
 *      [5,3], [3,1], [3,1]
 *
 * totalProfit = 11
 * categories = {3,1}
 * distinct = 2
 *
 * elegance:
 *
 *      11 + 2² = 15
 *
 * The second category-1 item is a duplicate:
 *
 *      duplicates = [3]
 *
 * Next item:
 *
 *      [2,2]
 *
 * Category 2 is new.
 *
 * Remove duplicate profit 3 and add profit 2:
 *
 *      totalProfit = 11 - 3 + 2
 *                  = 10
 *
 * distinct = 3
 *
 * elegance:
 *
 *      10 + 3²
 *      = 19
 *
 * Answer = 19
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

var findMaximumElegance = function (items, k) {
  items.sort((a, b) => b[0] - a[0]);

  let totalProfit = 0;

  const categories = new Set();
  const duplicates = [];

  for (let i = 0; i < k; i++) {
    const [profit, category] = items[i];

    totalProfit += profit;

    if (categories.has(category)) {
      duplicates.push(profit);
    } else {
      categories.add(category);
    }
  }

  let distinct = categories.size;

  let answer = totalProfit + distinct * distinct;

  for (let i = k; i < items.length; i++) {
    const [profit, category] = items[i];

    if (categories.has(category) || duplicates.length === 0) {
      continue;
    }

    const removedProfit = duplicates.pop();

    totalProfit = totalProfit - removedProfit + profit;

    categories.add(category);
    distinct++;

    const elegance = totalProfit + distinct * distinct;

    answer = Math.max(answer, elegance);
  }

  return answer;
};
