/**
 * Restore Finishing Order
 * Intuition: order already lists every racer by finish. Friends should appear in that same relative sequence.
 * Approach: 1. Put friend IDs in a set. 2. Scan order left to right and keep IDs that are friends. 3. That filtered list is the friends’ finishing order.
 * Dry Run: order = [3, 1, 2, 5, 4], friends = [1, 3, 4]. Scan keeps 3, then 1, then 4 → [3, 1, 4].
 * Time Complexity: O(N)
 * Space Complexity: O(F) where F is the number of friends
 */
var recoverOrder = function (order, friends) {
  const friendIds = new Set(friends);
  const finishingOrder = [];

  for (const racerId of order) {
    if (friendIds.has(racerId)) {
      finishingOrder.push(racerId);
    }
  }

  return finishingOrder;
};
