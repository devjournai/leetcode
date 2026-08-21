/**
 * Mirror Reflection
 * Intuition: Unfold the square until the ray hits a corner. Reduce p,q by gcd. Even vertical copies → receptor 0; odd vertical and odd horizontal → 1; odd vertical and even horizontal → 2.
 * Approach: 1. Recursive Euclidean gcd. 2. `rayVerticalRatio=q/gcd`, `rayHorizontalRatio=p/gcd`. 3. If vertical even return 0; else return 1 if horizontal odd else 2.
 * Dry Run: p=2, q=1. gcd=1. vertical 1 odd, horizontal 2 even → 2.
 * Time Complexity: O(log(min(p, q)))
 * Space Complexity: O(log(min(p, q)))
 */
var mirrorReflection = function (inputP, inputQ) {
  function calculateGreatestCommonDivisor(firstNum, secondNum) {
    if (secondNum === 0) {
      return firstNum;
    }
    let moduloResult = firstNum % secondNum;
    return calculateGreatestCommonDivisor(secondNum, moduloResult);
  }

  const commonDivisorValue = calculateGreatestCommonDivisor(inputP, inputQ);
  const rayVerticalRatio = inputQ / commonDivisorValue;
  const rayHorizontalRatio = inputP / commonDivisorValue;

  if (rayVerticalRatio % 2 === 0) {
    return 0;
  } else {
    if (rayHorizontalRatio % 2 === 1) {
      return 1;
    } else {
      return 2;
    }
  }
};
