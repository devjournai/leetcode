/**
 * Minimum Discards To Balance Inventory
 * Intuition: Keep greedily unless the current type already appears m times among kept items in the last w days. Discarding later cannot unlock more keeps in a sliding window.
 * Approach: 1. Track kept counts per type and a kept flag per day. 2. Slide off day i-w. 3. If count[type] is already m, discard; else keep and increment.
 * Dry Run: arrivals = [1, 2, 3, 3, 3, 4], w = 3, m = 2. The third 3 in a window of three 3s is discarded → 1.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minArrivalsToDiscard = function (arrivals, w, m) {
  const keptCountByType = new Map();
  const wasKept = Array(arrivals.length).fill(0);
  let discarded = 0;

  for (let day = 0; day < arrivals.length; day++) {
    if (day >= w) {
      const oldType = arrivals[day - w];
      keptCountByType.set(
        oldType,
        (keptCountByType.get(oldType) || 0) - wasKept[day - w]
      );
    }
    const itemType = arrivals[day];
    const currentCount = keptCountByType.get(itemType) || 0;
    if (currentCount >= m) {
      discarded++;
    } else {
      wasKept[day] = 1;
      keptCountByType.set(itemType, currentCount + 1);
    }
  }
  return discarded;
};
