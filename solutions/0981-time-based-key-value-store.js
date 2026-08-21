/**
 * Time Based Key Value Store
 * Intuition: Store each key's `(time, value)` list in insertion order. `get` binary-searches the rightmost timestamp ≤ `requestTime`.
 * Approach: 1. `set` appends `[requestTime, storedValue]` to `dataStorage`. 2. `get` binary-searches: if `currentPointTime > requestTime` shrink `searchEnd`, else `searchStart = mid+1`. 3. If `searchStart===0` return ""; else return the pair at `searchStart-1`.
 * Dry Run: set("foo","bar",1); get("foo",1) → search lands after index 0 → "bar". get("foo",0) → searchStart 0 → "".
 * Time Complexity: O(1)
 * Space Complexity: O(N)
 */
class TimeMap {
  constructor() {
    this.dataStorage = new Map();
  }

  set(identifierKey, storedValue, requestTime) {
    let timestampedRecords = this.dataStorage.get(identifierKey);
    if (!timestampedRecords) {
      timestampedRecords = [];
      this.dataStorage.set(identifierKey, timestampedRecords);
    }
    timestampedRecords.push([requestTime, storedValue]);
  }

  get(identifierKey, requestTime) {
    const timeValueList = this.dataStorage.get(identifierKey);
    if (!timeValueList || timeValueList.length === 0) {
      return "";
    }

    let searchStart = 0;
    let searchEnd = timeValueList.length;

    while (searchStart < searchEnd) {
      const centralPoint = Math.floor((searchStart + searchEnd) / 2);
      const [currentPointTime, currentPointValue] = timeValueList[centralPoint];

      if (currentPointTime > requestTime) {
        searchEnd = centralPoint;
      } else {
        searchStart = centralPoint + 1;
      }
    }

    if (searchStart === 0) {
      return "";
    } else {
      const finalIndex = searchStart - 1;
      return timeValueList[finalIndex][1];
    }
  }
}
