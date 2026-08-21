/**
 * Minimize the Maximum Waiting Time at Synchronized Traffic Lights
 * Intuition: Let mx = max(lights) be the longest green duration. For car j, let r = arrivalTime[j] bmod period.
 * Approach: Let mx = max(lights) be the longest green duration. For car j, let r = arrivalTime[j] bmod period. - If r < mx, we can assign the car to the light with the longest green phase, and the waiting time is 0. - If r ge mx, then r ge lights[i] for every light, so the waiting time is period - r regardless of the assignment. Therefore, the penalty is the maximum of period - r over all cars with r ge mx. If every car can pass during a green light, the answer is 0.
 * Dry Run: Input: period = 8, lights = [2,3], arrivalTime = [2,5,8,11]. Output: 5.
 * Time Complexity: O(n+m)
 * Space Complexity: O(1)
 */
var minPenalty = function (period, lights, arrivalTime) {
  const mx = Math.max(...lights);

  let ans = 0;

  for (const x of arrivalTime) {
    const r = x % period;

    if (r >= mx) {
      ans = Math.max(ans, period - r);
    }
  }

  return ans;
};
