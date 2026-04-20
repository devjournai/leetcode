/**
 * Can Make Arithmetic Progression From Sequence
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
