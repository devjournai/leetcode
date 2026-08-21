/**
 * Number Of Recent Calls
 * Intuition: Pings are chronological, so times older than t−3000 sit at the front of a queue and can be dropped in a prefix splice.
 * Approach: 1. Constructor: empty `requestTimesCollection`. 2. `ping(t)`: push t. 3. Count how many prefix times are < t−3000, then `splice(0, count)`. 4. Return remaining length.
 * Dry Run: ping(1)→1, ping(100)→2, ping(3001)→3, ping(3002) drops 1 → 3.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var RecentCounter = function () {
  this.requestTimesCollection = [];
};

RecentCounter.prototype.ping = function (t) {
  this.requestTimesCollection.push(t);

  const timeWindowStart = t - 3000;
  let elementsToRemoveCount = 0;

  for (
    let iteratorIndex = 0;
    iteratorIndex < this.requestTimesCollection.length;
    iteratorIndex++
  ) {
    if (this.requestTimesCollection[iteratorIndex] < timeWindowStart) {
      elementsToRemoveCount++;
    } else {
      break;
    }
  }

  if (elementsToRemoveCount > 0) {
    this.requestTimesCollection.splice(0, elementsToRemoveCount);
  }

  return this.requestTimesCollection.length;
};
