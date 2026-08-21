/**
 * Find Median From Data Stream
 * Intuition: Split the stream into a max-heap of the smaller half and a min-heap of the larger half. The larger heap is allowed to hold one extra element so the median is its front (odd) or the average of both fronts (even).
 * Approach: 1. addNum: enqueue into largerHalf if empty or num >= its front; else smallerHalf. 2. If largerHalf size > smallerHalf+1, move min of larger to smaller; if smaller is bigger, move its max to larger. 3. findMedian: if larger is bigger return its front; else average of both fronts.
 * Dry Run: add 1, then 2, then 3.
 *   - After 1,2: smaller=[1], larger=[2], median 1.5. After 3: larger=[2,3] (no rebalance), larger is bigger.
 *   - findMedian → 2.
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
