/**
 * Lru Cache
 * Intuition: A JavaScript `Map` keeps insertion order. Deleting and re-inserting a key moves it to most-recent; the first key is the least recently used and can be evicted in O(1).
 * Approach: 1. Construct with `cacheLimit` and empty `dataStore`. 2. `get`: if missing return -1; else `delete` then `set` the same value so it is newest, then return it. 3. `put`: if the key exists, delete it; `set` the new value. 4. If `dataStore.size` exceeds `cacheLimit`, delete `dataStore.keys().next().value` (oldest).
 * Dry Run: capacity=2; put(1,1), put(2,2), get(1)→1, put(3,3) evicts key 2, get(2)→-1
 * After get(1), order is 2 then 1; put(3) drops 2.
 * Time Complexity: O(1)
 * Space Complexity: O(N)
 */
var LRUCache = function (capacity) {
  this.cacheLimit = capacity;
  this.dataStore = new Map();
};

LRUCache.prototype.get = function (key) {
  if (!this.dataStore.has(key)) {
    return -1;
  }

  const retrievedCacheValue = this.dataStore.get(key);
  this.dataStore.delete(key);
  this.dataStore.set(key, retrievedCacheValue);
  return retrievedCacheValue;
};

LRUCache.prototype.put = function (key, value) {
  if (this.dataStore.has(key)) {
    this.dataStore.delete(key);
  }

  this.dataStore.set(key, value);

  const currentStorageSize = this.dataStore.size;
  if (currentStorageSize > this.cacheLimit) {
    const leastUsedKey = this.dataStore.keys().next().value;
    this.dataStore.delete(leastUsedKey);
  }
};
