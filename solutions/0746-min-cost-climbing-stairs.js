/**
 * Min Cost Climbing Stairs
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
