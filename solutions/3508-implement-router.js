/**
 * Implement Router
 * Intuition: Store unique packets in FIFO order, keep per-destination timestamp lists, and binary-search counts after forwarded packets are skipped.
 * Approach: 1. addPacket: reject duplicates; if full, forward the oldest; enqueue and append timestamp. 2. forwardPacket: dequeue, drop from the set, advance that destination's processed index. 3. getCount: bisect timestamps in [startTime, endTime] from the processed index.
 * Dry Run: memoryLimit=2, add (1,4,1), add (2,5,2), getCount(5,1,2)→1, forwardPacket→[1,4,1].
 * Time Complexity: add/forward O(1) amortized, getCount O(log N)
 * Space Complexity: O(N)
 */
var Router = function (memoryLimit) {
  this.memoryLimit = memoryLimit;
  this.uniquePackets = new Set();
  this.packetQueue = [];
  this.destinationTimestamps = new Map();
  this.processedPacketIndex = new Map();
};

Router.prototype._key = function (source, destination, timestamp) {
  return `${source},${destination},${timestamp}`;
};

Router.prototype.addPacket = function (source, destination, timestamp) {
  const key = this._key(source, destination, timestamp);
  if (this.uniquePackets.has(key)) {
    return false;
  }
  if (this.packetQueue.length === this.memoryLimit) {
    this.forwardPacket();
  }
  this.packetQueue.push([source, destination, timestamp]);
  this.uniquePackets.add(key);
  if (!this.destinationTimestamps.has(destination)) {
    this.destinationTimestamps.set(destination, []);
  }
  this.destinationTimestamps.get(destination).push(timestamp);
  return true;
};

Router.prototype.forwardPacket = function () {
  if (!this.packetQueue.length) {
    return [];
  }
  const [source, destination, timestamp] = this.packetQueue.shift();
  this.uniquePackets.delete(this._key(source, destination, timestamp));
  this.processedPacketIndex.set(
    destination,
    (this.processedPacketIndex.get(destination) || 0) + 1
  );
  return [source, destination, timestamp];
};

Router.prototype.getCount = function (destination, startTime, endTime) {
  if (!this.destinationTimestamps.has(destination)) {
    return 0;
  }
  const timestamps = this.destinationTimestamps.get(destination);
  const startIndex = this.processedPacketIndex.get(destination) || 0;
  const lowerBound = this._bisectLeft(timestamps, startTime, startIndex);
  const upperBound = this._bisectRight(timestamps, endTime, startIndex);
  return upperBound - lowerBound;
};

Router.prototype._bisectLeft = function (arr, target, lo) {
  let left = lo;
  let right = arr.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] >= target) right = mid;
    else left = mid + 1;
  }
  return left;
};

Router.prototype._bisectRight = function (arr, target, lo) {
  let left = lo;
  let right = arr.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] > target) right = mid;
    else left = mid + 1;
  }
  return left;
};
