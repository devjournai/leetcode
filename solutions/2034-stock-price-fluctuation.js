/**
  * Stock Price Fluctuation
  * Intuition: Maintain current prices in a hash map for quick updates and latest price lookup. Use two priority queues (min-heap and max-heap) to efficiently find the minimum and maximum prices. Handle price corrections (updates) by lazily deleting stale prices from the heaps; when querying, only consider prices that match the current price recorded in the hash map for their respective timestamps.
  * Approach: 1. Initialize a Map `priceRecords` to store `timestamp -> price` mappings. Initialize `latestKnownTimestamp` to track the highest timestamp seen. Initialize `minPriceHeap` and `maxPriceHeap` as priority queues. 2. For `update(timestamp, price)`, store the new `price` in `priceRecords` for `timestamp`, update `latestKnownTimestamp` if `timestamp` is greater, and enqueue `[price, timestamp]` into both heaps. 3. For `current()`, return the price from `priceRecords` associated with `latestKnownTimestamp`. 4. For `maximum()`, repeatedly dequeue from `maxPriceHeap`. For each `[potentialMaxPrice, keyTimestamp]`, check if `potentialMaxPrice` is equal to `priceRecords.get(keyTimestamp)`. If not, it's a stale record; discard it and continue. If it matches, it's the current maximum; re-enqueue it into `maxPriceHeap` to preserve it for future queries and return `potentialMaxPrice`. 5. For `minimum()`, apply the same lazy deletion logic as `maximum()`, but using `minPriceHeap` and checking for the minimum valid price.
  * Dry Run:
    StockPrice() -> priceRecords={}, latestKnownTimestamp=0, minPriceHeap=PQ(), maxPriceHeap=PQ()
    update(1, 10) -> priceRecords={1:10}, latestKnownTimestamp=1. maxPriceHeap=[[10,1]], minPriceHeap=[[10,1]]
    update(2, 5) -> priceRecords={1:10, 2:5}, latestKnownTimestamp=2. maxPriceHeap=[[10,1],[5,2]], minPriceHeap=[[5,2],[10,1]]
    current() -> Returns priceRecords.get(latestKnownTimestamp=2) -> 5
    maximum() ->
      1. Dequeue from maxPriceHeap -> [10,1]. priceRecords.get(1) is 10. Match.
      2. Enqueue [10,1] back. Returns 10.
    minimum() ->
      1. Dequeue from minPriceHeap -> [5,2]. priceRecords.get(2) is 5. Match.
      2. Enqueue [5,2] back. Returns 5.
    update(1, 12) -> priceRecords={1:12, 2:5}, latestKnownTimestamp=2. maxPriceHeap=[[12,1],[10,1],[5,2]], minPriceHeap=[[5,2],[10,1],[12,1]]
    maximum() ->
      1. Dequeue from maxPriceHeap (e.g., [12,1]). priceRecords.get(1) is 12. Match.
      2. Enqueue [12,1] back. Returns 12.
      (Alternative path if [10,1] was dequeued first due to heap internal order):
      1. Dequeue [10,1]. priceRecords.get(1) is 12. No match (10!=12). Continue.
      2. Dequeue [12,1]. priceRecords.get(1) is 12. Match.
      3. Enqueue [12,1] back. Returns 12.
  * Time Complexity: O(logN)
  * Space Complexity: O(N)
*/
var StockPrice = function () {
  this.priceRecords = new Map();
  this.latestKnownTimestamp = 0;
  this.minPriceHeap = new PriorityQueue(
    (firstItem, secondItem) => firstItem[0] - secondItem[0],
  );
  this.maxPriceHeap = new PriorityQueue(
    (firstItem, secondItem) => secondItem[0] - firstItem[0],
  );
};

StockPrice.prototype.update = function (timestampValue, priceValue) {
  this.priceRecords.set(timestampValue, priceValue);
  this.latestKnownTimestamp = Math.max(
    this.latestKnownTimestamp,
    timestampValue,
  );

  this.minPriceHeap.enqueue([priceValue, timestampValue]);
  this.maxPriceHeap.enqueue([priceValue, timestampValue]);
};

StockPrice.prototype.current = function () {
  return this.priceRecords.get(this.latestKnownTimestamp);
};

StockPrice.prototype.maximum = function () {
  let highestPriceCandidate;
  let candidateTimestampIdentifier;
  let validMaximumFound = false;

  while (!validMaximumFound) {
    [highestPriceCandidate, candidateTimestampIdentifier] =
      this.maxPriceHeap.dequeue();
    let actualPriceForThisTimestamp = this.priceRecords.get(
      candidateTimestampIdentifier,
    );

    if (highestPriceCandidate === actualPriceForThisTimestamp) {
      validMaximumFound = true;
    }
  }

  this.maxPriceHeap.enqueue([
    highestPriceCandidate,
    candidateTimestampIdentifier,
  ]);
  return highestPriceCandidate;
};

StockPrice.prototype.minimum = function () {
  let lowestPriceCandidate;
  let timestampKeyForCandidate;
  let isCurrentMinimum = false;

  while (!isCurrentMinimum) {
    [lowestPriceCandidate, timestampKeyForCandidate] =
      this.minPriceHeap.dequeue();
    let priceStoredInMap = this.priceRecords.get(timestampKeyForCandidate);

    if (lowestPriceCandidate === priceStoredInMap) {
      isCurrentMinimum = true;
    }
  }

  this.minPriceHeap.enqueue([lowestPriceCandidate, timestampKeyForCandidate]);
  return lowestPriceCandidate;
};
