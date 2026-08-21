/**
 * Elevator Requests I
 * Intuition: The elevator starts at floor 0 and serves requests in the given order. The travel time between two consecutive requests is the absolute difference of their floor numbers. The first request goes from floor 0 to requests[0], which takes requests[0] seconds. Then we add the absolute differences of adjacent requests.
 * Approach: 1. Follow Simulation. 2. Implement the official LeetCode function. 3. Return the required result.
 * Dry Run: Input: n = 5, requests = [2,1,4,3]. Output: 7.
 * Time Complexity: O(m)
 * Space Complexity: O(1)
 */
var elevatorRequests = function (n, requests) {
  let ans = requests[0];
  for (let i = 1; i < requests.length; ++i) {
    ans += Math.abs(requests[i] - requests[i - 1]);
  }
  return ans;
};
