/**
 * Design Hashmap
 * Time Complexity: O(1)
 * Space Complexity: O(M + N)
 */
var MyHashMap = function () {
  this.totalBuckets = 1000;
  this.hashBuckets = new Array(this.totalBuckets);
  for (
    let currentBucketIndex = 0;
    currentBucketIndex < this.totalBuckets;
    currentBucketIndex++
  ) {
    this.hashBuckets[currentBucketIndex] = [];
  }
};

MyHashMap.prototype.put = function (keyInput, valueInput) {
  let bucketLocation = keyInput % this.totalBuckets;
  let targetBucket = this.hashBuckets[bucketLocation];
  let initialLength = targetBucket.length;

  for (let entryPosition = 0; entryPosition < initialLength; entryPosition++) {
    let currentEntry = targetBucket[entryPosition];
    if (currentEntry[0] === keyInput) {
      currentEntry[1] = valueInput;
      return;
    }
  }
  targetBucket.push([keyInput, valueInput]);
};

MyHashMap.prototype.get = function (keyLookup) {
  let bucketCoordinate = keyLookup % this.totalBuckets;
  let relevantBucket = this.hashBuckets[bucketCoordinate];
  let bucketItemCount = relevantBucket.length;

  for (let itemPosition = 0; itemPosition < bucketItemCount; itemPosition++) {
    let itemEntry = relevantBucket[itemPosition];
    if (itemEntry[0] === keyLookup) {
      return itemEntry[1];
    }
  }
  return -1;
};

MyHashMap.prototype.remove = function (keyToRemove) {
  let bucketPlace = keyToRemove % this.totalBuckets;
  let specificBucket = this.hashBuckets[bucketPlace];
  let currentBucketSize = specificBucket.length;

  for (let elementIndex = 0; elementIndex < currentBucketSize; elementIndex++) {
    let bucketElement = specificBucket[elementIndex];
    if (bucketElement[0] === keyToRemove) {
      specificBucket.splice(elementIndex, 1);
      return;
    }
  }
};
