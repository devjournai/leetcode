/**
 * Airplane Seat Assignment Probability
 * Intuition: Passenger 1 sitting randomly makes the last passenger equally likely to get seat 1 or n; for n=1 the probability is 1.
 * Approach: Return 1 if n==1 else 0.5.
 * Dry Run: n=1 → 1. n=2: 50% chance passenger 1 took seat 1 → last gets seat 2 with probability 0.5.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var nthPersonGetsNthSeat = function (n) {
  if (n === 1) {
    return 1;
  }
  return 0.5;
};
