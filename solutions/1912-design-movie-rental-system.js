/**
 * Design Movie Rental System
 * Intuition: Maintain available copies per movie in a price/shop min-heap, rented copies in a (price, shop, movie) heap, plus maps for price and current rental status. search/report extract then reinsert after skipping stale heap entries.
 * Approach: 1. Constructor indexes entries into `movieToAvailableShopsQueueMap` and `shopToMoviePriceMap`. 2. `search`: pop cheapest shops that still stock the movie (up to 5). 3. `rent`/`drop` move between maps and heaps. 4. `report`: pop rented heap for currently rented unique pairs (up to 5).
 * Dry Run: shops [(0,1,5),(0,2,6),(1,1,4)]. search(1) → [1,0]. rent(1,1); report → [[1,1]].
 * Time Complexity: O(N log S + Q_s * S log S + Q_r * log N + Q_d * log S + Q_R * N log N)
 * Space Complexity: O(N)
 */
class CustomPriorityQueue {
  constructor(
    priorityComparator = (elementA, elementB) => elementA - elementB
  ) {
    this.heapArray = [];
    this.comparisonFunction = priorityComparator;
  }

  getUpstreamIndex(downstreamIndex) {
    return Math.floor((downstreamIndex - 1) / 2);
  }

  getLeftChildCurrentIndex(parentCurrentIndex) {
    return 2 * parentCurrentIndex + 1;
  }

  getRightChildCurrentIndex(parentCurrentIndex) {
    return 2 * parentCurrentIndex + 2;
  }

  hasUpstream(indexVal) {
    return this.getUpstreamIndex(indexVal) >= 0;
  }

  hasLeftDescendant(indexVal) {
    return this.getLeftChildCurrentIndex(indexVal) < this.heapArray.length;
  }

  hasRightDescendant(indexVal) {
    return this.getRightChildCurrentIndex(indexVal) < this.heapArray.length;
  }

  getUpstreamValue(indexVal) {
    return this.heapArray[this.getUpstreamIndex(indexVal)];
  }

  getLeftDescendantValue(indexVal) {
    return this.heapArray[this.getLeftChildCurrentIndex(indexVal)];
  }

  getRightDescendantValue(indexVal) {
    return this.heapArray[this.getRightChildCurrentIndex(indexVal)];
  }

  exchangeElements(firstIndex, secondIndex) {
    [this.heapArray[firstIndex], this.heapArray[secondIndex]] = [
      this.heapArray[secondIndex],
      this.heapArray[firstIndex],
    ];
  }

  peekTop() {
    if (this.heapArray.length === 0) return null;
    return this.heapArray[0];
  }

  addEntry(entryItem) {
    this.heapArray.push(entryItem);
    this.rebalanceUp();
  }

  extractTop() {
    if (this.heapArray.length === 0) return null;
    if (this.heapArray.length === 1) return this.heapArray.pop();

    const topItem = this.heapArray[0];
    this.heapArray[0] = this.heapArray.pop();
    this.rebalanceDown();
    return topItem;
  }

  rebalanceUp() {
    let currentItemIndex = this.heapArray.length - 1;
    while (
      this.hasUpstream(currentItemIndex) &&
      this.comparisonFunction(
        this.heapArray[currentItemIndex],
        this.getUpstreamValue(currentItemIndex)
      ) < 0
    ) {
      this.exchangeElements(
        currentItemIndex,
        this.getUpstreamIndex(currentItemIndex)
      );
      currentItemIndex = this.getUpstreamIndex(currentItemIndex);
    }
  }

  rebalanceDown() {
    let currentItemPosition = 0;
    while (this.hasLeftDescendant(currentItemPosition)) {
      let smallerDescendantIndex =
        this.getLeftChildCurrentIndex(currentItemPosition);
      if (
        this.hasRightDescendant(currentItemPosition) &&
        this.comparisonFunction(
          this.getRightDescendantValue(currentItemPosition),
          this.getLeftDescendantValue(currentItemPosition)
        ) < 0
      ) {
        smallerDescendantIndex =
          this.getRightChildCurrentIndex(currentItemPosition);
      }

      if (
        this.comparisonFunction(
          this.heapArray[currentItemPosition],
          this.heapArray[smallerDescendantIndex]
        ) < 0
      ) {
        break;
      } else {
        this.exchangeElements(currentItemPosition, smallerDescendantIndex);
      }
      currentItemPosition = smallerDescendantIndex;
    }
  }

  isEmptyQueue() {
    return this.heapArray.length === 0;
  }

  currentSize() {
    return this.heapArray.length;
  }
}

