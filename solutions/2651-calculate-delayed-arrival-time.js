/**
 * Calculate Delayed Arrival Time
 * Intuition: The final arrival time is the sum of the initial arrival time and the delay. Since time operates on a 24-hour cycle, any sum exceeding 23 must wrap around, which can be achieved using the modulo 24 operation.
 * Approach: 1. Calculate the straightforward sum of the given 'arrivalTime' and 'delayedTime'. 2. Apply the modulo 24 operator to this sum to convert it into the correct 24-hour format (values from 0 to 23).
 * Dry Run: arrivalTime = 13, delayedTime = 5 => (13 + 5) % 24 = 18 % 24 = 18.
 *         arrivalTime = 15, delayedTime = 10 => (15 + 10) % 24 = 25 % 24 = 1.
 *         arrivalTime = 0, delayedTime = 24 => (0 + 24) % 24 = 24 % 24 = 0.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var findDelayedArrivalTime = function (arrivalTime, delayedTime) {
  return (arrivalTime + delayedTime) % 24;
};
