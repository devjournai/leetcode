/**
 * Mirror Reflection
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
