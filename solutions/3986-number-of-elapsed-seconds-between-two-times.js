/**
 * Number of Elapsed Seconds Between Two Times
 * Intuition: Convert each time string into the number of seconds elapsed since 00:00:00, i.e. HH  *  3600 + MM  *  60 + SS, then return the difference between the two values.
 * Approach: 1. Follow Simulation. 2. Implement the official LeetCode function. 3. Return the required result.
 * Dry Run: Input: startTime = "01:00:00", endTime = "01:00:25". Output: 25.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var secondsBetweenTimes = function (startTime, endTime) {
  return f(endTime) - f(startTime);
};
var f = function (s) {
  return (
    parseInt(s.slice(0, 2)) * 3600 +
    parseInt(s.slice(3, 5)) * 60 +
    parseInt(s.slice(6))
  );
};
