/**
 * Kth Largest Element In A Stream
 * Intuition: A min-heap of size k stores the k largest values seen; its front is the kth largest.
 * Approach: 1. Constructor enqueues each `initialScores` value into `MinPriorityQueue` and dequeues while size > `targetK`. 2. `add` enqueues `newIncomingScore`, trims if size > k, returns `front()`.
 * Dry Run: k=3, nums=[4,5,8,2]. Heap after ctor [4,5,8], front 4. add(3) still 4; add(5) heap [5,5,8] front 5; add(10) [5,8,10] front 5; add(9) [8,9,10] front 8.
 * Time Complexity: O(N log K)
 * Space Complexity: O(K)
 */
var KthLargest = function (kValue, initialScores) {
  this.targetK = kValue;
  this.priorityQueueInstance = new MinPriorityQueue((itemValue) => itemValue);

  for (let singleScore of initialScores) {
    this.priorityQueueInstance.enqueue(singleScore);
    if (this.priorityQueueInstance.size() > this.targetK) {
      this.priorityQueueInstance.dequeue();
    }
  }
};

KthLargest.prototype.add = function (newIncomingScore) {
  this.priorityQueueInstance.enqueue(newIncomingScore);
  if (this.priorityQueueInstance.size() > this.targetK) {
    this.priorityQueueInstance.dequeue();
  }
  const currentKthLargest = this.priorityQueueInstance.front();
  return currentKthLargest;
};
