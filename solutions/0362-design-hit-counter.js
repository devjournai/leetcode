/**
 * Design Hit Counter
 * Intuition: Hits in the last 300 seconds fit in 300 circular buckets keyed by `timestamp % 300`; a bucket is reused only when its stored timestamp matches, otherwise it is overwritten as a new second.
 * Approach: 1. Two length-300 arrays: timestamps and counts. 2. `hit` indexes `timestamp % 300`; same timestamp increments the count, else reset count to 1 and store the timestamp. 3. `getHits` sums every bucket whose timestamp is strictly greater than `timestamp - 300`.
 * Dry Run: hit(1), hit(2), hit(300). getHits(300) includes buckets 1,2,300 (all > 0) → 3. getHits(301) drops timestamp 1 (not > 1) → 2.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var HitCounter = function () {
  this.timeStampsArray = new Array(300).fill(0);
  this.totalCountsArray = new Array(300).fill(0);
};

HitCounter.prototype.hit = function (timestamp) {
  let currentSecondSlot = timestamp % 300;

  if (this.timeStampsArray[currentSecondSlot] === timestamp) {
    this.totalCountsArray[currentSecondSlot]++;
  } else {
    this.timeStampsArray[currentSecondSlot] = timestamp;
    this.totalCountsArray[currentSecondSlot] = 1;
  }
};

HitCounter.prototype.getHits = function (timestamp) {
  let allRecentHits = 0;
  let minimumValidTime = timestamp - 300;

  for (let counterIndex = 0; counterIndex < 300; counterIndex++) {
    let bucketTimestamp = this.timeStampsArray[counterIndex];
    if (bucketTimestamp > minimumValidTime) {
      allRecentHits += this.totalCountsArray[counterIndex];
    }
  }

  return allRecentHits;
};
