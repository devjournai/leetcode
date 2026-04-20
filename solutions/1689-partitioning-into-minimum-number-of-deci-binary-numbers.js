/**
 * Partitioning Into Minimum Number Of Deci-Binary Numbers
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
