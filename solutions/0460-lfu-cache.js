/**
 * Lfu Cache
 * Intuition: Map keys to values and frequencies; each frequency has a Set of keys (insertion order = LRU within that freq). Evict the oldest key at `currentMinFrequency`.
 * Approach: 1. `get`: miss → -1; else bump freq, move key between Sets, raise min freq if its Set emptied, return value. 2. `put`: capacity 0 no-op; existing key updates value then `get`. 3. If full, delete `frequencyToKeysMap.get(min).values().next()`. 4. Insert new key at freq 1 and set min to 1.
 * Dry Run: cap 2. put(1,1), put(2,2), get(1) freq(1)=2. put(3,3) evicts 2 (min freq 1). get(2) is -1.
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
    const leastFrequentKey = this.frequencyToKeysMap
      .get(this.currentMinFrequency)
      .values()
      .next().value;

    this.frequencyToKeysMap
      .get(this.currentMinFrequency)
      .delete(leastFrequentKey);

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
