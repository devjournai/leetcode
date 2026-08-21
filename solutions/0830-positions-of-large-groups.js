/**
 * Positions Of Large Groups
 * Intuition: A large group is a run of the same letter of length ≥ 3; record inclusive start/end indices.
 * Approach: 1. `groupBegin` marks the run. 2. Advance `currentGroupEnd` while equal to `s[groupBegin]`. 3. If length ≥ 3, push `[groupBegin, currentGroupEnd-1]`. 4. Jump both pointers to the next run.
 * Dry Run: s = "abbxxxxzzy". Run "xxxx" at [3,6] only.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var largeGroupPositions = function (s) {
  const gatheredGroups = [];
  let groupBegin = 0;
  let groupIterator = 0;

  while (groupIterator < s.length) {
    let currentGroupEnd = groupIterator;
    while (currentGroupEnd < s.length && s[currentGroupEnd] === s[groupBegin]) {
      currentGroupEnd++;
    }

    const calculatedLength = currentGroupEnd - groupBegin;

    if (calculatedLength >= 3) {
      gatheredGroups.push([groupBegin, currentGroupEnd - 1]);
    }

    groupBegin = currentGroupEnd;
    groupIterator = currentGroupEnd;
  }

  return gatheredGroups;
};
