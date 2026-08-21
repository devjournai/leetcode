/**
 * Design Log Storage System
 * Intuition: Truncate timestamps to the requested granularity, then compare lexicographically after padding the rest of the 19-char string with 0s (start/logs) or 9s (end).
 * Approach: 1. `put` appends `[timeString, logId]`. 2. `retrieve` maps granularity to a prefix length (`granuleMap`). 3. Build inclusive bounds by slicing and `padEnd(19, '0'|'9')`. 4. Filter entries whose truncated time lies in range, then sort ids numerically.
 * Dry Run: put(1,'2017:01:01:23:59:59'); retrieve('2017:01:01:23:59:59','2017:01:02:00:00:00','Hour') with prefix 13 → start padded ...00, end padded ...99; log 1 is included.
 * Time Complexity: O(N * L + N log N)
 * Space Complexity: O(N * L)
 */
var LogSystem = function () {
  this.entries = [];
  this.granuleMap = {
    Year: 4,
    Month: 7,
    Day: 10,
    Hour: 13,
    Minute: 16,
    Second: 19,
  };
};

LogSystem.prototype.put = function (logIdToStore, timeString) {
  this.entries.push([timeString, logIdToStore]);
};

LogSystem.prototype.retrieve = function (
  queryStartTime,
  queryEndTime,
  selectedGranularity
) {
  const compareLength = this.granuleMap[selectedGranularity];
  const computedStartString = queryStartTime
    .slice(0, compareLength)
    .padEnd(19, "0");
  const computedEndString = queryEndTime
    .slice(0, compareLength)
    .padEnd(19, "9");

  const filteredLogPairs = this.entries.filter(
    ([logTimeValue, logIdentifierValue]) => {
      const parsedLogTimeValue = logTimeValue
        .slice(0, compareLength)
        .padEnd(19, "0");
      return (
        parsedLogTimeValue >= computedStartString &&
        parsedLogTimeValue <= computedEndString
      );
    }
  );

  const extractedIds = filteredLogPairs.map((itemPair) => itemPair[1]);
  const sortedResultIds = extractedIds.sort((valA, valB) => valA - valB);

  return sortedResultIds;
};
