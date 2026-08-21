/**
 * Design Hashmap
 * Intuition: Separate chaining: 1000 buckets, each a list of [key,value] pairs. Hash is key % 1000.
 * Approach: 1. Ctor fills `hashBuckets` with empty arrays. 2. `put` scans the bucket, updates matching key or pushes. 3. `get` returns the pair’s value or -1. 4. `remove` splices the matching pair.
 * Dry Run: put(1,1), put(2,2), get(1)=1, get(3)=-1, put(2,1) overwrites, get(2)=1, remove(2), get(2)=-1.
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
