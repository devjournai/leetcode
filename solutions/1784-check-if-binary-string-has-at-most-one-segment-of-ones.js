/**
 * Check if Binary String Has at Most One Segment of Ones
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var checkOnesSegment = function (s) {
  let stringLength = s.length;
  let initialIndex = 0;
  let firstZeroPosition = -1;

  for (initialIndex = 0; initialIndex < stringLength; initialIndex++) {
    let characterValue = s[initialIndex];
    if (characterValue === "0") {
      firstZeroPosition = initialIndex;
      break;
    }
  }

  if (firstZeroPosition === -1) {
    return true;
  }

  let searchIndex = firstZeroPosition + 1;
  while (searchIndex < stringLength) {
    let checkedCharacter = s[searchIndex];
    if (checkedCharacter === "1") {
      return false;
    }
    searchIndex++;
  }

  return true;
};
