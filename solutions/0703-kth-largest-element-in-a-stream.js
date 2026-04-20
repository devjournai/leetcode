/**
 * Kth Largest Element In A Stream
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
