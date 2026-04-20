/**
 * Number Of Substrings Containing All Three Characters
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var numberOfSubstrings = function (s) {
  const characterCountsTracker = [0, 0, 0];
  let totalValidSubstrings = 0;
  let leftPointerIndex = 0;
  let rightPointerIndex = 0;

  while (rightPointerIndex < s.length) {
    const charCurrentRightIndex = s.charCodeAt(rightPointerIndex) - 97;
    characterCountsTracker[charCurrentRightIndex]++;

    while (
      characterCountsTracker[0] > 0 &&
      characterCountsTracker[1] > 0 &&
      characterCountsTracker[2] > 0
    ) {
      totalValidSubstrings += s.length - rightPointerIndex;
      const charCurrentLeftIndex = s.charCodeAt(leftPointerIndex) - 97;
      characterCountsTracker[charCurrentLeftIndex]--;
      leftPointerIndex++;
    }
    rightPointerIndex++;
  }

  return totalValidSubstrings;
};
