/**
 * Number Of Orders In The Backlog
 * Intuition: Buys match the cheapest sell with price ≤ buy price; sells match the highest buy with price ≥ sell price. Unmatched remainder goes to the corresponding heap.
 * Approach: 1. Max-buy heap via negated `priorityPrice` and min-sell heap. 2. Type 0: while a sell ≤ current price, match quantities. Leftover buy is enqueued. 3. Type 1: match against buys with originalPrice ≥ sell price. 4. Sum remaining amounts modulo 1e9+7.
 * Dry Run: orders = [[10,5,0],[15,2,1],[25,1,1],[30,4,0]].
 *   - Buy 5@10 stays. Sells 15 and 25 do not match that buy. Buy 4@30 consumes both sells (quantity 3) and leaves 1. Backlog 5+1=6.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var getNumberOfBacklogOrders = function (allIncomingTrades) {
  const moduloValue = 1e9 + 7;

  const backlogBuyRequests = new MinPriorityQueue({
    compare: (itemA, itemB) => itemA.priorityPrice - itemB.priorityPrice,
  });

  const backlogSellOffers = new MinPriorityQueue({
    compare: (itemA, itemB) => itemA.priorityPrice - itemB.priorityPrice,
  });

  for (const singleTrade of allIncomingTrades) {
    let currentPriceLevel = singleTrade[0];
    let currentOrderQuantity = singleTrade[1];
    let currentOrderType = singleTrade[2];

    if (currentOrderType === 0) {
      while (
        currentOrderQuantity > 0 &&
        !backlogSellOffers.isEmpty() &&
        backlogSellOffers.peek().priorityPrice <= currentPriceLevel
      ) {
        const availableSellOffer = backlogSellOffers.dequeue();
        const matchedQuantity = Math.min(
          currentOrderQuantity,
          availableSellOffer.orderAmount
        );
        currentOrderQuantity -= matchedQuantity;
        availableSellOffer.orderAmount -= matchedQuantity;

        if (availableSellOffer.orderAmount > 0) {
          backlogSellOffers.enqueue(availableSellOffer);
        }
      }
      if (currentOrderQuantity > 0) {
        backlogBuyRequests.enqueue({
          priorityPrice: -currentPriceLevel,
          orderAmount: currentOrderQuantity,
          originalPriceValue: currentPriceLevel,
        });
      }
    } else {
      while (
        currentOrderQuantity > 0 &&
        !backlogBuyRequests.isEmpty() &&
        backlogBuyRequests.peek().originalPriceValue >= currentPriceLevel
      ) {
        const pendingBuyRequest = backlogBuyRequests.dequeue();
        const processedQuantity = Math.min(
          currentOrderQuantity,
          pendingBuyRequest.orderAmount
        );
        currentOrderQuantity -= processedQuantity;
        pendingBuyRequest.orderAmount -= processedQuantity;

        if (pendingBuyRequest.orderAmount > 0) {
          backlogBuyRequests.enqueue(pendingBuyRequest);
        }
      }
      if (currentOrderQuantity > 0) {
        backlogSellOffers.enqueue({
          priorityPrice: currentPriceLevel,
          orderAmount: currentOrderQuantity,
        });
      }
    }
  }

  let cumulativeBacklogCount = 0;

  while (!backlogBuyRequests.isEmpty()) {
    const remainingBuyOrder = backlogBuyRequests.dequeue();
    cumulativeBacklogCount =
      (cumulativeBacklogCount + remainingBuyOrder.orderAmount) % moduloValue;
  }

  while (!backlogSellOffers.isEmpty()) {
    const remainingSellOffer = backlogSellOffers.dequeue();
    cumulativeBacklogCount =
      (cumulativeBacklogCount + remainingSellOffer.orderAmount) % moduloValue;
  }

  return cumulativeBacklogCount;
};
