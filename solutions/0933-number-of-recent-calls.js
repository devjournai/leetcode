/**
 * Number Of Recent Calls
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
