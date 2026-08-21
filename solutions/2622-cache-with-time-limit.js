/**
 * Cache With Time Limit
 * Intuition: Store key-value pairs along with their expiration timestamps. When a key is accessed or the cache is counted, compare the current time with the stored expiration timestamp to determine validity.
 * Approach: 1. Initialize a `Map` in the constructor to store all cache entries, where each entry is an array `[value, expirationTimestamp]`. 2. For `set`, check if the key already exists and is unexpired; store this boolean for the return value. Then, update/add the key with the new value and a calculated expiration timestamp (`Date.now() + duration`). 3. For `get`, retrieve the entry. If the key doesn't exist or its expiration timestamp is in the past, return `-1`. Otherwise, return the stored value. 4. For `count`, iterate through all values in the internal map, and for each entry, check if its expiration timestamp is in the future. Increment a counter for each valid entry and return the total.
 * Dry Run:
 *   Initialize: `cacheInstance = new TimeLimitedCache()`
 *   `cacheInstance.dataMap` is an empty Map.
 *
 *   `cacheInstance.set(1, 100, 50)`
 *     `incomingKey = 1`, `newValue = 100`, `durationMilliseconds = 50`
 *     Assume `currentMoment` = `1000`
 *     `expirationTimepoint` = `1000 + 50 = 1050`
 *     `existingMapping` = `undefined`
 *     `wasPresentAndValid` = `false` (since `existingMapping` is `undefined`)
 *     `cacheInstance.dataMap` becomes `Map { 1 => [100, 1050] }`
 *     Return `false`.
 *
 *   `cacheInstance.get(1)`
 *     `queryKeyIdentifier = 1`
 *     `retrievedInformation` = `[100, 1050]` (from `cacheInstance.dataMap.get(1)`)
 *     Assume `currentTick` = `1010`
 *     `cachedResultValue` = `100`
 *     `recordExpirationBoundary` = `1050`
 *     `1050 > 1010` is `true`.
 *     Return `100`.
 *
 *   `cacheInstance.count()`
 *     `activeItemCounter = 0`
 *     Assume `presentTime` = `1020`
 *     `mapValuesIterator` provides `[100, 1050]`
 *     `currentCacheItemEntry` = `[100, 1050]`
 *     `entryExpirationPoint` = `1050`
 *     `1050 > 1020` is `true`.
 *     `activeItemCounter` becomes `1`.
 *     (No more items)
 *     Return `1`.
 *
 *   Assume `Date.now()` is `1060` now.
 *   `cacheInstance.get(1)`
 *     `queryKeyIdentifier = 1`
 *     `retrievedInformation` = `[100, 1050]`
 *     `currentTick` = `1060`
 *     `cachedResultValue` = `100`
 *     `recordExpirationBoundary` = `1050`
 *     `1050 > 1060` is `false`.
 *     Return `-1`.
 *
 *   `cacheInstance.count()`
 *     `activeItemCounter = 0`
 *     Assume `presentTime` = `1070`
 *     `mapValuesIterator` provides `[100, 1050]`
 *     `currentCacheItemEntry` = `[100, 1050]`
 *     `entryExpirationPoint` = `1050`
 *     `1050 > 1070` is `false`.
 *     `activeItemCounter` remains `0`.
 *     (No more items)
 *     Return `0`.
 *
 * Time Complexity: O(1)
 * Space Complexity: O(N)
 */
var TimeLimitedCache = function () {
  this.dataMap = new Map();
};

TimeLimitedCache.prototype.set = function (
  incomingKey,
  newValue,
  durationMilliseconds
) {
  const currentMoment = Date.now();
  const expirationTimepoint = currentMoment + durationMilliseconds;
  const existingMapping = this.dataMap.get(incomingKey);

  let wasPresentAndValid = false;
  if (existingMapping) {
    if (existingMapping[1] > currentMoment) {
      wasPresentAndValid = true;
    }
  }

  this.dataMap.set(incomingKey, [newValue, expirationTimepoint]);
  return wasPresentAndValid;
};

TimeLimitedCache.prototype.get = function (queryKeyIdentifier) {
  const retrievedInformation = this.dataMap.get(queryKeyIdentifier);
  if (!retrievedInformation) {
    return -1;
  }

  const currentTick = Date.now();
  const cachedResultValue = retrievedInformation[0];
  const recordExpirationBoundary = retrievedInformation[1];

  if (recordExpirationBoundary > currentTick) {
    return cachedResultValue;
  } else {
    return -1;
  }
};

TimeLimitedCache.prototype.count = function () {
  let activeItemCounter = 0;
  const presentTime = Date.now();
  const mapValuesIterator = this.dataMap.values();

  for (const currentCacheItemEntry of mapValuesIterator) {
    const entryExpirationPoint = currentCacheItemEntry[1];
    if (entryExpirationPoint > presentTime) {
      activeItemCounter++;
    }
  }
  return activeItemCounter;
};
