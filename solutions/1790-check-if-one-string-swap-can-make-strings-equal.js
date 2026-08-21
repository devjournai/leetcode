/**
 * Check If One String Swap Can Make Strings Equal
 * Intuition: Equal strings already work. Otherwise exactly two mismatch positions must be a swap of each other.
 * Approach: 1. Collect mismatch indices; abort if more than two. 2. Zero mismatches → true. 3. Two mismatches: check s1[i]==s2[j] and s1[j]==s2[i]. 4. One mismatch → false.
 * Dry Run: s1 = "bank", s2 = "kanb".
 *   - Mismatches at 0 and 3: b/k and k/b. Swap works → true.
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
