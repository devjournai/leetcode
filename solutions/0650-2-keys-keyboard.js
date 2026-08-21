/**
 * 2 Keys Keyboard
 * Intuition: The cheapest way to get n A's is to factor n: each prime factor f costs f operations (Copy All once then Paste f-1 times on a block of size n/f). Sum of prime factors is the answer.
 * Approach: 1. Start `currentFactorCandidate` at 2 and `remainingTarget` at n. 2. While remaining > 1, divide out every factor, adding that factor to `totalOperations` each time. 3. Increment the candidate. 4. Return the sum.
 * Dry Run: n = 6.
 *   - Factor 2: ops=2, remaining=3. Factor 3: ops=5, remaining=1. Return 5.
 * Time Complexity: O(sqrt(n))
 * Space Complexity: O(1)
 */
var minSteps = function (n) {
  let totalOperations = 0;
  let currentFactorCandidate = 2;
  let remainingTarget = n;

  for (; remainingTarget > 1;) {
    while (remainingTarget % currentFactorCandidate === 0) {
      totalOperations += currentFactorCandidate;
      remainingTarget /= currentFactorCandidate;
    }
    currentFactorCandidate++;
  }

  return totalOperations;
};
