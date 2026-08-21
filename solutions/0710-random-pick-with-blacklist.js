/**
 * Random Pick With Blacklist
 * Intuition: Sample uniformly from the whitelist of size n-|blacklist| by remapping blacklisted indices in [0, whitelist) onto unused numbers in [whitelist, n).
 * Approach: 1. `effectiveTotalCount = n - L`. 2. For each blacklist value < whitelist, walk `upperRangeCandidate` down past forbidden numbers and map that blacklist key to the candidate. 3. `pick` draws r in [0, whitelist) and returns the remap or r itself.
 * Dry Run: n=7, blacklist=[2,3,5]. whitelist=4. Map 2→6, 3→4 (5 skipped as ≥4). pick() of 0,1,4,6 are the legal values 0,1,4,6.
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
        upperRangeCandidate
      );
      upperRangeCandidate--;
    }
  }
};

Solution.prototype.pick = function () {
  const randomPointerValue = Math.floor(
    Math.random() * this.effectiveTotalCount
  );

  return (
    this.blacklistedRemappings.get(randomPointerValue) ?? randomPointerValue
  );
};
