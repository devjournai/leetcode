/**
 * Form Array By Concatenating Subarrays Of Another Array
 * Time Complexity: O(N + S)
 * Space Complexity: O(N + S)
 */
var canChoose = function (groups, nums) {
  const groupStringRepresentations = groups.map(
    (singleGroup) => "," + singleGroup.join(",") + ",",
  );
  const numsCombinedString = `,${nums.join(",")},`;

  let groupIterator = 0;
  let searchStartPointer = 0;

  while (groupIterator < groupStringRepresentations.length) {
    const currentGroupPattern = groupStringRepresentations[groupIterator];
    const matchFoundIndex = numsCombinedString.indexOf(
      currentGroupPattern,
      searchStartPointer,
    );

    if (matchFoundIndex === -1) {
      return false;
    }

    searchStartPointer = matchFoundIndex + currentGroupPattern.length - 1;
    groupIterator++;
  }

  return true;
};
