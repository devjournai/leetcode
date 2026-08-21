/**
 * Compare Version Numbers
 * Intuition: Versions are sequences of numeric revisions separated by dots. Compare corresponding integers left to right, treating a missing revision as 0, until they differ or both run out.
 * Approach: 1. Split `version1` and `version2` on ".". 2. Loop `revisionIndex` up to the longer length. 3. Parse each part with `Number`, using `"0"` when a side has no part. 4. Return -1 or 1 on the first inequality; else 0 after the loop.
 * Dry Run: version1 = "1.01", version2 = "1.001"
 * Parts: 1 vs 1, then 1 vs 1 → 0
 * Time Complexity: O(L1 + L2)
 * Space Complexity: O(N1 + N2)
 */
var compareVersion = function (version1, version2) {
  const revisionsOne = version1.split(".");
  const revisionsTwo = version2.split(".");

  const maximumRevisions = Math.max(revisionsOne.length, revisionsTwo.length);

  for (
    let revisionIndex = 0;
    revisionIndex < maximumRevisions;
    revisionIndex++
  ) {
    const componentOneString = revisionsOne[revisionIndex] ?? "0";
    const componentTwoString = revisionsTwo[revisionIndex] ?? "0";

    const numericComponentOne = Number(componentOneString);
    const numericComponentTwo = Number(componentTwoString);

    if (numericComponentOne < numericComponentTwo) {
      return -1;
    }
    if (numericComponentOne > numericComponentTwo) {
      return 1;
    }
  }

  return 0;
};
