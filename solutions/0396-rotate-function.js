/**
 * Rotate Function
 * Intuition: F of the next rotation equals the previous F plus `totalArraySum` minus `n` times the value that moved from the last index to index 0 (`nums[n - rotationIterationStep]`).
 * Approach: 1. Empty array → 0. 2. Compute `totalArraySum` and F(0) as Σ i*nums[i]. 3. For each rotation 1..n-1 apply the recurrence and track `maxFunctionValue`. 4. Return the max.
 * Dry Run: nums = [4,3,2,6], sum=15, F0=0*4+1*3+2*2+3*6=25.
 *   - rot1 last=6: 25+15-4*6=16.
 *   - rot2 last=2: 16+15-4*2=23.
 *   - rot3 last=3: 23+15-4*3=26. Return 26.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxRotateFunction = function (nums) {
  const numElementsInArray = nums.length;
  if (numElementsInArray === 0) {
    return 0;
  }

  const totalArraySum = nums.reduce(
    (sumAccumulator, currentArrayValue) => sumAccumulator + currentArrayValue,
    0
  );

  let initialRotationSummation = nums.reduce(
    (fZeroAccumulator, arrayElementValue, arrayElementIndex) =>
      fZeroAccumulator + arrayElementIndex * arrayElementValue,
    0
  );

  let maxFunctionValue = initialRotationSummation;
  let currentCalculatedFunctionValue = initialRotationSummation;

  for (
    let rotationIterationStep = 1;
    rotationIterationStep < numElementsInArray;
    rotationIterationStep++
  ) {
    const lastElementInPreviousRotation =
      nums[numElementsInArray - rotationIterationStep];
    currentCalculatedFunctionValue =
      currentCalculatedFunctionValue +
      totalArraySum -
      numElementsInArray * lastElementInPreviousRotation;
    maxFunctionValue = Math.max(
      maxFunctionValue,
      currentCalculatedFunctionValue
    );
  }

  return maxFunctionValue;
};
