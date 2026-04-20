/**
 * Compare Version Numbers
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
