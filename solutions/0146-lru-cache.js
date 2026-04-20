/**
 * Lru Cache
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
