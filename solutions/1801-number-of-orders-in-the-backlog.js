/**
 * Number Of Orders In The Backlog
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
          availableSellOffer.orderAmount,
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
          pendingBuyRequest.orderAmount,
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
