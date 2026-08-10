/**
 * Maximum Spending After Buying Items
 *
 * Intuition:
 * We have to buy every item exactly once.
 *
 * On day `d`, the price of an item is:
 *
 *     values[i][j] * d
 *
 * To maximize the total spending, we want:
 *
 *     small values × small days
 *     large values × large days
 *
 * Therefore, if we could freely choose any item on any day,
 * we would simply sort ALL items in ascending order and multiply:
 *
 *     smallest item × 1
 *     second smallest × 2
 *     ...
 *     largest item × (m * n)
 *
 * The only challenge is:
 *
 *     We cannot buy an arbitrary item from a shop.
 *
 * We must always buy the RIGHTMOST available item.
 *
 * ------------------------------------------------------------
 *
 * Important Observation:
 *
 * Each shop is sorted:
 *
 *     large → small
 *
 * and we can only buy from the right side.
 *
 * Therefore, within every shop, items are automatically bought
 * from smallest to largest.
 *
 * If we globally sort ALL items in ascending order, the items
 * from each individual shop also appear in the correct order.
 *
 * So we can simply:
 *
 *     1. Put all items into one array.
 *     2. Sort them in ascending order.
 *     3. Multiply each item by its day.
 *     4. Add everything.
 *
 * This is valid because whenever an item from a shop is selected,
 * all smaller items from that same shop must already have been
 * selected.
 *
 * ------------------------------------------------------------
 *
 * Dry Run:
 *
 * values = [
 *     [8, 5, 2],
 *     [6, 4, 1],
 *     [9, 7, 3]
 * ]
 *
 * Flatten:
 *
 *     [8,5,2,6,4,1,9,7,3]
 *
 * Sort ascending:
 *
 *     [1,2,3,4,5,6,7,8,9]
 *
 * Now multiply by day:
 *
 *     1 × 1 = 1
 *     2 × 2 = 4
 *     3 × 3 = 9
 *     4 × 4 = 16
 *     5 × 5 = 25
 *     6 × 6 = 36
 *     7 × 7 = 49
 *     8 × 8 = 64
 *     9 × 9 = 81
 *
 * Total:
 *
 *     1 + 4 + 9 + 16 + 25 + 36 + 49 + 64 + 81
 *     = 285
 *
 * Therefore:
 *
 *     Output = 285
 *
 * ------------------------------------------------------------
 *
 * Why does ascending order maximize the answer?
 *
 * Suppose we have:
 *
 *     a <= b
 *
 * and two days:
 *
 *     x < y
 *
 * If we assign:
 *
 *     a → x
 *     b → y
 *
 * contribution:
 *
 *     ax + by
 *
 * If we swap them:
 *
 *     a → y
 *     b → x
 *
 * contribution:
 *
 *     ay + bx
 *
 * Difference:
 *
 *     (ax + by) - (ay + bx)
 *     = (b - a)(y - x)
 *     >= 0
 *
 * Therefore, larger values should always be paired with
 * larger days.
 *
 * This is exactly why sorting all items in ascending order
 * gives the maximum total.
 *
 * ------------------------------------------------------------
 *
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maxSpending = function (values) {
  const items = [];

  for (const shop of values) {
    for (const value of shop) {
      items.push(value);
    }
  }

  items.sort((a, b) => a - b);

  let answer = 0n;

  for (let i = 0; i < items.length; i++) {
    const day = BigInt(i + 1);
    const value = BigInt(items[i]);

    answer += value * day;
  }

  return answer;
};
