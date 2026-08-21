/**
 * Form Array By Concatenating Subarrays Of Another Array
 * Intuition: Groups must appear as contiguous, non-overlapping subarrays of `nums` in order. Comma-wrapping each group and `nums` lets sequential `indexOf` searches enforce that.
 * Approach: 1. Map groups to comma-wrapped strings and build `numsCombinedString`. 2. Search each `currentGroupPattern` from `searchStartPointer`. 3. On miss return false; on hit advance by pattern length minus one. 4. Return true after every group matches.
 * Dry Run: groups = [[1,-1,-1],[3,-2,0]], nums = [1,-1,0,1,-1,-1,3,-2,0].
 *   - First pattern matches the second 1,-1,-1; the next search then finds [3,-2,0]. Return true.
 * Time Complexity: O(N + S)
 * Space Complexity: O(N + S)
 */
var canChoose = function (groups, nums) {
  const groupStringRepresentations = groups.map(
    (singleGroup) => "," + singleGroup.join(",") + ","
  );
  const numsCombinedString = `,${nums.join(",")},`;

  let groupIterator = 0;
  let searchStartPointer = 0;

  while (groupIterator < groupStringRepresentations.length) {
    const currentGroupPattern = groupStringRepresentations[groupIterator];
    const matchFoundIndex = numsCombinedString.indexOf(
      currentGroupPattern,
      searchStartPointer
    );

    if (matchFoundIndex === -1) {
      return false;
    }

    searchStartPointer = matchFoundIndex + currentGroupPattern.length - 1;
    groupIterator++;
  }

  return true;
};
