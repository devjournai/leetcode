/**
 * Airplane Seat Assignment Probability
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var nthPersonGetsNthSeat = function (n) {
  if (n === 1) {
    return 1;
  }
  return 0.5;
};
