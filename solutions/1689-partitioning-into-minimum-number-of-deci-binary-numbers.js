/**
 * Partitioning Into Minimum Number Of Deci-Binary Numbers
 * Intuition: A deci-binary digit is 0 or 1, so forming a decimal digit `d` needs `d` such numbers in that place. The whole number therefore needs as many deci-binaries as its maximum digit.
 * Approach: 1. Scan each character of `n`, parse to `numericalValue`. 2. Track `maximumDigitSeen`. 3. Return that maximum.
 * Dry Run: n = "32"
 * digits 3,2 → max = 3 (e.g. 11+11+10).
 * Time Complexity: O(L)
 * Space Complexity: O(1)
 */
var minPartitions = function (n) {
  let maximumDigitSeen = 0;

  for (let currentIndex = 0; currentIndex < n.length; currentIndex++) {
    const characterAtIndex = n[currentIndex];
    const numericalValue = parseInt(characterAtIndex, 10);

    if (numericalValue > maximumDigitSeen) {
      maximumDigitSeen = numericalValue;
    }
  }

  return maximumDigitSeen;
};
