/**
 * Missing Number In Arithmetic Progression
 * Intuition: Exactly one term is missing, so the true step is (last-first)/n, and the first adjacent gap that is not that step hides the missing value.
 * Approach: 1. step = (arr[n-1]-arr[0])/n. 2. Scan adjacent differences; when one ≠ step return arr[i]+step. 3. Fallback arr[0]+step.
 * Dry Run: arr=[5,7,11,13]. step=(13-5)/4=2. Gap 11-7=4 ≠ 2 → missing 9.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var missingNumber = function (arr) {
  const arrayCount = arr.length;
  const initialElement = arr[0];
  const finalElement = arr[arrayCount - 1];

  const totalSpanOfProgression = finalElement - initialElement;
  const commonStepValue = totalSpanOfProgression / arrayCount;

  for (
    let currentPosition = 0;
    currentPosition < arrayCount - 1;
    currentPosition++
  ) {
    const sequentialDifference =
      arr[currentPosition + 1] - arr[currentPosition];
    if (sequentialDifference !== commonStepValue) {
      return arr[currentPosition] + commonStepValue;
    }
  }

  return initialElement + commonStepValue;
};