var MovieRentingSystem = function (shopsCount, entriesList) {
  this.shopToMoviePriceMap = new Map();
  this.movieToAvailableShopsQueueMap = new Map();
  this.rentedMovieRecordsQueue = new CustomPriorityQueue(
    (recordOne, recordTwo) => {
      if (recordOne[2] !== recordTwo[2]) return recordOne[2] - recordTwo[2];
      if (recordOne[0] !== recordTwo[0]) return recordOne[0] - recordTwo[0];
      return recordOne[1] - recordTwo[1];
    }
  );
  this.currentRentalsStatusMap = new Map();

  for (const entryItem of entriesList) {
    const entryShopId = entryItem[0];
    const entryMovieId = entryItem[1];
    const entryPriceValue = entryItem[2];

    if (!this.shopToMoviePriceMap.has(entryShopId)) {
      this.shopToMoviePriceMap.set(entryShopId, new Map());
    }
    this.shopToMoviePriceMap
      .get(entryShopId)
      .set(entryMovieId, entryPriceValue);

    if (!this.movieToAvailableShopsQueueMap.has(entryMovieId)) {
      this.movieToAvailableShopsQueueMap.set(
        entryMovieId,
        new CustomPriorityQueue((shopOne, shopTwo) => {
          if (shopOne[1] !== shopTwo[1]) return shopOne[1] - shopTwo[1];
          return shopOne[0] - shopTwo[0];
        })
      );
    }
    this.movieToAvailableShopsQueueMap
      .get(entryMovieId)
      .addEntry([entryShopId, entryPriceValue]);
  }
};

MovieRentingSystem.prototype.search = function (movieIdentifier) {
  if (!this.movieToAvailableShopsQueueMap.has(movieIdentifier)) return [];

  const availableShopsPriorityQueue =
    this.movieToAvailableShopsQueueMap.get(movieIdentifier);
  const searchResultList = [];
  const shopsToReinsertList = [];
  const uniqueFoundShopSet = new Set();

  while (
    !availableShopsPriorityQueue.isEmptyQueue() &&
    searchResultList.length < 5
  ) {
    const shopEntry = availableShopsPriorityQueue.extractTop();
    const currentShopIdentifier = shopEntry[0];
    shopsToReinsertList.push(shopEntry);

    const shopMoviesMap = this.shopToMoviePriceMap.get(currentShopIdentifier);
    if (
      shopMoviesMap &&
      shopMoviesMap.has(movieIdentifier) &&
      !uniqueFoundShopSet.has(currentShopIdentifier)
    ) {
      searchResultList.push(currentShopIdentifier);
      uniqueFoundShopSet.add(currentShopIdentifier);
    }
  }

  for (const shopRecord of shopsToReinsertList) {
    availableShopsPriorityQueue.addEntry(shopRecord);
  }

  return searchResultList;
};

MovieRentingSystem.prototype.rent = function (shopIdParam, movieIdParam) {
  const rentalPriceValue = this.shopToMoviePriceMap
    .get(shopIdParam)
    .get(movieIdParam);
  this.shopToMoviePriceMap.get(shopIdParam).delete(movieIdParam);
  this.rentedMovieRecordsQueue.addEntry([
    shopIdParam,
    movieIdParam,
    rentalPriceValue,
  ]);
  this.currentRentalsStatusMap.set(
    `${shopIdParam}:${movieIdParam}`,
    rentalPriceValue
  );
};

MovieRentingSystem.prototype.drop = function (
  shopIdParamDrop,
  movieIdParamDrop
) {
  const dropMovieShopKey = `${shopIdParamDrop}:${movieIdParamDrop}`;
  const droppedMoviePrice = this.currentRentalsStatusMap.get(dropMovieShopKey);
  this.currentRentalsStatusMap.delete(dropMovieShopKey);

  if (!this.shopToMoviePriceMap.get(shopIdParamDrop)) {
    this.shopToMoviePriceMap.set(shopIdParamDrop, new Map());
  }
  this.shopToMoviePriceMap
    .get(shopIdParamDrop)
    .set(movieIdParamDrop, droppedMoviePrice);

  if (!this.movieToAvailableShopsQueueMap.has(movieIdParamDrop)) {
    this.movieToAvailableShopsQueueMap.set(
      movieIdParamDrop,
      new CustomPriorityQueue((shopOne, shopTwo) => {
        if (shopOne[1] !== shopTwo[1]) return shopOne[1] - shopTwo[1];
        return shopOne[0] - shopTwo[0];
      })
    );
  }
  this.movieToAvailableShopsQueueMap
    .get(movieIdParamDrop)
    .addEntry([shopIdParamDrop, droppedMoviePrice]);
};

MovieRentingSystem.prototype.report = function () {
  const reportResultList = [];
  const rentedItemsToRequeue = [];
  const processedRentalKeysSet = new Set();

  while (
    !this.rentedMovieRecordsQueue.isEmptyQueue() &&
    reportResultList.length < 5
  ) {
    const rentalRecord = this.rentedMovieRecordsQueue.extractTop();
    const reportedShopIdentifier = rentalRecord[0];
    const reportedMovieIdentifier = rentalRecord[1];
    const reportedMoviePrice = rentalRecord[2];
    const currentRentalRecordKey = `${reportedShopIdentifier}:${reportedMovieIdentifier}`;

    rentedItemsToRequeue.push(rentalRecord);

    if (
      this.currentRentalsStatusMap.has(currentRentalRecordKey) &&
      !processedRentalKeysSet.has(currentRentalRecordKey)
    ) {
      reportResultList.push([reportedShopIdentifier, reportedMovieIdentifier]);
      processedRentalKeysSet.add(currentRentalRecordKey);
    }
  }

  for (const recordForRequeue of rentedItemsToRequeue) {
    this.rentedMovieRecordsQueue.addEntry(recordForRequeue);
  }

  return reportResultList;
};
