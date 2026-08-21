/**
 * Can Make Arithmetic Progression From Sequence
 * Intuition: An arithmetic sequence is fixed by min, max, and n: the step must be (max-min)/(n-1), and every expected term must appear once.
 * Approach: 1. If n<=2 return true. 2. Scan for min, max, and a set of values. 3. Range 0 means all equal. 4. If range is not divisible by n-1, return false. 5. Require unique values, then check each min+i*step is in the set.
 * Dry Run: arr = [3,5,1].
 *   - min=1, max=5, step=2; expected 1,3,5 all present → true.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var canMakeArithmeticProgression = function (arr) {
  const listLength = arr.length;

  if (listLength <= 2) {
    return true;
  }

  let lowestValue = Infinity;
  let highestValue = -Infinity;
  const elementSet = new Set();

  arr.forEach((currentNumber) => {
    lowestValue = Math.min(lowestValue, currentNumber);
    highestValue = Math.max(highestValue, currentNumber);
    elementSet.add(currentNumber);
  });

  const totalRange = highestValue - lowestValue;

  if (totalRange === 0) {
    return true;
  }

  if (totalRange % (listLength - 1) !== 0) {
    return false;
  }

  const progressionStep = totalRange / (listLength - 1);

  if (elementSet.size !== listLength) {
    return false;
  }

  for (let stepCounter = 1; stepCounter < listLength; stepCounter++) {
    const expectedProgressionValue =
      lowestValue + stepCounter * progressionStep;
    if (!elementSet.has(expectedProgressionValue)) {
      return false;
    }
  }

  return true;
};
