/**
 * Min Cost Climbing Stairs
 * Intuition: Cost to stand on step i is `cost[i]` plus the cheaper of the two previous standing costs. You may start on step 0 or 1; the answer is the min of the last two standing costs (one step from the top).
 * Approach: 1. `costBeforePreviousStep = cost[0]`, `costBeforeCurrentStep = cost[1]`. 2. For i from 2, `currentCalculation = cost[i] + min(of those two)`, then shift the pair. 3. Return `Math.min` of the pair.
 * Dry Run: [10,15,20]. After i=2: stand-on-20 costs 30. min(15,30)=15 (start on 15, skip 20).
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minCostClimbingStairs = function (cost) {
  let costBeforePreviousStep = cost[0];
  let costBeforeCurrentStep = cost[1];

  let currentStepIndex = 2;

  while (currentStepIndex < cost.length) {
    let currentCalculation =
      cost[currentStepIndex] +
      Math.min(costBeforePreviousStep, costBeforeCurrentStep);
    costBeforePreviousStep = costBeforeCurrentStep;
    costBeforeCurrentStep = currentCalculation;
    currentStepIndex++;
  }

  return Math.min(costBeforePreviousStep, costBeforeCurrentStep);
};
