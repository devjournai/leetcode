/**
 * Remove 9
 * Time Complexity: O(log n)
 * Space Complexity: O(log n)
 */
var newInteger = function (n) {
  const convertedToBaseNine = n.toString(9);
  const finalSequenceNumber = parseInt(convertedToBaseNine, 10);

  return finalSequenceNumber;
};
