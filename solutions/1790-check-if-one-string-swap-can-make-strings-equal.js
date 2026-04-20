/**
 * Check If One String Swap Can Make Strings Equal
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var areAlmostEqual = function (s1, s2) {
  var stringLength = s1.length;
  var differenceIndices = [];

  for (var currentIndex = 0; currentIndex < stringLength; currentIndex++) {
    var charFromS1 = s1[currentIndex];
    var charFromS2 = s2[currentIndex];

    if (charFromS1 !== charFromS2) {
      differenceIndices.push(currentIndex);
      if (differenceIndices.length > 2) {
        return false;
      }
    }
  }

  var totalDifferences = differenceIndices.length;

  if (totalDifferences === 0) {
    return true;
  } else if (totalDifferences === 2) {
    var firstMismatchIndex = differenceIndices[0];
    var secondMismatchIndex = differenceIndices[1];

    var s1CharOne = s1[firstMismatchIndex];
    var s2CharOne = s2[firstMismatchIndex];
    var s1CharTwo = s1[secondMismatchIndex];
    var s2CharTwo = s2[secondMismatchIndex];

    return s1CharOne === s2CharTwo && s1CharTwo === s2CharOne;
  } else {
    return false;
  }
};
