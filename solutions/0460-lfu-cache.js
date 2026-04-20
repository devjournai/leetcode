/**
 * Lfu Cache
 * Time Complexity: O(1)
 * Space Complexity: O(N)
*/
var LFUCache = function (inputCapacity) {
  this.currentCapacity = inputCapacity;
  this.currentSize = 0;
  this.currentMinFrequency = 0;

  this.cacheItems = new Map();
  this.itemFrequencies = new Map();
  this.frequencyToKeysMap = new Map();
};

LFUCache.prototype.get = function (retrievalKey) {
  if (!this.cacheItems.has(retrievalKey)) {
    return -1;
  }

  const existingValue = this.cacheItems.get(retrievalKey);
  const currentKeyFrequency = this.itemFrequencies.get(retrievalKey);
  const nextKeyFrequency = currentKeyFrequency + 1;

  this.itemFrequencies.set(retrievalKey, nextKeyFrequency);

  this.frequencyToKeysMap.get(currentKeyFrequency).delete(retrievalKey);

  if (this.frequencyToKeysMap.get(currentKeyFrequency).size === 0) {
    this.frequencyToKeysMap.delete(currentKeyFrequency);
    if (this.currentMinFrequency === currentKeyFrequency) {
      this.currentMinFrequency++;
    }
  }

  if (!this.frequencyToKeysMap.has(nextKeyFrequency)) {
    this.frequencyToKeysMap.set(nextKeyFrequency, new Set());
  }
  this.frequencyToKeysMap.get(nextKeyFrequency).add(retrievalKey);

  return existingValue;
};

LFUCache.prototype.put = function (inputKey, inputValue) {
  if (this.currentCapacity === 0) {
    return;
  }

  if (this.cacheItems.has(inputKey)) {
    this.cacheItems.set(inputKey, inputValue);
    this.get(inputKey);
    return;
  }

  if (this.currentSize === this.currentCapacity) {
    const leastFrequentKey = this.frequencyToKeysMap.get(this.currentMinFrequency).values().next().value;

    this.frequencyToKeysMap.get(this.currentMinFrequency).delete(leastFrequentKey);

    if (this.frequencyToKeysMap.get(this.currentMinFrequency).size === 0) {
      this.frequencyToKeysMap.delete(this.currentMinFrequency);
    }

    this.cacheItems.delete(leastFrequentKey);
    this.itemFrequencies.delete(leastFrequentKey);
    this.currentSize--;
  }

  this.cacheItems.set(inputKey, inputValue);
  this.itemFrequencies.set(inputKey, 1);

  if (!this.frequencyToKeysMap.has(1)) {
    this.frequencyToKeysMap.set(1, new Set());
  }
  this.frequencyToKeysMap.get(1).add(inputKey);

  this.currentMinFrequency = 1;
  this.currentSize++;
};