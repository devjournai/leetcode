/**
 * Design Log Storage System
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
  selectedGranularity,
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
    },
  );

  const extractedIds = filteredLogPairs.map((itemPair) => itemPair[1]);
  const sortedResultIds = extractedIds.sort((valA, valB) => valA - valB);

  return sortedResultIds;
};
