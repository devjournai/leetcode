/**
 * Time Based Key Value Store
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
