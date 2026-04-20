/**
 * Find Median From Data Stream
 * Time Complexity: O(log N)
 * Space Complexity: O(N)
 */
var MedianFinder = function () {
  this.smallerHalf = new MaxPriorityQueue();
  this.largerHalf = new MinPriorityQueue();
};

MedianFinder.prototype.addNum = function (incomingNum) {
  if (
    !this.largerHalf.size() ||
    incomingNum >= this.largerHalf.front().element
  ) {
    this.largerHalf.enqueue(incomingNum);
  } else {
    this.smallerHalf.enqueue(incomingNum);
  }

  if (this.largerHalf.size() > this.smallerHalf.size() + 1) {
    this.smallerHalf.enqueue(this.largerHalf.dequeue().element);
  } else if (this.smallerHalf.size() > this.largerHalf.size()) {
    this.largerHalf.enqueue(this.smallerHalf.dequeue().element);
  }
};

MedianFinder.prototype.findMedian = function () {
  if (this.largerHalf.size() > this.smallerHalf.size()) {
    return this.largerHalf.front().element;
  } else {
    return (
      (this.largerHalf.front().element + this.smallerHalf.front().element) / 2
    );
  }
};
