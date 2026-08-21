/**
 * Design Auction System
 * Intuition: We define two hash tables. items is used to store all bid information for each item, where items[itemId] stores an ordered set. Each element in the set is a tuple (bidAmount, userId), representing a user's bid amount for that item. Since we need to quickly retrieve the user with the highest bid, this ordered set needs to be sorted by bid amount in ascending order. If bid amounts are identical, they are sorted by user ID in ascending order. The other hash table users is used to store the bid information of each user for each item, where users[userId][itemId] stores the user's bid amount for that item. For the addBid(userId, itemId, bidAmount) operation, we first check if the user has already placed a bid on the item. If they have, we call the removeBid(userId, itemId) method to remove the original bid; then we add the new bid information to users and items. For the updateBid(userId, itemI...
 * Approach: We define two hash tables. items is used to store all bid information for each item, where items[itemId] stores an ordered set. Each element in the set is a tuple (bidAmount, userId), representing a user's bid amount for that item. Since we need to quickly retrieve the user with the highest bid, this ordered set needs to be sorted by bid amount in ascending order. If bid amounts are identical, they are sorted by user ID in ascending order. The other hash table users is used to store the bid information of each user for each item, where users[userId][itemId] stores the user's bid amount for that item. For the addBid(userId, itemId, bidAmount) operation, we first check if the user has already placed a bid on the item. If they have, we call the removeBid(userId, itemId) method to remove the original bid; then we add the new bid information to users and items. For the updateBid(userId, itemI...
 * Dry Run: Input: [&quot;AuctionSystem&quot;, &quot;addBid&quot;, &quot;addBid&quot;, &quot;getHighestBidder&quot;, &quot;updateBid&quot;, &quot;getHighestBidder&quot;, &quot;removeBid&quot;, &quot;getHighestBidder&quot;, &quot;getHighestBidder&quot;] [[], [1, 7, 5], [2, 7, 6], [7], [1, 7, 8], [7], [2, 7], [7], [3]] => Output: [null, null, null, 2, null, 1, null, 1, -1]
 * Time Complexity: O(B) per query in the worst case
 * Space Complexity: O(B)
 */
var AuctionSystem = function () {
  this.items = new Map();
  this.users = new Map();
};

AuctionSystem.prototype.addBid = function (userId, itemId, bidAmount) {
  if (!this.users.has(userId)) this.users.set(userId, new Map());
  const userBids = this.users.get(userId);
  if (userBids.has(itemId)) this.removeBid(userId, itemId);
  userBids.set(itemId, bidAmount);
  if (!this.items.has(itemId)) this.items.set(itemId, []);
  this.items.get(itemId).push([bidAmount, userId]);
};

AuctionSystem.prototype.updateBid = function (userId, itemId, newAmount) {
  this.removeBid(userId, itemId);
  this.addBid(userId, itemId, newAmount);
};

AuctionSystem.prototype.removeBid = function (userId, itemId) {
  const amount = this.users.get(userId).get(itemId);
  this.users.get(userId).delete(itemId);
  const list = this.items.get(itemId) || [];
  const idx = list.findIndex((b) => b[0] === amount && b[1] === userId);
  if (idx !== -1) list.splice(idx, 1);
};

AuctionSystem.prototype.getHighestBidder = function (itemId) {
  const list = this.items.get(itemId) || [];
  if (list.length === 0) return -1;
  let best = list[0];
  for (const bid of list) {
    if (bid[0] > best[0] || (bid[0] === best[0] && bid[1] > best[1]))
      best = bid;
  }
  return best[1];
};
