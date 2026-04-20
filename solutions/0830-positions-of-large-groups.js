/**
 * Positions Of Large Groups
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
