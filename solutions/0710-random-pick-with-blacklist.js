/**
 * Random Pick With Blacklist
 * Time Complexity: O(L)
 * Space Complexity: O(L)
 */
var Solution = function (initialTotalCount, blacklistedNumbersArray) {
  this.effectiveTotalCount = initialTotalCount - blacklistedNumbersArray.length;
  this.blacklistedRemappings = new Map();

  const forbiddenSetStorage = new Set(blacklistedNumbersArray);

  let upperRangeCandidate = initialTotalCount - 1;

  for (const currentBlacklistedValue of blacklistedNumbersArray) {
    if (currentBlacklistedValue < this.effectiveTotalCount) {
      while (forbiddenSetStorage.has(upperRangeCandidate)) {
        upperRangeCandidate--;
      }
      this.blacklistedRemappings.set(
        currentBlacklistedValue,
        upperRangeCandidate,
      );
      upperRangeCandidate--;
    }
  }
};

Solution.prototype.pick = function () {
  const randomPointerValue = Math.floor(
    Math.random() * this.effectiveTotalCount,
  );

  return (
    this.blacklistedRemappings.get(randomPointerValue) ?? randomPointerValue
  );
};
